"use client";

import { useSectionTheme } from "@/shared/hooks";
import { Text } from "@/shared/ui/kit/Text";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const experts = [
    { icon: "ico-outlined-checklist", title: "전담 매니저", text: "방송 일정 및 성장 방향 관리" },
    { icon: "ico-outlined-judge", title: "회사 직영팀", text: "운영 자료와 계약 조건 검수" },
    { icon: "ico-outlined-checklist", title: "방송장비 엔지니어", text: "PC, 조명, 음향 세팅 지원" },
    { icon: "ico-outlined-headset", title: "서버 관리자", text: "방송 환경 점검 및 보안 관리" },
    { icon: "ico-outlined-server", title: "마케팅팀", text: "콘텐츠 확산과 채널 운영" },
    { icon: "ico-outlined-money", title: "회계팀", text: "정산 자료 확인 및 안내" },
];

export function ExpertNetwork() {
    const sectionRef = useRef<HTMLElement>(null);

    // useSectionTheme(sectionRef, { activeTheme: "semiMild", defaultTheme: "dark", threshold: 0.5 });

    return (
        <section
            ref={sectionRef}
            className="h-[100dvh] flex justify-center items-center"
        >
            <div className="mx-auto max-w-[var(--size-pc)] w-full text-center">
                <Text.Reveal
                    as="h2"
                    className="text-[3.8rem] font-[700] leading-[1.5]"
                    initialColor="#00000000"
                    midColor="rgb(255, 92, 118)"
                    revealColor="rgb(0, 0, 0)"
                    revealWindow={0.5}
                    align="center"
                    revealStartPosition={20}
                    revealEndPosition={60}
                    delay={2}
                    transition={0}
                >
                    {`성장을 위한\n모든 분야의 전문가들이 함께합니다.`}
                </Text.Reveal>

                <div className="h-[4rem] w-[0.1rem] bg-[var(--adaptive-black200)]" />
                <div className="bg-[var(--adaptive-black200)] h-[0.1rem] w-[84.1%] mx-auto" />

                <div className="mt-16 grid gap-5 md:grid-cols-3 xl:grid-cols-6">
                    {experts.map((item, index) => (
                        <motion.article
                            // className="min-h-[15rem] rounded-2xl border border-black/5 bg-white px-5 py-7 shadow-[0_1rem_2.4rem_rgba(20,30,40,0.06)]"
                            className="relative bg-white rounded-[2.4rem] flex flex-col gap-[1.6rem] justify-center items-center p-[1.6rem]"
                            initial={{ opacity: 0, y: 24 }}
                            key={item.title}
                            transition={{ delay: index * 0.04, duration: 0.6 }}
                            viewport={{ once: true, amount: 0.25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <div className="h-[4rem] w-[0.1rem] bg-[var(--adaptive-black200)] absolute top-[-4rem] left-[50%] transform trnaslate-x-[-50%]" />
                            <Image
                                src={`/images/icon/outlined/${item.icon}.svg`}
                                alt=""
                                width={48}
                                height={48}
                            />

                            <h6 className="block text-[2.0rem] font-[700] text-black">{item.title}</h6>
                            <p className="mb-0 text-[1.6rem] font-semibold leading-[1.55] text-neutral-500">{item.text}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
