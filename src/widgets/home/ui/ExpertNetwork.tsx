"use client";

import { useSectionTheme } from "@/shared/hooks";
import { Text } from "@/shared/ui/kit/Text";
import { motion } from "framer-motion";
import { useRef } from "react";

const experts = [
    { title: "전담 매니저", text: "방송 일정 및 성장 방향 관리" },
    { title: "회사 직영팀", text: "운영 자료와 계약 조건 검수" },
    { title: "방송장비 엔지니어", text: "PC, 조명, 음향 세팅 지원" },
    { title: "서버 관리자", text: "방송 환경 점검 및 보안 관리" },
    { title: "마케팅팀", text: "콘텐츠 확산과 채널 운영" },
    { title: "회계팀", text: "정산 자료 확인 및 안내" },
];

export function ExpertNetwork() {
    const sectionRef = useRef<HTMLElement>(null);

    // useSectionTheme(sectionRef, { activeTheme: "semiMild", defaultTheme: "dark", threshold: 0.5 });

    return (
        <section
            ref={sectionRef}
            className="h-[100dvh] flex justify-center items-center"
        >
            <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))] text-center">
                <Text.Reveal
                    as="h2"
                    className="text-[3.8rem] font-black leading-[1.5]"
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

                <div className="mt-16 grid gap-5 md:grid-cols-3 xl:grid-cols-6">
                    {experts.map((item, index) => (
                        <motion.article
                            className="min-h-[15rem] rounded-2xl border border-black/5 bg-white px-5 py-7 shadow-[0_1rem_2.4rem_rgba(20,30,40,0.06)]"
                            initial={{ opacity: 0, y: 24 }}
                            key={item.title}
                            transition={{ delay: index * 0.04, duration: 0.6 }}
                            viewport={{ once: true, amount: 0.25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-[#fff1f3] text-lg font-black text-[#ff6673]">{index + 1}</span>
                            <strong className="mt-5 block text-xl font-black text-black">{item.title}</strong>
                            <p className="mt-2 mb-0 text-sm font-semibold leading-[1.55] text-neutral-500">{item.text}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
