"use client";

import { motion } from "framer-motion";

const knowhowItems = [
    { title: "플랫폼 직속 엔터", text: "협력 포함 120명 이상의 BJ 네트워크 보유" },
    { title: "전문 매니징", text: "5년 이상 경력의 전담 매니저 배정 및 콘텐츠 방향성 컨설팅" },
    { title: "크루방송 단일 회차", text: "장기 계약 강요 없는 공정 계약 지향 및 최대 10:0 계약 가능" },
    { title: "크루 시스템", text: "자체 크루 및 엑셀 방송 진행으로 빠른 성장 지원" },
];

export function OperationKnowhow() {
    return (
        <section className="relative min-h-[82rem] overflow-hidden bg-[#07101f] py-[16rem] text-white max-[86rem]:min-h-0 max-[86rem]:py-24">
            <div className="absolute inset-0 bg-[url('/images/landing/studioBlue.webp')] bg-cover bg-center opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-[#07101f]/65 to-[#07101f]/95" />
            <motion.div
                className="relative z-[1] ml-auto w-[min(72rem,calc(100%_-_3.2rem))] pr-[max(1.6rem,calc((100vw_-_112rem)/2))]"
                initial={{ opacity: 0, x: 34 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75 }}
            >
                <h2 className="m-0 text-5xl font-black leading-[1.32] max-[86rem]:text-4xl">
                    2017년부터 쌓아온 운영 노하우
                    <br />
                    당신의 <span className="text-[#ff6673]">성장에만</span> 집중합니다.
                </h2>
                <div className="mt-14 grid gap-9">
                    {knowhowItems.map((item) => (
                        <div key={item.title}>
                            <h3 className="m-0 text-2xl font-black">{item.title}</h3>
                            <p className="mt-2 mb-0 text-base leading-[1.75] text-white/70">{item.text}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
