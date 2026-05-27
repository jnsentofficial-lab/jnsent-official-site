"use client";

import { FormEvent, useState } from "react";
import { useUploadImageMutation } from "@/entities/asset/api/asset.query";
import { useCreateInquiryMutation } from "@/entities/inquiry/api/inquiry.query";
import { formatPhoneNumber, sanitizeNameInput } from "@/entities/inquiry/lib/formFields";
import { showErrorToast } from "@/shared/lib/toast";
import { emptyRichTextContent, extractRichTextPlainText, toJsonContent } from "@/shared/lib/richText/richText";
import type { RichTextContent } from "@/shared/lib/richText/richText";
import { RichTextEditor } from "@/shared/ui/richText/RichTextEditor";
import UI from "@/shared/ui/UIComponent";

type InquiryStatus = "idle" | "submitting" | "success" | "error";

export function InquiryForm() {
    const [status, setStatus] = useState<InquiryStatus>("idle");
    const [message, setMessage] = useState("필요한 지원 내용을 남겨주세요.");
    const [inquiryBody, setInquiryBody] = useState<RichTextContent>(emptyRichTextContent);
    const uploadImage = useUploadImageMutation();
    const createInquiry = useCreateInquiryMutation();

    async function handleImageUpload(file: File) {
        const response = await uploadImage.mutateAsync(file);

        return response.result.url;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("submitting");
        setMessage("상담 신청을 저장하고 있습니다.");

        const formData = new FormData(event.currentTarget);
        const name = sanitizeNameInput(String(formData.get("name") ?? "")).trim();
        const phone = formatPhoneNumber(String(formData.get("phone") ?? "").trim());
        const inquiryMessage = extractRichTextPlainText(inquiryBody);

        if (!name || !phone || !inquiryMessage) {
            setStatus("error");
            setMessage("이름, 연락처, 상담 내용을 입력해주세요.");
            showErrorToast("이름, 연락처, 상담 내용을 입력해주세요.", 2);
            return;
        }

        try {
            await createInquiry.mutateAsync({
                name,
                phone,
                message: inquiryMessage,
                message_body: toJsonContent(inquiryBody),
            });
        } catch {
            setStatus("error");
            setMessage("상담 신청 저장에 실패했습니다.");
            return;
        }

        event.currentTarget.reset();
        setInquiryBody(emptyRichTextContent);
        setStatus("success");
        setMessage("상담 신청이 저장되었습니다.");
    }

    return (
        <form
            className="grid gap-3.5"
            onSubmit={handleSubmit}
        >
            <label className="grid gap-2 font-bold text-slate-700">
                이름
                <input
                    className="w-full rounded-lg border border-slate-300 px-4 py-3.5"
                    name="name"
                    maxLength={20}
                    onChange={(event) => {
                        event.currentTarget.value = sanitizeNameInput(event.currentTarget.value);
                    }}
                    placeholder="이름"
                    type="text"
                />
            </label>
            <label className="grid gap-2 font-bold text-slate-700">
                연락처
                <input
                    className="w-full rounded-lg border border-slate-300 px-4 py-3.5"
                    name="phone"
                    inputMode="numeric"
                    maxLength={13}
                    onChange={(event) => {
                        event.currentTarget.value = formatPhoneNumber(event.currentTarget.value);
                    }}
                    placeholder="연락처"
                    type="tel"
                />
            </label>
            <label className="grid gap-2 font-bold text-slate-700">
                상담 내용
                <RichTextEditor
                    value={inquiryBody}
                    onChange={setInquiryBody}
                    onImageUpload={handleImageUpload}
                    placeholder="필요한 지원 내용을 적어주세요."
                />
            </label>
            <p
                className={`m-0 font-bold ${status === "success" ? "text-green-700" : status === "error" ? "text-red-700" : "text-slate-700"}`}
                role="status"
            >
                {message}
            </p>
            <UI.Button
                className="min-h-12 rounded-lg bg-teal-500 font-bold text-white disabled:bg-slate-300 disabled:text-slate-600"
                disabled={status === "submitting"}
                type="submit"
            >
                {status === "submitting" ? "저장 중" : "상담 신청"}
            </UI.Button>
        </form>
    );
}
