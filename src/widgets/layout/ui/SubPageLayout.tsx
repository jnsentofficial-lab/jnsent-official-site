"use client";

import { FormEvent, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { useCreateInquiryMutation } from "@/entities/inquiry/api/inquiry.query";
import type { CreateInquiryPayload } from "@/entities/inquiry/model/inquiry.type";
import { buildInquiryMessageBody } from "@/entities/inquiry/lib/buildMessageBody";
import UI from "@/shared/ui/UIComponent";

type SubPageHeroProps = {
    current: string;
    title: ReactNode;
    description: ReactNode;
};

type SubPageSplitProps = {
    left: ReactNode;
    right: ReactNode;
    className?: string;
};

type InfoCardProps = {
    title: string;
    className?: string;
    children?: ReactNode;
};

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

type StudioSliderProps = {
    items: {
        title: string;
        image: string;
    }[];
};

export function SubPageHero({ current, title, description }: SubPageHeroProps) {
    return (
        // <section className="pt-[calc(50dvh-7.2rem-17.4rem-9.2rem)] pb-[9.2rem] mx-[1.6rem]">
        <section className="pt-[calc(50dvh-1.6rem-17.4rem-3.2rem)] pb-[3.2rem] mx-[1.6rem]">
            <div className="mx-auto max-w-[var(--size-pc)] w-full flex flex-col gap-[0.8rem]">
                <section className="flex items-center gap-[0.8rem]">
                    <p className="text-[2.4rem] text-[var(--adaptive-grey500)]">메인</p>
                    <img
                        src={"/images/icon/outlined/ico-outlined-arrow-right.svg"}
                        alt=""
                        className="w-[3.6rem]"
                    />
                    <p className="text-[2.4rem] font-[700]">{current}</p>
                </section>

                <div className="grid grid-cols-4 gap-10 max-[86rem]:grid-cols-1">
                    <h1 className="col-span-2 whitespace-break-spaces font-[900] text-[5.2rem]">{title}</h1>
                    <p className="col-span-2 m-0 pt-5 text-[2.4rem] font-[NanumSquare] whitespace-break-spaces leading-[1.5] text-black max-[86rem]:pt-0 max-[86rem]:text-2xl">{description}</p>
                </div>
            </div>
        </section>
    );
}

export function SubPageSplit({ left, right, className = "" }: SubPageSplitProps) {
    return (
        <section className={`mx-[1.6rem] pb-[14rem] max-[86rem]:pb-24 ${className}`}>
            <div className="mx-auto grid max-w-[var(--size-pc)] w-full grid-cols-4 gap-16 max-[86rem]:grid-cols-1">
                <div className="col-span-2">{left}</div>
                <div className="col-span-2">{right}</div>
            </div>
        </section>
    );
}

export function SubPageSection({ title, className, children }: InfoCardProps) {
    return (
        <section className={`flex flex-col gap-[1.6rem]`}>
            <h2 className={`${className} text-[2.4rem] font-[700] font-[NanumSquare] text-black whitespace-break-spaces leading-[1.5]`}>{title}</h2>

            {children}
        </section>
        // <article className="rounded-[2.4rem] bg-[var(--adaptive-black50)] p-[1.2rem_2.4rem] flex flex-col gap-[1.2rem]">
        //     <div className="text-[1.6rem] leading-[1.5] text-[var(--adaptive-black300)]">{children}</div>
        // </article>
    );
}

export const DottedItem = ({ children }: { children: ReactNode }) => {
    return (
        <div className="relative ml-[1.6rem]">
            <div className="absolute top-[0.8rem] left-[-1.2rem] w-[0.4rem] h-[0.4rem] bg-black rounded-full" />

            {children}
        </div>
    );
};

export function InfoCard({ title, children }: InfoCardProps) {
    return (
        <article className="rounded-[2.4rem] bg-[var(--adaptive-black50)] p-[1.2rem_2.4rem] flex flex-col gap-[1.2rem]">
            <h3 className="text-[2.0rem] font-black text-black">{title}</h3>
            <div className="text-[1.6rem] leading-[1.5] text-[var(--adaptive-black300)]">{children}</div>
        </article>
    );
}

export function NoticeBox() {
    return (
        <article className="rounded-[2.4rem] border border-[var(--adaptive-grey200)] bg-white p-7">
            <h5>문의가 필요하신가요?</h5>
            <p className="mt-3 mb-5 text-lg font-semibold text-[var(--adaptiveGrey700)]">장비 상담 및 렌탈 관련 문의는 언제든지 연락주세요.</p>
            <UI.Linker
                className="flex min-h-12 items-center justify-center rounded-xl bg-[var(--adaptiveGrey200)] text-base font-black text-[var(--adaptiveGrey800)]"
                href="/bjSupport"
            >
                1:1 문의하기
            </UI.Linker>
        </article>
    );
}

export function InquiryRequestForm({ category, title = "기본정보", messageLabel = "문의사항", buttonLabel = "요청하기", showEmail = false, chips = [] }: InquiryRequestFormProps) {
    const createInquiry = useCreateInquiryMutation();
    const [selected, setSelected] = useState<Record<string, string>>({});
    const [agreed, setAgreed] = useState(false);
    const [status, setStatus] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = String(formData.get("name") ?? "").trim();
        const phone = String(formData.get("phone") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const availableTime = String(formData.get("availableTime") ?? "").trim();
        const message = String(formData.get("message") ?? "").trim();

        if (!name || !phone || !agreed) {
            setStatus("이름, 연락처, 개인정보 동의를 확인해주세요.");
            return;
        }

        const missingRequiredChip = chips.find((group) => group.required && !selected[group.label]);

        if (missingRequiredChip) {
            setStatus(`${missingRequiredChip.label}을 선택해주세요.`);
            return;
        }

        const plainMessage = message || `${category} 문의`;
        const payload: CreateInquiryPayload = {
            name,
            phone,
            email: email || null,
            category,
            message: plainMessage,
            message_body: buildInquiryMessageBody({
                이름: name,
                연락처: phone,
                이메일: email,
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
            setAgreed(false);
            setStatus("요청이 접수되었습니다.");
        } catch (error) {
            setStatus(error instanceof Error ? error.message : "요청 저장에 실패했습니다.");
        }
    }

    return (
        <form
            className="flex flex-col gap-[5.2rem]"
            onSubmit={handleSubmit}
        >
            {chips.length ? (
                <SubPageSection title="선택사항">
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
                                            className={`border ${active ? "border-[var(--adaptive-red500)]" : "border-[var(--adaptive-black100)]"}`}
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
                </SubPageSection>
            ) : null}

            <section className="flex flex-col gap-[3.2rem]">
                <SubPageSection title={title} />
                <label className="grid gap-3 text-[1.6rem] font-[700] text-black font-[NanumSquare]">
                    이름
                    <UI.Input
                        name="name"
                        placeholder="이름을 남겨주세요"
                    />
                </label>
                <label className="grid gap-3 text-[1.6rem] font-[700] text-black font-[NanumSquare]">
                    연락처
                    <UI.Input
                        name="phone"
                        placeholder="연락처를 남겨주세요"
                        type="tel"
                    />
                </label>
                {showEmail ? (
                    <label className="grid gap-3 text-[1.6rem] font-[700] text-black font-[NanumSquare]">
                        이메일
                        <UI.Input
                            name="email"
                            placeholder="이메일을 남겨주세요"
                            type="email"
                        />
                    </label>
                ) : null}
                <label className="grid gap-3 text-[1.6rem] font-[700] text-black font-[NanumSquare]">
                    연락 가능한 시각
                    <UI.Input
                        name="availableTime"
                        placeholder="연락 가능한 시간을 남겨주세요"
                    />
                </label>
                <label className="grid gap-3 text-[1.6rem] font-[700] text-black font-[NanumSquare]">
                    {messageLabel}
                    <UI.TextArea
                        // className="mi[5.2rem]h-[17rem][1.2rem]esize-none rounded-xl border b-grde3-[var(--adaptiveGrey300)] p-5 text-base font-semibold"
                        name="message"
                        placeholder="문의를 남겨주세요"
                    />
                </label>
            </section>

            <section className="w-full bg-[var(--adaptive-black100)] h-[0.1rem]" />

            <section>
                <SubPageSection title="개인정보 수집·이용 동의">
                    {/* <h2 className="m-0 text-2xl font-black text-black">개인정보 수집·이용 동의</h2> */}
                    <p className="leading-[1.5] text-[var(--adaptive-black400)]">
                        회사는 상담, 서비스 신청 등을 위해 이름, 연락처, 문의 내용을 수집하고 있습니다. 개인정보는 상담 목적 외 다른 용도로 사용하지 않습니다.
                    </p>
                    <label className="flex items-center gap-[0.8rem]">
                        <input
                            checked={agreed}
                            className="h-7 w-7 rounded border-[var(--adaptive-grey100)]"
                            onChange={(event) => setAgreed(event.target.checked)}
                            type="checkbox"
                        />
                        개인정보 수집/이용에 동의합니다.
                    </label>
                </SubPageSection>
            </section>

            {status ? <p className="text-[var(--adaptive-red500)]">{status}</p> : null}

            <UI.Button
                className="bg-black text-white h-[5.4rem] rounded-[1.6rem]"
                // className="min-h-16 rounded-2xl bg-black text-lg font-black text-white disabled:bg-[var(--adaptiveGrey300)]"
                disabled={createInquiry.isPending}
                type="submit"
            >
                {createInquiry.isPending ? "저장 중" : buttonLabel}
            </UI.Button>
        </form>
    );
}

export function StudioSlider({ items }: StudioSliderProps) {
    const sliderItems = [...items, ...items];

    return (
        <section className="overflow-hidden pb-16">
            <motion.div
                className="flex w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 52, ease: "linear", repeat: Infinity }}
            >
                {sliderItems.map((item, index) => (
                    <article
                        className="relative h-[50dvh] w-[50dvw] overflow-hidden rounded-[0rem] bg-black max-[86rem]:h-[28rem] max-[86rem]:w-[34rem]"
                        // className="relative h-[38rem] w-[56rem] overflow-hidden rounded-[2.4rem] bg-black max-[86rem]:h-[28rem] max-[86rem]:w-[34rem]"
                        key={`${item.title}-${index}`}
                    >
                        <img
                            alt={item.title}
                            className="h-full w-full object-cover opacity-85"
                            src={item.image}
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-[3.2rem] h-[50%] flex items-end">
                            <h6 className="text-white font-[700] text-[3.2rem]">{item.title}</h6>
                        </div>
                    </article>
                ))}
            </motion.div>
        </section>
    );
}
