"use client";

import Text from "@/shared/ui/reveal";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const socialItems = ["bj", "Talk", "Insta", "Blog"];

export function HeroIntro() {
    const [introStep, setIntroStep] = useState<1 | 2>(1);

    return (
        <section className="relative flex justify-center items-center h-[100dvh]">
            <motion.div
                className="mx-auto max-w-[92rem]"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
            >
                <AnimatePresence mode="wait">
                    <Text.Reveal
                        as="h2"
                        className="text-[3.8rem] leading-[1.5] transition-colors"
                        initialColor="#00000000"
                        midColor="rgb(255, 92, 118)"
                        revealColor={introStep === 1 ? "rgb(0, 0, 0)" : "#00000050"}
                        revealWindow={0.5}
                        delay={2}
                        onRevealComplete={() => {
                            console.log(1);
                            setIntroStep(2);
                        }}
                    >
                        {`수 많은 초보 BJ들이 선택한 이유`}
                    </Text.Reveal>
                    <div className="h-[5.8rem]">
                        {introStep === 2 ? (
                            <Text.Reveal
                                as="h2"
                                className="text-[3.8rem] leading-[1.5]  transition-colors"
                                initialColor="#00000000"
                                midColor="rgb(255, 92, 118)"
                                revealColor="rgb(0, 0, 0)"
                                revealWindow={0.5}
                                delay={2}
                                onRevealComplete={() => {
                                    console.log(2);
                                }}
                            >
                                {`검증된 운영구조 투명한 정산 제이엔에스에 있습니다.`}
                            </Text.Reveal>
                        ) : null}
                    </div>
                </AnimatePresence>
                {/* <h1 className="m-0 text-6xl font-black leading-[1.22] text-black max-[86rem]:text-4xl">
                    검증된 <span className="text-[#ff6673]">운영구조 투명한 정산</span> 제이엔에스에 있습니다.
                </h1> */}
                <div className="mx-auto mt-28 h-16 w-px bg-gradient-to-b from-black via-black to-[#ff6673] max-[86rem]:mt-16" />

                <motion.a
                    className="fixed bottom-[1.6rem] left-[50%] transform translate-x-[-50%] z-10 flex items-center bg-black rounded-full p-[0.4rem] text-white"
                    href="/bjSupport"
                    whileHover={{ y: -2 }}
                >
                    <span className="rounded-full border border-white/40 px-2 py-1">공지</span>
                    <span>단일 방송 최고 250만 개 달성, 다음 주인공은 당신입니다.</span>
                    <span className="text-white/50">✦</span>
                    <span>지금 지원하고 더 빠르게 성장하세요</span>
                    <span className="border-l border-white/20 pl-5 text-[#ff6673] max-[86rem]:border-l-0 max-[86rem]:pl-0">문의하기 ↑</span>
                </motion.a>
            </motion.div>

            <aside className="fixed right-7 bottom-[0] z-30 grid -translate-y-1/2 gap-4 max-[86rem]:hidden">
                {socialItems.map((item) => (
                    <a
                        className="grid h-14 w-14 place-items-center rounded-full bg-white text-sm font-black text-black shadow-[0_0.8rem_2.6rem_rgba(0,0,0,0.14)]"
                        href="/bjSupport"
                        key={item}
                    >
                        {item}
                    </a>
                ))}
                <span className="mx-auto h-px w-8 bg-neutral-500" />
                <a
                    className="grid h-16 w-16 place-items-center rounded-full bg-black text-3xl font-light text-white shadow-[0_0.8rem_2.6rem_rgba(0,0,0,0.16)]"
                    href="#home"
                >
                    ↑
                </a>
            </aside>
        </section>
    );
}
