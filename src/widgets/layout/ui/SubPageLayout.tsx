"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { motion, PanInfo, useAnimationFrame, useMotionValue } from "framer-motion";
import { useCreateInquiryMutation } from "@/entities/inquiry/api/inquiry.query";
import type { CreateInquiryPayload } from "@/entities/inquiry/model/inquiry.type";
import { buildInquiryMessageBody } from "@/entities/inquiry/lib/buildMessageBody";
import { showErrorToast } from "@/shared/lib/toast";
import UI from "@/shared/ui/UIComponent";
import Image from "next/image";

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
    touch?: boolean;
};

export function SubPageHero({ current, title, description }: SubPageHeroProps) {
    return (
        // <section className="pt-[calc(50dvh-7.2rem-17.4rem-9.2rem)] pb-[9.2rem] mx-[1.6rem]">
        <section
            className="mobile:pt-[calc(7.2rem+1.6rem)] pc:pt-[calc(50dvh-1.6rem-17.4rem-5.2rem)] pb-[3.2rem] mx-[1.6rem]"
            // className="pt-[calc(50dvh-1.6rem-17.4rem-3.2rem)] pb-[3.2rem] mx-[1.6rem]"
            // initial={{ opacity: 0, transform: "translateY(100px)" }}
            // animate={{ opacity: 1, transform: "translateY(0px)" }}
            // exit={{ opacity: 0, transform: "translateY(100px)" }}
            // transition={{
            //     delay: 0.1 * 1,
            //     type: "spring",
            //     mass: 0.1,
            //     stiffness: 100,
            //     damping: 10,
            // }}
        >
            <div className="mx-auto max-w-[var(--size-pc)] w-full flex flex-col gap-[0.8rem]">
                <motion.section
                    className="flex items-center gap-[0.8rem]"
                    initial={{ opacity: 0, transform: "translateY(100px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(100px)" }}
                    transition={{
                        delay: 0.1,
                        type: "spring",
                        mass: 0.1,
                        stiffness: 100,
                        damping: 10,
                    }}
                >
                    <p className="mobile:text-[1.8rem] pc:text-[2.4rem] text-[var(--adaptive-grey500)]">메인</p>
                    <img
                        src={"/images/icon/outlined/ico-outlined-arrow-right.svg"}
                        alt=""
                        className="mobile:w-[2.8rem] pc:w-[3.6rem]"
                    />
                    <p className="mobile:text-[1.8rem] pc:text-[2.4rem] font-[700]">{current}</p>
                </motion.section>

                <section className="grid grid-cols-4 gap-16 max-[86rem]:grid-cols-1">
                    <motion.h1
                        className="col-span-2 whitespace-break-spaces font-[700] mobile:text-[3.2rem] pc:text-[5.2rem] leading-[1.5]"
                        initial={{ opacity: 0, transform: "translateY(100px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        exit={{ opacity: 0, transform: "translateY(100px)" }}
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10,
                        }}
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        className="col-span-2 mobile:text-[2.0rem] pc:text-[2.4rem] font-[NanumSquare] whitespace-break-spaces leading-[1.5]"
                        // className="col-span-2 m-0 pt-5 text-[2.4rem] font-[NanumSquare] whitespace-break-spaces leading-[1.5] text-black max-[86rem]:pt-0 max-[86rem]:text-2xl"
                        initial={{ opacity: 0, transform: "translateY(100px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        exit={{ opacity: 0, transform: "translateY(100px)" }}
                        transition={{
                            delay: 0.3,
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10,
                        }}
                    >
                        {description}
                    </motion.p>
                </section>
            </div>
        </section>
    );
}

export function SubPageSplit({ left, right, className = "" }: SubPageSplitProps) {
    return (
        <section className={`mx-[1.6rem] pb-[14rem] max-[86rem]:pb-24 ${className}`}>
            <div className="mx-auto grid max-w-[var(--size-pc)] w-full grid-cols-4 gap-16 max-[86rem]:grid-cols-1">
                <motion.div
                    className="col-span-2"
                    initial={{ opacity: 0, transform: "translateY(100px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(100px)" }}
                    transition={{
                        delay: 0.4,
                        type: "spring",
                        mass: 0.1,
                        stiffness: 100,
                        damping: 10,
                    }}
                >
                    {left}
                </motion.div>

                <motion.div
                    className="col-span-2"
                    initial={{ opacity: 0, transform: "translateY(100px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(100px)" }}
                    transition={{
                        delay: 0.5,
                        type: "spring",
                        mass: 0.1,
                        stiffness: 100,
                        damping: 10,
                    }}
                >
                    {right}
                </motion.div>
            </div>
        </section>
    );
}

export function SubPageSection({ title, className, children }: InfoCardProps) {
    return (
        <section className={`flex flex-col gap-[1.6rem]`}>
            <h2 className={`${className} mobile:text-[2.0rem] pc:text-[2.4rem] font-[700] font-[NanumSquare] text-black whitespace-break-spaces leading-[1.5]`}>{title}</h2>

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
            <h3 className="text-[2.0rem] font-[700] text-black">{title}</h3>
            <div className="text-[1.6rem] leading-[1.5] text-[var(--adaptive-black300)]">{children}</div>
        </article>
    );
}

export function NoticeBox() {
    return (
        <article className="rounded-[2.4rem] border border-[var(--adaptive-grey200)] bg-white p-7">
            <Image
                src={"/images/icon/outlined/ico-outlined-headset.svg"}
                alt=""
                width={32}
                height={32}
            />
            <h5>문의가 필요하신가요?</h5>
            <p className="mt-3 mb-5 text-lg font-semibold text-[var(--adaptiveGrey700)]">장비 상담 및 렌탈 관련 문의는 언제든지 연락주세요.</p>
            <UI.Linker
                className="flex min-h-12 items-center justify-center rounded-xl bg-[var(--adaptiveGrey200)] text-base font-[700] text-[var(--adaptiveGrey800)]"
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
            showErrorToast("이름, 연락처, 개인정보 동의를 확인해주세요.", 2);
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
                <SubPageSection title="렌탈사양">
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

export function StudioSlider({ items, touch = false }: StudioSliderProps) {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const sliderItems = [...items, ...items];
    const x = useMotionValue(0);
    const isDraggingRef = useRef(false);
    const loopWidthRef = useRef(0);
    const velocityRef = useRef(0);

    const normalizeX = (value: number, loopWidth: number) => {
        if (!loopWidth) return value;

        const normalized = value % loopWidth;
        return normalized > 0 ? normalized - loopWidth : normalized;
    };

    useEffect(() => {
        if (!touch) return;

        const updateLoopWidth = () => {
            const trackWidth = trackRef.current?.scrollWidth ?? 0;
            const nextLoopWidth = trackWidth / 2;
            loopWidthRef.current = nextLoopWidth;
            x.set(normalizeX(x.get(), nextLoopWidth));
        };

        updateLoopWidth();
        window.addEventListener("resize", updateLoopWidth);

        return () => window.removeEventListener("resize", updateLoopWidth);
    }, [items, touch, x]);

    useAnimationFrame((_, delta) => {
        if (!touch || isDraggingRef.current) return;

        const loopWidth = loopWidthRef.current;

        if (!loopWidth) return;

        const nextX = x.get() + ((-40 + velocityRef.current) * delta) / 1000;
        x.set(normalizeX(nextX, loopWidth));

        const dampedVelocity = velocityRef.current * Math.pow(0.92, delta / 16.67);
        velocityRef.current = Math.abs(dampedVelocity) < 1 ? 0 : dampedVelocity;
    });

    return (
        <motion.section
            className="overflow-hidden pb-16"
            initial={{ opacity: 0, transform: "translateY(100px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(100px)" }}
            transition={{
                delay: 0.4,
                type: "spring",
                mass: 0.1,
                stiffness: 100,
                damping: 10,
            }}
        >
            <motion.div
                ref={trackRef}
                className={`flex w-max ${touch ? "cursor-grab active:cursor-grabbing" : ""}`}
                animate={touch ? undefined : { x: ["0%", "-50%"] }}
                drag={touch ? "x" : false}
                dragElastic={touch ? 0.02 : undefined}
                dragMomentum={false}
                onDragStart={() => {
                    isDraggingRef.current = true;
                    velocityRef.current = 0;
                }}
                onDrag={() => {
                    const loopWidth = loopWidthRef.current;

                    if (!loopWidth) return;

                    x.set(normalizeX(x.get(), loopWidth));
                }}
                onDragEnd={(_, info: PanInfo) => {
                    isDraggingRef.current = false;
                    velocityRef.current = info.velocity.x;
                    x.set(normalizeX(x.get(), loopWidthRef.current));
                }}
                transition={touch ? undefined : { duration: 52, ease: "linear", repeat: Infinity }}
                style={touch ? { x, touchAction: "pan-y" } : undefined}
            >
                {sliderItems.map((item, index) => (
                    <article
                        className="relative h-[50dvh] w-[50dvw] overflow-hidden rounded-[0rem] bg-black max-[86rem]:h-[24rem] max-[86rem]:w-[min(34rem,calc(100vw-3.2rem))]"
                        key={`${item.title}-${index}`}
                    >
                        <img
                            alt={item.title}
                            className="h-full w-full object-cover opacity-85 select-none pointer-events-none"
                            src={item.image}
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent mobile:p-[2rem] pc:p-[3.2rem] h-[50%] flex items-end">
                            <h6 className="text-white font-[700] mobile:text-[2.4rem] pc:text-[3.2rem]">{item.title}</h6>
                        </div>
                    </article>
                ))}
            </motion.div>
        </motion.section>
    );
}
