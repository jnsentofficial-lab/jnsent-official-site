"use client";

import { useSectionTheme } from "@/shared/hooks";
import { Text } from "@/shared/ui/kit/Text";
import { motion } from "framer-motion";
import { useRef } from "react";

const principleItems = [
    { title: "정확한 계약서", text: "계약 전 모든 조건을 문서로 먼저 확인합니다." },
    { title: "직접 확인하세요", text: "정산과 운영 자료를 투명하게 안내합니다." },
    { title: "검증된 운영사례", text: "실제 성장 사례 중심으로 방향을 잡습니다." },
];

export function TrustPrinciples() {
    const sectionRef = useRef<HTMLElement>(null);

    useSectionTheme(sectionRef, { activeTheme: "mild", defaultTheme: "light", threshold: 0.5 });

    return (
        // <section className="bg-[#f3f6f7] py-[16rem] max-[86rem]:py-24">
        <section
            ref={sectionRef}
            className="h-[100dvh] flex justify-center items-center"
        >
            <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-[minmax(0,1fr)_44rem] items-center gap-14 max-[86rem]:grid-cols-1">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    {/* <h2 className="m-0 text-5xl font-black leading-[1.3] text-black max-[86rem]:text-4xl">
                        투명한 인터넷 방송 생태계를 위한,
                        <br />
                        제이엔에스가 지키는 단호한 <span className="text-[#ff6673]">원칙</span>
                    </h2> */}
                    <Text.Reveal
                        as="h2"
                        className="text-[3.8rem] leading-[1.5]"
                        initialColor="#00000000"
                        midColor="rgb(255, 92, 118)"
                        revealColor="rgb(0, 0, 0)"
                        revealWindow={0.5}
                        align="left"
                        revealStartPosition={20}
                        revealEndPosition={60}
                        delay={2}
                        transition={0}
                    >
                        {`투명한 인터넷 방송 생태계를 위한,\n제이엔에스가 지키는 단호한 원칙`}
                    </Text.Reveal>

                    <div className="mt-12 grid max-w-[56rem] gap-5">
                        {principleItems.map((item) => (
                            <article
                                className="rounded-2xl bg-white px-8 py-7 shadow-[0_1.2rem_3rem_rgba(20,30,40,0.06)]"
                                key={item.title}
                            >
                                <strong className="block text-2xl font-black text-black">{item.title}</strong>
                                <p className="mt-2 mb-0 text-base font-semibold leading-[1.7] text-neutral-500">{item.text}</p>
                            </article>
                        ))}
                    </div>
                </motion.div>
                <motion.article
                    className="relative min-h-[43rem] overflow-hidden rounded-[2.4rem] bg-black p-8 text-white shadow-[0_2rem_5rem_rgba(20,30,40,0.18)]"
                    initial={{ opacity: 0, x: 28 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                >
                    <div className="absolute inset-0 bg-[url('/images/landing/meeting.webp')] bg-cover bg-center opacity-55" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
                    <div className="relative z-[1] flex h-full min-h-[38rem] flex-col justify-end">
                        <p className="mb-5 text-base font-bold text-[#78f39b]">실제 운영 자료 기반 안내</p>
                        <h3 className="m-0 text-3xl font-black leading-[1.35]">
                            허위 수익 홍보가 아닌
                            <br />
                            확인 가능한 성장 구조
                        </h3>
                        <div className="mt-8 grid grid-cols-3 gap-3 text-center text-sm font-black">
                            <span className="rounded-xl bg-white/12 px-3 py-4 backdrop-blur">계약</span>
                            <span className="rounded-xl bg-white/12 px-3 py-4 backdrop-blur">정산</span>
                            <span className="rounded-xl bg-white/12 px-3 py-4 backdrop-blur">지원</span>
                        </div>
                    </div>
                </motion.article>
            </div>
        </section>
    );
}
