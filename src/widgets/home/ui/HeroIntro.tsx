"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Text } from "@/shared/ui/kit/Text";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";

export function HeroIntro() {
    const { setIsNeedShowHeader, setIsNeedShowFloating, setIsReadyLanding } = useLayoutStore();
    const [introStep, setIntroStep] = useState<1 | 2>(1);
    const [isRevealComplete, setIsRevealComplete] = useState(false);

    useEffect(() => {
        if (isRevealComplete) {
            console.log("끝");
            setIsReadyLanding(true);

            return;
        } else {
            console.log("시작");
            setIsReadyLanding(false);

            return;
        }
    }, [isRevealComplete]);

    return (
        <section className="relative flex flex-col justify-center items-center h-[100dvh]">
            <motion.div layout="position">
                <Text.Reveal
                    as="h2"
                    interaction={false}
                    className="text-[4.2rem] font-[700] font-[NanumSquare] leading-[1.5]"
                    // initialColor="#00000000"
                    // midColor="rgb(255, 92, 118)"
                    // revealColor={introStep === 1 ? "rgb(0, 0, 0)" : "#00000050"}
                    initialColor="#ffffff00"
                    // revealColor="rgb(0, 0, 0)"
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
            </motion.div>

            {introStep === 2 ? (
                <motion.div
                    layout="position"
                    className="h-[5.8rem]"
                >
                    <Text.Reveal
                        as="h2"
                        interaction={false}
                        className="text-[4.2rem] font-[700] leading-[1.5]"
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
                </motion.div>
            ) : null}
        </section>
    );
}
