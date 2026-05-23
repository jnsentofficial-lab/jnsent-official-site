"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Text } from "@/shared/ui/kit/Text";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";

export function HeroIntro() {
    const { setIsNeedShowHeader, setIsNeedShowFloating } = useLayoutStore();
    const [introStep, setIntroStep] = useState<1 | 2>(1);
    const [isRevealComplete, setIsRevealComplete] = useState(false);

    useEffect(() => {
        if (isRevealComplete) {
            console.log("끝");
            setIsNeedShowHeader(true);
            setIsNeedShowFloating(true);
            // unlockScroll();

            return;
        } else {
            console.log("시작");
            setIsNeedShowHeader(false);
            setIsNeedShowFloating(false);
            // lockScroll();

            return;
        }
    }, [isRevealComplete]);

    return (
        <section className="relative flex justify-center items-center h-[100dvh]">
            <motion.div
                className="mx-auto max-w-[92rem]"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
            >
                <Text.Reveal
                    as="h2"
                    interaction={false}
                    className="text-[4.2rem] font-black leading-[1.5] transition-all"
                    // initialColor="#00000000"
                    // midColor="rgb(255, 92, 118)"
                    // revealColor={introStep === 1 ? "rgb(0, 0, 0)" : "#00000050"}
                    initialColor="#ffffff00"
                    revealColor={introStep === 1 ? "rgb(0, 0, 0)" : "#00000050"}
                    subHighlightColor="#A953FF"
                    highlightColor="#FF6B75"
                    revealWindow={0.5}
                    transition={2}
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
                            interaction={false}
                            className="text-[4.2rem] font-black leading-[1.5]  transition-colors"
                            // initialColor="#00000000"
                            // midColor="rgb(255, 92, 118)"
                            // revealColor="rgb(0, 0, 0)"
                            initialColor="#ffffff00"
                            revealColor="#000000"
                            subHighlightColor="#A953FF"
                            highlightColor="#FF6B75"
                            revealWindow={0.5}
                            delay={0.1}
                            transition={2}
                            onRevealComplete={() => {
                                console.log("2");
                                setIsRevealComplete(true);
                            }}
                        >
                            {`검증된 운영구조 투명한 정산 제이엔에스에 있습니다.`}
                        </Text.Reveal>
                    ) : null}
                </div>
            </motion.div>
        </section>
    );
}
