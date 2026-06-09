"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { BjSupportInquiryForm } from "@/widgets/bjSupport/ui/BjSupportInquiryForm";
import type { InquiryModalProps } from "@/widgets/home/modal/inquiryModal/types";

export function InquiryModal({ open, onClose }: InquiryModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        const { body, documentElement } = document;
        const scrollY = window.scrollY;
        const previousBodyOverflow = body.style.overflow;
        const previousBodyPosition = body.style.position;
        const previousBodyTop = body.style.top;
        const previousBodyWidth = body.style.width;
        const previousHtmlOverflow = documentElement.style.overflow;

        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.width = "100%";
        documentElement.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            body.style.overflow = previousBodyOverflow;
            body.style.position = previousBodyPosition;
            body.style.top = previousBodyTop;
            body.style.width = previousBodyWidth;
            documentElement.style.overflow = previousHtmlOverflow;
            window.scrollTo(0, scrollY);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open ? (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="inquiry-modal-title"
                    className="fixed inset-0 z-[2000000000000] flex h-[100dvh] flex-col overflow-hidden bg-[#ffffffe2] backdrop-blur-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="문의하기 닫기"
                        className="fixed top-[2rem] right-[2rem] z-[1] flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-black/5 text-[2.4rem] leading-none text-black/60 transition-colors hover:bg-black/10"
                    >
                        ×
                    </button>

                    <section
                        className="mx-auto flex gap-[2.4rem] h-full min-h-0 w-full max-w-[var(--size-tablet)] flex-col overflow-y-auto overscroll-contain px-[1.6rem] pb-[3.2rem] pt-[8rem] pc:px-0"
                        data-lenis-prevent
                    >
                        <motion.header
                            className="flex w-full flex-col gap-[1.2rem]"
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
                            <h2
                                id="inquiry-modal-title"
                                className="mobile:text-[2.0rem] pc:text-[3.2rem] font-[700] text-left text-black"
                            >
                                당신의 가능성을 현실로 만드세요
                            </h2>

                            <p className="mobile:text-[1.4rem] pc:text-[1.8rem] text-left font-[500] text-[#888888]">성장을 위한 첫 상담을 지금 시작해보세요.</p>
                        </motion.header>

                        <BjSupportInquiryForm
                            source="home_modal"
                            animated
                            onSuccess={onClose}
                        />
                    </section>
                </motion.div>
            ) : null}
        </AnimatePresence>,
        document.body,
    );
}
