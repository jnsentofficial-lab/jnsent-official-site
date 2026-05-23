"use client";

import Text from "@/shared/ui/reveal";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const socialItems = ["bj", "Talk", "Insta", "Blog"];

export function HeroIntro() {
    const [introStep, setIntroStep] = useState<1 | 2>(1);
    const [isRevealComplete, setIsRevealComplete] = useState(false);

    useEffect(() => {
        if (isRevealComplete) {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            return;
        }

        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [isRevealComplete]);

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
                        delay={1}
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
                                delay={1}
                                onRevealComplete={() => {
                                    setIsRevealComplete(true);
                                }}
                            >
                                {`검증된 운영구조 투명한 정산 제이엔에스에 있습니다.`}
                            </Text.Reveal>
                        ) : null}
                    </div>
                </AnimatePresence>
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
