"use client";

import { FormEvent, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { useCreateInquiryMutation } from "@/entities/inquiry/api/inquiry.query";
import type { CreateInquiryPayload } from "@/entities/inquiry/model/inquiry.type";
import type { Json } from "@/shared/types/Database";
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
    children: ReactNode;
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

function buildMessageBody(payload: Record<string, unknown>): Json {
    return {
        type: "doc",
        content: Object.entries(payload)
            .filter(([, value]) => value !== undefined && value !== null && String(value).trim().length > 0)
            .map(([key, value]) => ({
                type: "paragraph",
                content: [{ type: "text", text: `${key}: ${Array.isArray(value) ? value.join(", ") : String(value)}` }],
            })),
    };
}

export function SubPageHero({ current, title, description }: SubPageHeroProps) {
    return (
        <section className="pt-[15rem] pb-[8rem] max-[86rem]:pt-24 max-[86rem]:pb-16">
            <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.65 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <p className="mb-10 text-3xl font-black text-[var(--adaptiveGrey500)] max-[86rem]:text-2xl">
                        메인 <span className="mx-4 text-[#f04452]">-&gt;</span> <span className="text-black">{current}</span>
                    </p>
                    <div className="grid grid-cols-4 gap-10 max-[86rem]:grid-cols-1">
                        <h1 className="col-span-2 m-0 text-6xl font-black leading-[1.22] text-black max-[86rem]:text-5xl">{title}</h1>
                        <p className="col-span-2 m-0 pt-5 text-3xl font-black leading-[1.5] text-black max-[86rem]:pt-0 max-[86rem]:text-2xl">{description}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export function SubPageSplit({ left, right, className = "" }: SubPageSplitProps) {
    return (
        <section className={`pb-[14rem] max-[86rem]:pb-24 ${className}`}>
            <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-4 gap-16 max-[86rem]:grid-cols-1">
                <div className="col-span-2">{left}</div>
                <div className="col-span-2">{right}</div>
            </div>
        </section>
    );
}

export function InfoCard({ title, children }: InfoCardProps) {
    return (
        <article className="rounded-[2.4rem] bg-[var(--adaptiveGrey100)] px-8 py-7">
            <h3 className="mt-0 mb-4 text-2xl font-black text-black">{title}</h3>
            <div className="text-lg font-semibold leading-[1.75] text-[var(--adaptiveGrey700)]">{children}</div>
        </article>
    );
}

export function NoticeBox() {
    return (
        <article className="rounded-2xl border border-[var(--adaptiveGrey200)] bg-white p-7">
            <strong className="block text-2xl font-black text-black">문의가 필요하신가요?</strong>
            <p className="mt-3 mb-5 text-lg font-semibold text-[var(--adaptiveGrey700)]">장비 상담 및 렌탈 관련 문의는 언제든지 연락주세요.</p>
            <UI.Link
                className="flex min-h-12 items-center justify-center rounded-xl bg-[var(--adaptiveGrey200)] text-base font-black text-[var(--adaptiveGrey800)]"
                href="/bjSupport"
            >
                1:1 문의하기
            </UI.Link>
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
            message_body: buildMessageBody({
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
            className="grid gap-10"
            onSubmit={handleSubmit}
        >
            {chips.length ? (
                <div className="grid gap-7">
                    <h2 className="m-0 text-2xl font-black text-black">선택사항</h2>
                    {chips.map((group) => (
                        <div
                            className="grid gap-3"
                            key={group.label}
                        >
                            <strong className="text-lg font-black text-black">{group.label} {group.required ? <span className="text-[#f04452]">*</span> : null}</strong>
                            <div className="flex flex-wrap gap-2">
                                {group.options.map((option) => {
                                    const active = selected[group.label] === option;

                                    return (
                                        <button
                                            className={`rounded-xl border px-4 py-3 text-base font-black ${active ? "border-[#f04452] text-[#f04452]" : "border-[var(--adaptiveGrey300)] text-[var(--adaptiveGrey500)]"}`}
                                            key={option}
                                            onClick={() => setSelected((prev) => ({ ...prev, [group.label]: option }))}
                                            type="button"
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
            <div className="grid gap-6">
                <h2 className="m-0 text-2xl font-black text-black">{title}</h2>
                <label className="grid gap-3 text-lg font-black text-black">
                    이름
                    <input className="h-14 rounded-xl border border-[var(--adaptiveGrey300)] px-5 text-base font-semibold" name="name" placeholder="이름을 남겨주세요" />
                </label>
                <label className="grid gap-3 text-lg font-black text-black">
                    연락처
                    <input className="h-14 rounded-xl border border-[var(--adaptiveGrey300)] px-5 text-base font-semibold" name="phone" placeholder="연락처를 남겨주세요" type="tel" />
                </label>
                {showEmail ? (
                    <label className="grid gap-3 text-lg font-black text-black">
                        이메일
                        <input className="h-14 rounded-xl border border-[var(--adaptiveGrey300)] px-5 text-base font-semibold" name="email" placeholder="이메일을 남겨주세요" type="email" />
                    </label>
                ) : null}
                <label className="grid gap-3 text-lg font-black text-black">
                    연락 가능한 시각
                    <input className="h-14 rounded-xl border border-[var(--adaptiveGrey300)] px-5 text-base font-semibold" name="availableTime" placeholder="연락 가능한 시간을 남겨주세요" />
                </label>
                <label className="grid gap-3 text-lg font-black text-black">
                    {messageLabel}
                    <textarea className="min-h-[17rem] resize-none rounded-xl border border-[var(--adaptiveGrey300)] p-5 text-base font-semibold" name="message" placeholder="문의를 남겨주세요" />
                </label>
            </div>
            <div className="border-t border-[var(--adaptiveGrey200)] pt-8">
                <h2 className="m-0 text-2xl font-black text-black">개인정보 수집·이용 동의</h2>
                <p className="mt-6 mb-7 text-base font-semibold leading-[1.75] text-black">
                    회사는 상담, 서비스 신청 등을 위해 이름, 연락처, 문의 내용을 수집하고 있습니다.
                    개인정보는 상담 목적 외 다른 용도로 사용하지 않습니다.
                </p>
                <label className="flex items-center gap-3 text-lg font-black text-black">
                    <input
                        checked={agreed}
                        className="h-7 w-7 rounded border-[var(--adaptiveGrey300)]"
                        onChange={(event) => setAgreed(event.target.checked)}
                        type="checkbox"
                    />
                    개인정보 수집/이용에 동의합니다.
                </label>
            </div>
            <p className="m-0 text-base font-bold text-[var(--adaptiveGrey700)]">{status}</p>
            <button
                className="min-h-16 rounded-2xl bg-black text-lg font-black text-white disabled:bg-[var(--adaptiveGrey300)]"
                disabled={createInquiry.isPending}
                type="submit"
            >
                {createInquiry.isPending ? "저장 중" : buttonLabel}
            </button>
        </form>
    );
}

export function StudioSlider({ items }: StudioSliderProps) {
    const sliderItems = [...items, ...items];

    return (
        <section className="overflow-hidden pb-16">
            <div className="mx-auto mb-8 w-[min(112rem,calc(100%_-_3.2rem))]">
                <h2 className="m-0 text-2xl font-black text-black">대관정보 <span className="text-[#f04452]">*</span></h2>
            </div>
            <motion.div
                className="flex w-max gap-3"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 24, ease: "linear", repeat: Infinity }}
            >
                {sliderItems.map((item, index) => (
                    <article
                        className="relative h-[38rem] w-[56rem] overflow-hidden rounded-[2.4rem] bg-black max-[86rem]:h-[28rem] max-[86rem]:w-[34rem]"
                        key={`${item.title}-${index}`}
                    >
                        <img
                            alt={item.title}
                            className="h-full w-full object-cover opacity-85"
                            src={item.image}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                            <strong className="text-4xl font-black text-white max-[86rem]:text-2xl">{item.title}</strong>
                        </div>
                    </article>
                ))}
            </motion.div>
        </section>
    );
}
