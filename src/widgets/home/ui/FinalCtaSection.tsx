"use client";

import { useSectionTheme } from "@/shared/hooks";
import { Text } from "@/shared/ui/kit/Text";
import { motion } from "framer-motion";
import { useRef } from "react";

export function FinalCtaSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useSectionTheme(sectionRef, { activeTheme: "dark", defaultTheme: "light", threshold: 0.5 });

    return (
        <section
            ref={sectionRef}
            className="relative h-[100dvh]"
        >
            <div
                className="absolute w-full left-[50%] transform translate-x-[-50%] inset-0 pointer-events-none z-0"
                // style={{
                //     width: `${progress}%`,
                // }}
            >
                <motion.img
                    className="w-full h-full object-cover"
                    src={"/images/landing/cta.jpg"}
                    alt=""
                    style={{
                        maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                        // objectPosition: `0 ${progress / 3}%`,
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    viewport={{ amount: 0.1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                />
            </div>

            <motion.div
                className="relative z-[100] mx-auto max-w-[78rem] h-full flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: 28 }}
                transition={{ duration: 0.75 }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                <section className="flex flex-col gap-[1.6rem]">
                    <Text.Reveal
                        as="h2"
                        className="text-[3.8rem] font-[700] leading-[1.5]"
                        initialColor="#00000000"
                        midColor="rgb(255, 92, 118)"
                        revealColor="rgb(255, 255, 255)"
                        revealWindow={0.5}
                        align="center"
                        revealStartPosition={20}
                        revealEndPosition={60}
                        delay={2}
                        transition={0}
                    >
                        {`제이엔에스와 함께\n신뢰할 수 있는 미래를 만들어보세요`}
                    </Text.Reveal>

                    <p className="text-[2.0rem] text-[var(--adaptive-greyOpacity700)] font-[500]">성장에 필요한 장비, 공간, 매니징, 정산 구조까지 처음부터 투명하게 안내합니다.</p>
                </section>

                <motion.a
                    className="mt-10 inline-flex items-center justify-center rounded-full border border-white bg-black px-8 py-4 text-base font-[700] text-white"
                    href="/bjSupport"
                    whileHover={{ y: -2 }}
                >
                    문의하기
                </motion.a>
            </motion.div>
        </section>
    );
}
