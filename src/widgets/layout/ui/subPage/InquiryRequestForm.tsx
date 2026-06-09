"use client";

import { FormEvent, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, PanInfo, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useCreateInquiryMutation } from "@/entities/inquiry/api/inquiry.query";
import {
    buildAvailableTime,
    buildRegion,
    CONTACT_HOUR_OPTIONS,
    CONTACT_PERIOD_OPTIONS,
    formatPhoneNumber,
    REGION_OPTIONS,
    requiresInquiryEmail,
    sanitizeNameInput,
} from "@/entities/inquiry/lib/formFields";
import type { CreateInquiryPayload } from "@/entities/inquiry/model/inquiry.type";
import { buildInquiryMessageBody } from "@/entities/inquiry/lib/buildMessageBody";
import { showErrorToast } from "@/shared/lib/toast";
import UI from "@/shared/ui/UIComponent";
import { useToastStore } from "@/shared/model/stores/useToastStore";
import { SubPageSection } from "@/widgets/layout/ui/subPage/SubPageSection";

type InquiryRequestFormProps = {
    category: string;
    title?: string;
    messageLabel?: string;
    buttonLabel?: string;
    showEmail?: boolean;
    chips?: {
        label: string;
        options: string[];
        required?: boolean;
    }[];
};
const INQUIRY_RESULT_REDIRECT_CATEGORIES = new Set(["consulting", "equipment_rental", "studio_rental"]);

export function InquiryRequestForm({ category, title = "기본정보", messageLabel = "문의사항", buttonLabel = "요청하기", showEmail = false, chips = [] }: InquiryRequestFormProps) {
    const { setToast } = useToastStore();
    const router = useRouter();
    const createInquiry = useCreateInquiryMutation();
    const [selected, setSelected] = useState<Record<string, string>>({});
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [contactPeriod, setContactPeriod] = useState("");
    const [contactHour, setContactHour] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [status, setStatus] = useState("");
    const cityOptions = province ? REGION_OPTIONS[province as keyof typeof REGION_OPTIONS] : [];
    const emailRequired = showEmail || requiresInquiryEmail(category);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = sanitizeNameInput(String(formData.get("name") ?? "")).trim();
        const phone = formatPhoneNumber(String(formData.get("phone") ?? "").trim());
        const email = String(formData.get("email") ?? "").trim();
        const availableTime = buildAvailableTime(contactPeriod, contactHour);
        const region = buildRegion(province, city, detailAddress);
        const message = String(formData.get("message") ?? "").trim();

        if (!name || !phone || !agreed) {
            setStatus("이름, 연락처, 개인정보 동의를 확인해주세요.");
            showErrorToast("이름, 연락처, 개인정보 동의를 확인해주세요.", 2);
            return;
        }

        if (emailRequired && !email) {
            setStatus("이메일을 입력해주세요.");
            showErrorToast("이메일을 입력해주세요.", 2);
            return;
        }

        if (!availableTime || !region) {
            setStatus("지역과 연락 가능한 시각을 선택해주세요.");
            showErrorToast("지역과 연락 가능한 시각을 선택해주세요.", 2);
            return;
        }

        const missingRequiredChip = chips.find((group) => group.required && !selected[group.label]);

        if (missingRequiredChip) {
            setStatus(`${missingRequiredChip.label}을 선택해주세요.`);
            showErrorToast(`${missingRequiredChip.label}을 선택해주세요.`, 2);
            return;
        }

        const plainMessage = message || `${category} 문의`;
        const payload: CreateInquiryPayload = {
            name,
            phone,
            email: email || null,
            category,
            source: category,
            region,
            message: plainMessage,
            available_time: availableTime,
            message_body: buildInquiryMessageBody({
                이름: name,
                연락처: phone,
                이메일: email,
                지역: region,
                "연락 가능한 시각": availableTime,
                ...selected,
                문의사항: plainMessage,
            }),
        };

        try {
            setStatus("요청을 저장하고 있습니다.");
            await createInquiry.mutateAsync(payload);
            form.reset();
            setSelected({});
            setProvince("");
            setCity("");
            setDetailAddress("");
            setContactPeriod("");
            setContactHour("");
            setAgreed(false);
            setStatus("요청이 접수되었습니다.");

            if (INQUIRY_RESULT_REDIRECT_CATEGORIES.has(category)) {
                router.push("/send/success");
            }
        } catch (error) {
            setStatus(error instanceof Error ? error.message : "요청 저장에 실패했습니다.");

            if (INQUIRY_RESULT_REDIRECT_CATEGORIES.has(category)) {
                router.push("/send/failed");
            }
        }
    }

    return (
        <form
            className="flex flex-col gap-[5.2rem]"
            onSubmit={handleSubmit}
            data-report-id={`문의 폼 ${category}`}
            data-report-type="group"
        >
            {chips.length ? (
                <section className="flex flex-col gap-[1.6rem]">
                    <SubPageSection title="서비스 선택" />

                    <section className="flex flex-col gap-[3.2rem]">
                        {chips.map((group) => (
                            <div
                                className="grid gap-3"
                                key={group.label}
                            >
                                <h6>
                                    {group.label} {group.required ? <span className="text-[#f04452]">*</span> : null}
                                </h6>

                                <div className="flex flex-wrap gap-[0.4rem]">
                                    {group.options.map((option) => {
                                        const active = selected[group.label] === option;

                                        return (
                                            <UI.Button
                                                className={`border ${active ? "border-[var(--adaptive-red500)] text-[var(--adaptive-red400)]" : "border-[var(--adaptive-black100)] text-[var(--adaptive-black300)]"} font-[500] px-[1.2rem] rounded-[1.4rem]`}
                                                size="sm"
                                                key={option}
                                                onClick={() => setSelected((prev) => ({ ...prev, [group.label]: option }))}
                                                type="button"
                                            >
                                                {option}
                                            </UI.Button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </section>
                </section>
            ) : null}

            {/* <section className="w-full bg-[var(--adaptive-black100)] h-[0.1rem]" /> */}

            <section className="flex flex-col gap-[1.6rem]">
                <SubPageSection title={title} />

                <section className="flex flex-col gap-[3.2rem]">
                    <label className="grid gap-3 text-[1.6rem] font-[700] text-black font-[NanumSquare]">
                        이름
                        <UI.Input
                            size="sm"
                            name="name"
                            placeholder="이름을 남겨주세요"
                            maxLength={20}
                            onChange={(event) => {
                                event.currentTarget.value = sanitizeNameInput(event.currentTarget.value);
                            }}
                        />
                    </label>

                    <label className="grid gap-3 text-[1.6rem] font-[700] text-black font-[NanumSquare]">
                        연락처
                        <UI.Input
                            size="sm"
                            name="phone"
                            placeholder="연락처를 남겨주세요"
                            type="tel"
                            inputMode="numeric"
                            maxLength={13}
                            onChange={(event) => {
                                event.currentTarget.value = formatPhoneNumber(event.currentTarget.value);
                            }}
                        />
                    </label>

                    {showEmail ? (
                        <label className="grid gap-3 text-[1.6rem] font-[700] text-black font-[NanumSquare]">
                            <p className="flex gap-[0.4rem]">이메일 {emailRequired ? <span className="text-[#f04452]">*</span> : null}</p>

                            <UI.Input
                                size="sm"
                                name="email"
                                placeholder="이메일을 남겨주세요"
                                type="email"
                                required={emailRequired}
                            />
                        </label>
                    ) : null}

                    <label className="grid gap-3 text-[1.6rem] font-[700] text-black font-[NanumSquare]">
                        지역
                        <div className="grid gap-[0.8rem]">
                            <div className="grid grid-cols-2 gap-[0.8rem]">
                                <UI.Select
                                    className="rounded-[1.4rem] border border-[var(--adaptive-black100)] px-[1.6rem]"
                                    options={[{ label: "~도 선택", value: "" }, ...Object.keys(REGION_OPTIONS).map((option) => ({ label: option, value: option }))]}
                                    size="sm"
                                    value={province}
                                    onChange={(event) => {
                                        setProvince(event.target.value);
                                        setCity("");
                                    }}
                                />
                                <UI.Select
                                    className="rounded-[1.4rem] border border-[var(--adaptive-black100)] px-[1.6rem]"
                                    disabled={!province}
                                    options={[{ label: "~시 선택", value: "" }, ...cityOptions.map((option) => ({ label: option, value: option }))]}
                                    size="sm"
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                />
                            </div>
                            <UI.Input
                                size="sm"
                                name="detailAddress"
                                placeholder="상세 주소를 입력해주세요"
                                value={detailAddress}
                                onChange={(event) => setDetailAddress(event.target.value)}
                            />
                        </div>
                    </label>

                    <label className="grid gap-3 text-[1.6rem] font-[700] text-black font-[NanumSquare]">
                        연락 가능한 시각
                        <div className="grid grid-cols-2 gap-[0.8rem]">
                            <UI.Select
                                className="rounded-[1.4rem] border border-[var(--adaptive-black100)] px-[1.6rem]"
                                options={[{ label: "오전/오후 선택", value: "" }, ...CONTACT_PERIOD_OPTIONS.map((option) => ({ label: option, value: option }))]}
                                size="sm"
                                value={contactPeriod}
                                onChange={(event) => setContactPeriod(event.target.value)}
                            />
                            <UI.Select
                                className="rounded-[1.4rem] border border-[var(--adaptive-black100)] px-[1.6rem]"
                                options={[{ label: "시간 선택", value: "" }, ...CONTACT_HOUR_OPTIONS.map((option) => ({ label: option, value: option }))]}
                                size="sm"
                                value={contactHour}
                                onChange={(event) => setContactHour(event.target.value)}
                            />
                        </div>
                    </label>

                    <label className="grid gap-3 text-[1.6rem] font-[700] text-black font-[NanumSquare]">
                        {messageLabel}
                        <UI.TextArea
                            className="leading-[1.5]"
                            // className="mi[5.2rem]h-[17rem][1.2rem]esize-none rounded-xl border b-grde3-[var(--adaptiveGrey300)] p-5 text-base font-semibold"
                            name="message"
                            placeholder="문의를 남겨주세요"
                        />
                    </label>
                </section>
            </section>

            <section className="w-full bg-[var(--adaptive-black100)] h-[0.1rem]" />

            <section>
                <SubPageSection title="개인정보 수집·이용 동의">
                    {/* <h2 className="m-0 text-2xl font-[700] text-black">개인정보 수집·이용 동의</h2> */}
                    <div className="leading-[1.5] text-[var(--adaptive-black400)] flex flex-col gap-4">
                        <h4 className="m-0 text-[1.6rem] font-bold">수집하는 개인정보의 항목</h4>
                        <div>회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</div>
                        <ul className="list-disc ml-6 flex flex-col gap-1">
                            <li>
                                <span className="font-bold">수집항목</span>
                                <span className="ml-2">: pc본체, pc모니터, DSLR, 웹캠, 조명, 문의사항, 이름, 연락처</span>
                            </li>
                            <li>
                                <span className="font-bold">개인정보 수집방법</span>
                                <span className="ml-2">: 홈페이지(회원가입)</span>
                            </li>
                        </ul>
                    </div>

                    <label className="flex items-center gap-[0.8rem]">
                        <UI.Checkbox
                            defaultState={agreed}
                            onClick={setAgreed}
                        />
                        개인정보 수집/이용에 동의합니다.
                    </label>
                </SubPageSection>
            </section>

            {status ? <p className="text-[var(--adaptive-red500)]">{status}</p> : null}

            <UI.Button
                className="bg-black text-white h-[5.4rem] rounded-[1.6rem]"
                // className="min-h-16 rounded-2xl bg-black text-lg font-[700] text-white disabled:bg-[var(--adaptiveGrey300)]"
                disabled={createInquiry.isPending}
                type="submit"
            >
                {createInquiry.isPending ? "저장 중" : buttonLabel}
            </UI.Button>
        </form>
    );
}
