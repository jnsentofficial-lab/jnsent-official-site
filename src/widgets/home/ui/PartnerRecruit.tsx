"use client";

import { motion } from "framer-motion";

const recruitInfo = [
    { title: "대상", text: "만 20세 이상 여성, 초보 / 투잡 / 방송 경험 없는 분 적극 환영" },
    { title: "우대", text: "주 5일 / 일 최소 4시간 이상 가능자" },
    { title: "혜택", text: "원하는 시간·요일 자유 선택, 방송 교육 및 세팅 전액 지원" },
];

export function PartnerRecruit() {
    return (
        <section className="grid min-h-[86rem] grid-cols-2 bg-white max-[86rem]:grid-cols-1">
            <div className="min-h-[64rem] bg-[url('/images/landing/streamer.webp')] bg-cover bg-center" />
            <motion.div
                className="flex items-center px-[9vw] py-24"
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7 }}
            >
                <div className="max-w-[56rem]">
                    <h2 className="m-0 text-5xl font-black leading-[1.3] max-[86rem]:text-4xl">
                        제이엔에스와 함께
                        <br />
                        <span className="text-[#ff6673]">성장할 파트너</span>를 찾습니다
                    </h2>
                    <div className="mt-14 grid gap-10">
                        {recruitInfo.map((item) => (
                            <div key={item.title}>
                                <strong className="block text-2xl font-black">{item.title}</strong>
                                <span className="mt-2 block text-base font-semibold leading-[1.7] text-neutral-700">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
