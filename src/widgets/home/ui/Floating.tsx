"use client";

import React, { Fragment, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { Text } from "@/shared/ui/kit/Text";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import { InquiryModal } from "@/widgets/home/modal";
import Image from "next/image";

const socialItems = ["kakao", "insta", "blog", ""];

export const Floating = () => {
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);

    return (
        <Fragment>
            <InquiryModal
                open={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
            />

            {/* 하단 플로팅 바 */}
            <FloatingBar onInquiryClick={() => setIsInquiryOpen(true)} />
            {/* 하단 플로팅 바 */}

            {/* 퀵 메뉴 */}
            <QuickMenu />
            {/* 퀵 메뉴 END */}

            {/* 스크롤 가이드 */}
            <ScrollGuide />
            {/* 스크롤 가이드 END */}
        </Fragment>
    );
};

const FloatingBar = ({ onInquiryClick }: { onInquiryClick: () => void }) => {
    const { isReadyLanding } = useLayoutStore();

    return (
        <AnimatePresence>
            {isReadyLanding && (
                <motion.section
                    data-report-id="플로팅 CTA"
                    data-report-type="item"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-[1.6rem] left-[50%] z-10 flex h-[6.2rem] w-[calc(100vw-1.6rem)] max-w-[var(--size-tablet)] -translate-x-1/2 items-center rounded-full bg-black p-[0.4rem] mobile:bottom-[max(1.6rem,env(safe-area-inset-bottom))]"
                >
                    <div className="px-[1.6rem]">
                        <img
                            src={"/images/icon/outlined/ico-outlined-siren-white.svg"}
                            alt=""
                            className="w-[2.8rem]"
                        />
                    </div>

                    <div className="flex-1 overflow-hidden relative">
                        <div className="absolute top-0 left-0 z-2 h-full w-[3.2rem] bg-[linear-gradient(90deg,_black,_transparent)]" />

                        <Text.Marquee
                            speed={0.5}
                            classNameInner="gap-[3.2rem]"
                            // interaction
                        >
                            <p className="text-[1.8rem] font-normal text-white">단일 방송 최고 250만 개 달성, 다음 주인공은 당신입니다.</p>
                            <p className="text-[1.8rem] font-normal text-white">✦</p>
                            <p className="text-[1.8rem] font-normal text-white">지금 지원하고 더 빠르게 성장하세요</p>
                        </Text.Marquee>

                        <div className="absolute top-0 right-0 z-2 h-full w-[3.2rem] bg-[linear-gradient(270deg,_black,_transparent)]" />
                    </div>

                    <button
                        type="button"
                        onClick={onInquiryClick}
                        className="flex shrink-0 cursor-pointer items-center gap-[1.2rem] px-[1.2rem]"
                    >
                        <p className="text-[1.8rem] font-bold text-white">문의하기</p>

                        <img
                            src={"/images/icon/outlined/ico-outlined-arrow-single-up.svg"}
                            alt=""
                            className="w-[2.0rem]"
                        />
                    </button>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

const QuickMenu = () => {
    const { isReadyLanding } = useLayoutStore();
    return (
        <AnimatePresence>
            {isReadyLanding ? (
                // <aside className="fixed right-7 bottom-[1.6rem] z-30 grid gap-4 max-[86rem]:hidden">
                <aside
                    className="fixed right-7 bottom-[1.6rem] z-30 flex flex-col items-center justify-center gap-[2.4rem]"
                    data-report-id="플로팅 메뉴"
                    data-report-type="item"
                >
                    <section className="flex flex-col gap-[0.8rem]">
                        {socialItems.map((item) => (
                            <a
                                className="grid h-[7.2rem] w-[7.2rem] place-items-center rounded-full bg-white text-sm font-[700] text-black shadow-[0_0.8rem_2.6rem_rgba(0,0,0,0.14)]"
                                href="/bjSupport"
                                key={item}
                            >
                                {item ? (
                                    <Image
                                        src={`/images/icon/route/home/ico-floating-${item}.svg`}
                                        alt=""
                                        height={58}
                                        width={58}
                                    />
                                ) : null}
                            </a>
                        ))}
                    </section>
                    <div className="mx-auto h-[0.1rem] w-8 bg-[var(--adaptive-black400)]" />
                    <a
                        className="grid h-[7.2rem] w-[7.2rem] place-items-center rounded-full bg-black text-3xl font-light text-white shadow-[0_0.8rem_2.6rem_rgba(0,0,0,0.16)]"
                        href="#home"
                    >
                        <Image
                            src={`/images/icon/route/home/ico-floating-up.svg`}
                            alt=""
                            height={58}
                            width={58}
                            className="invert"
                        />
                    </a>
                </aside>
            ) : null}
        </AnimatePresence>
    );
};

const ScrollGuide = () => {
    const { isReadyLanding } = useLayoutStore();
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 1], [1, 0]);

    return (
        <AnimatePresence>
            {isReadyLanding ? (
                <motion.div
                    className="z-100000 fixed bottom-[calc(50%-25dvh)] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center"
                    style={{ opacity }}
                >
                    <motion.div className="w-[0.2rem] h-[5.2rem] relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                                background: "linear-gradient(180deg, transparent 0%, black 40%, black 70%, transparent 100%)",
                                // background: "linear-gradient(180deg, transparent 0%, #ff6673 40%, #ffb5c1 70%, transparent 100%)",
                            }}
                            animate={{
                                y: ["100%", "-100%"],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.2,
                                ease: "easeInOut",
                            }}
                        />
                        <div className="absolute inset-0 w-full h-full pointer-events-none" />
                    </motion.div>

                    <img
                        src={"/images/icon/outlined/ico-outlined-arrow-single-up.svg"}
                        alt=""
                        className="rotate-180 w-[2.4rem]"
                    />
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};
