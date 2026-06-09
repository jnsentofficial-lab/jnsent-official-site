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
        const { body, documentElement } = document;
        const previousBodyOverflow = body.style.overflow;
        const previousHtmlOverflow = documentElement.style.overflow;

        if (!isRevealComplete) {
            body.style.overflow = "hidden";
            documentElement.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
            documentElement.style.overflow = "";
        }

        return () => {
            body.style.overflow = previousBodyOverflow;
            documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [isRevealComplete]);

    useEffect(() => {
        if (isRevealComplete) {
            setIsReadyLanding(true);
            return;
        }

        setIsReadyLanding(false);
    }, [isRevealComplete, setIsReadyLanding]);

    return (
        <section className="relative flex flex-col justify-center items-center h-[100svh]">
            <motion.div
                layout="position"
                data-report-id="메인 히어로 랜딩 텍스트"
                data-report-type="item"
            >
                <Text.Reveal
                    as="p"
                    interaction={false}
                    className="mobile:text-[2.4rem] pc:text-[4.2rem] font-[900] font-[NanumSquare] leading-[1.5]"
                    initialColor="#ffffff00"
                    revealColor={introStep === 1 ? "rgb(0, 0, 0)" : "#00000050"}
                    subHighlightColor="#A953FF"
                    highlightColor="#FF6B75"
                    revealWindow={0.5}
                    transition={2}
                    delay={1}
                    onRevealComplete={() => {
                        setIntroStep(2);
                    }}
                >
                    {`수 많은 크리에이터들이 선택한 이유`}
                </Text.Reveal>
            </motion.div>

            {introStep === 2 ? (
                <motion.div
                    layout="position"
                    data-report-id="메인 히어로 랜딩 텍스트"
                    data-report-type="item"
                >
                    <span className="hidden pc:block">
                        <Text.Reveal
                            as="h1"
                            interaction={false}
                            className="mobile:text-[2.4rem] pc:text-[4.2rem] font-[900] leading-[1.5]"
                            initialColor="#ffffff00"
                            revealColor="#000000"
                            subHighlightColor="#A953FF"
                            highlightColor="#FF6B75"
                            revealWindow={0.5}
                            delay={0.1}
                            transition={2}
                            onRevealComplete={() => {
                                setIsRevealComplete(true);
                            }}
                        >
                            검증된 운영구조 투명한 정산 제이엔에스에 있습니다.
                        </Text.Reveal>
                    </span>
                    <span className="block pc:hidden">
                        <Text.Reveal
                            as="h1"
                            interaction={false}
                            className="mobile:text-[2.4rem] pc:text-[4.2rem] font-[900] leading-[1.5] mobile:whitespace-break-spaces pc:whitespace-nowrap"
                            initialColor="#ffffff00"
                            revealColor="#000000"
                            subHighlightColor="#A953FF"
                            highlightColor="#FF6B75"
                            revealWindow={0.5}
                            delay={0.1}
                            transition={2}
                            onRevealComplete={() => {
                                setIsRevealComplete(true);
                            }}
                        >
                            {`검증된 운영구조 투명한 정산\n제이엔에스에 있습니다.`}
                        </Text.Reveal>
                    </span>
                </motion.div>
            ) : null}
        </section>
    );
}
