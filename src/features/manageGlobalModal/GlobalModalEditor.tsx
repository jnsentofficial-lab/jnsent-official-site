"use client";

import { FormEvent, useState } from "react";
import { useUploadImageMutation } from "@/entities/asset/api/asset.query";
import { useCreateGlobalModalMutation } from "@/entities/globalModal/api/globalModal.query";
import type { GlobalModal } from "@/entities/globalModal/model/globalModal.type";
import UI from "@/shared/ui/UIComponent";

type Position = {
    col: number;
    row: number;
};

const positions = Array.from({ length: 9 }, (_, index) => ({
    col: (index % 3) + 1,
    row: Math.floor(index / 3) + 1,
}));
const formClassName = "grid gap-3.5";
const labelClassName = "grid gap-2 font-bold text-slate-800";
const inputClassName = "min-h-11 rounded-lg border border-slate-300 px-3.5";
const textareaClassName = "min-h-[13.2rem] resize-y rounded-lg border border-slate-300 px-3.5 py-3";
const statusClassName = "m-0 text-sm font-bold text-green-700";
const buttonClassName = "min-h-11 rounded-lg bg-blue-500 font-bold text-white";

function toIsoDateTime(value: FormDataEntryValue | null) {
    const text = String(value ?? "").trim();

    return text ? new Date(text).toISOString() : null;
}

export function GlobalModalEditor() {
    const [position, setPosition] = useState<Position>({ col: 2, row: 2 });
    const [statusMessage, setStatusMessage] = useState("");
    const createGlobalModal = useCreateGlobalModalMutation();
    const uploadImage = useUploadImageMutation();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatusMessage("저장 중입니다.");

        const formData = new FormData(event.currentTarget);
        const file = formData.get("image");
        let imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;

        try {
            if (file instanceof File && file.size > 0) {
                imageUrl = (await uploadImage.mutateAsync(file)).result.url;
            }

            const dismissType = String(formData.get("dismissType") ?? "none") as GlobalModal["dismiss_type"];
            const dismissDays = Number(formData.get("dismissDays") ?? 0);
            await createGlobalModal.mutateAsync({
                title: String(formData.get("title") ?? "").trim(),
                content: String(formData.get("content") ?? "").trim(),
                image_url: imageUrl,
                col: position.col,
                row: position.row,
                stack_order: Number(formData.get("stackOrder") ?? 0),
                dismiss_type: dismissType,
                dismiss_days: dismissType === "days" ? dismissDays : null,
                starts_at: toIsoDateTime(formData.get("startsAt")),
                ends_at: toIsoDateTime(formData.get("endsAt")),
                is_visible: formData.get("isVisible") === "on",
            });

            event.currentTarget.reset();
            setPosition({ col: 2, row: 2 });
            setStatusMessage("모달이 저장되었습니다.");
        } catch {
            setStatusMessage("모달 저장에 실패했습니다.");
        }
    }

    return (
        <form
            className={formClassName}
            onSubmit={handleSubmit}
        >
            <label className={labelClassName}>
                제목
                <input
                    className={inputClassName}
                    name="title"
                    placeholder="모달 제목"
                    required
                    type="text"
                />
            </label>
            <label className={labelClassName}>
                내용
                <textarea
                    className={textareaClassName}
                    name="content"
                    placeholder="모달 내용을 입력하세요."
                    required
                />
            </label>
            <label className={labelClassName}>
                이미지 업로드
                <input
                    className={inputClassName}
                    accept="image/jpeg,image/png,image/webp"
                    name="image"
                    type="file"
                />
            </label>
            <label className={labelClassName}>
                이미지 URL
                <input
                    className={inputClassName}
                    name="imageUrl"
                    placeholder="이미 업로드된 이미지 URL"
                    type="url"
                />
            </label>
            <fieldset className="m-0 grid gap-2.5 border-0 p-0">
                <legend className="font-bold text-slate-800">노출 위치</legend>
                <div className="grid aspect-square w-[min(24rem,100%)] grid-cols-3 grid-rows-3 gap-2">
                    {positions.map((item) => (
                        <UI.Button
                            aria-pressed={position.col === item.col && position.row === item.row}
                            className={`min-h-0 rounded-lg border font-bold ${position.col === item.col && position.row === item.row ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-300 bg-slate-50 text-slate-700"}`}
                            key={`${item.col}-${item.row}`}
                            onClick={() => setPosition(item)}
                            type="button"
                        >
                            {item.col},{item.row}
                        </UI.Button>
                    ))}
                </div>
            </fieldset>
            <label className={labelClassName}>
                Stack 순서
                <input
                    className={inputClassName}
                    defaultValue="0"
                    min="0"
                    name="stackOrder"
                    type="number"
                />
            </label>
            <label className={labelClassName}>
                노출 시작
                <input
                    className={inputClassName}
                    name="startsAt"
                    type="datetime-local"
                />
            </label>
            <label className={labelClassName}>
                노출 종료
                <input
                    className={inputClassName}
                    name="endsAt"
                    type="datetime-local"
                />
            </label>
            <label className={labelClassName}>
                닫기 정책
                <select
                    className={inputClassName}
                    name="dismissType"
                >
                    <option value="none">닫기만</option>
                    <option value="today">오늘 하루 동안 닫기</option>
                    <option value="days">n일 동안 닫기</option>
                </select>
            </label>
            <label className={labelClassName}>
                n일
                <input
                    className={inputClassName}
                    defaultValue="1"
                    min="1"
                    name="dismissDays"
                    type="number"
                />
            </label>
            <label className="flex items-center gap-2.5 font-bold text-slate-800">
                <input
                    className="min-h-0"
                    defaultChecked
                    name="isVisible"
                    type="checkbox"
                />
                표시
            </label>
            {statusMessage ? (
                <p
                    className={statusClassName}
                    role="status"
                >
                    {statusMessage}
                </p>
            ) : null}
            <UI.Button
                className={buttonClassName}
                type="submit"
            >
                모달 저장
            </UI.Button>
        </form>
    );
}
