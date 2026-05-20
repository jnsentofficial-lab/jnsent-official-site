"use client";

import { motion } from "framer-motion";

const records = [
    { value: "2,500,000개 +", label: "개인방송 단일 최고" },
    { value: "6,230,000개 +", label: "주간 BJ 최고 기록" },
    { value: "7,324,709개", label: "크루방송 단일 회차 최고" },
];

export function RecordGraph() {
    return (
        <section className="relative min-h-[96rem] overflow-hidden bg-white py-[16rem] max-[86rem]:min-h-0 max-[86rem]:py-24">
            <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-[36rem_minmax(0,1fr)] items-center gap-10 max-[86rem]:grid-cols-1">
                <motion.div
                    initial={{ opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="mb-6 text-xl font-extrabold text-neutral-300">〔 플랫폼 신기록 〕</p>
                    <h2 className="m-0 text-5xl font-black leading-[1.28] max-[86rem]:text-4xl">
                        기록은 거짓말하지 않습니다
                        <br />
                        결과로 증명된 <span className="text-[#ff6673]">운영성과</span>
                    </h2>
                    <div className="mt-12 grid gap-8">
                        {records.map((record) => (
                            <div key={record.label}>
                                <strong className="block text-4xl font-black">{record.value}</strong>
                                <span className="mt-2 block text-base font-bold text-neutral-500">{record.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
                <motion.div
                    className="relative h-[54rem] max-[86rem]:h-[32rem]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.9 }}
                >
                    <svg className="h-full w-full" viewBox="0 0 760 460">
                        <motion.polyline
                            fill="none"
                            points="30,390 190,310 330,345 470,160 615,220 725,45"
                            stroke="#ff7b86"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="7"
                            initial={{ pathLength: 0, opacity: 0.25 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                        <circle cx="725" cy="45" fill="#ff6b76" r="11" />
                        <circle cx="725" cy="45" fill="#ff6b76" opacity="0.12" r="48" />
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
