"use client";

import { useSectionTheme } from "@/shared/hooks";
import useScrollProgress from "@/shared/hooks/useScrollProgress";
import { Text } from "@/shared/ui/kit/Text";
import { motion } from "framer-motion";
import { useRef } from "react";

const proofCards = [
    { icon: "▣", title: "실제 10:0 계약서", text: "일부 업체의 허위 홍보와 다릅니다. 실제 계약 사례와 계약서를 즉시 대조해드립니다." },
    { icon: "☑", title: "부가세 신고 자료", text: "운영 규모를 속이지 않습니다. 세무 자료 기반으로 투명한 운영 수치를 공개합니다." },
    { icon: "◌", title: "허위 사실 보상제", text: "안내드린 내용이 사실과 다를 경우 공식적인 보상 절차를 진행합니다." },
];

export function TransparencyProof() {
    const sectionRef = useRef<HTMLElement>(null);

    useSectionTheme(sectionRef, { activeTheme: "dark", defaultTheme: "light", threshold: 0.5 });
    // const [ref, { progress, status }] = useScrollProgress();

    return (
        <section
            className="relative flex h-[100dvh] items-center justify-center"
            ref={sectionRef}
        >
            {/* <motion.div
                className="absolute inset-0 bg-[url('/images/landing/meeting.webp')] bg-cover bg-center opacity-55"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: 0.8, duration: 0.7 }}
            /> */}
            <div
                // ref={ref}
                className="absolute inset-0 pointer-events-none z-0"
            >
                <motion.img
                    className="w-full h-full object-cover"
                    src={"/images/landing/meeting.png"}
                    alt=""
                    style={{
                        maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                    }}
                    // animate={{
                    //     translateY: progress,
                    // }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    viewport={{ amount: 0.1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                />
            </div>

            {/* <div className="relative z-[1] mx-auto w-[min(112rem,calc(100%_-_3.2rem))]"> */}
            <div className="relative z-[1] w-full">
                <div
                    className="max-w-[var(--size-pc)] mx-auto flex flex-col gap-[3.2rem]"
                    // initial={{ opacity: 0, y: 32 }}
                    // whileInView={{ opacity: 1, y: 0 }}
                    // viewport={{ once: true, amount: 0.25 }}
                    // transition={{ duration: 0.7 }}
                >
                    <Text.Reveal
                        as="h2"
                        className="text-[3.8rem] font-[700] leading-[1.5]"
                        initialColor="#00000000"
                        midColor="rgb(255, 92, 118)"
                        revealColor="rgb(255, 255, 255)"
                        revealWindow={0.5}
                        revealStartPosition={20}
                        revealEndPosition={60}
                        delay={1}
                        transition={0}
                        align="left"
                    >
                        {`모든 데이터는 공개될 수 있을 때\n진짜가 됩니다.`}
                    </Text.Reveal>

                    <p className="text-[2.4rem] leading-[1.5] text-[#ffffff90]">
                        제이엔에스는 말이 아닌, 실제 운영 데이터로 증명합니다.
                        <br />
                        초보 BJ분들도 안심하고 시작할 수 있는 투명한 환경을 약속드립니다.
                    </p>
                </div>

                <div className="mt-24 grid gap-6 md:grid-cols-3">
                    {/* {proofCards.map((item, index) => (
                        <section
                            key={item.title}
                            className="rounded-[3.2rem] overflow-hidden"
                        >
                            <section className="bg-[var(--adaptive-blackOpacity100)] p-8 backdrop-blur-xl">
                                <p className="bg-[var(--adaptive-blackOpacity500)] w-[3.2rem] h-[3.2rem] text-[1.0rem] flex items-center justify-center text-[var(--adaptive-greyOpacity400)] rounded-[0.8rem]">
                                    ICON
                                    <br />
                                    AREA
                                </p>
                                <h3 className="mt-7 mb-5 text-2xl font-[700]">{item.title}</h3>
                            </section>

                            <section className="bg-[var(--adaptive-blackOpacity300)] p-8 backdrop-blur-xl">
                                <p className="m-0 text-base leading-[1.75] text-white/70">{item.text}</p>
                            </section>
                        </section>
                    ))} */}
                </div>
            </div>
        </section>
    );
}
