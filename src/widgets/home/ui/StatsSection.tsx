"use client";

import { motion } from "framer-motion";

const stats = [
    { icon: "🏆", value: "7,324,", accent: "709", label: "크루 방송 단일 회차 최고 달성" },
    { icon: "⭐", value: "6,230,", accent: "000", label: "주간 BJ 최고 달성" },
    { icon: "✨", value: "2,500,", accent: "000+", label: "개인방송 단일 방송 최고 달성" },
];

export function StatsSection() {
    return (
        <section className="relative flex min-h-dvh items-center overflow-hidden py-[clamp(8rem,10vw,14rem)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_26%,rgba(232,168,156,0.24),transparent_30%),radial-gradient(circle_at_78%_72%,rgba(201,169,110,0.18),transparent_34%),linear-gradient(135deg,#faf8f6,#ffffff)] opacity-90" />
            <div className="relative z-[2] w-full">
                <div className="mx-auto w-[min(112rem,90%)]">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="mb-3 block text-[1.1rem] font-medium uppercase tracking-[0.25em] text-[#c9a96e]">Platform Records</span>
                        <span className="mx-auto mb-5 block h-[0.15rem] w-12 bg-[linear-gradient(90deg,#c9a96e,#e8d5b0)]" />
                        <h2 className="text-center font-serif text-[clamp(2.6rem,3.5vw,4.2rem)] font-normal leading-[1.45] text-[#1e1e1e]">
                            숫자로 증명하는
                            <br />
                            <strong className="font-semibold">JNS의 운영 성과</strong>
                        </h2>
                    </motion.div>
                    <motion.div
                        className="mt-[6rem] grid gap-0.5 bg-[#ede8e3] lg:grid-cols-3"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        {stats.map((stat) => (
                            <article className="bg-white/90 px-10 py-12 text-center backdrop-blur transition hover:bg-white" key={stat.label}>
                                <span className="mb-4 block text-[2.8rem]">{stat.icon}</span>
                                <div className="mb-2.5 font-serif text-[clamp(2.8rem,3.5vw,4.4rem)] font-medium leading-none text-[#1e1e1e]">
                                    {stat.value}
                                    <span className="text-[#d4897b]">{stat.accent}</span>
                                </div>
                                <div className="text-[1.3rem] leading-[1.6] tracking-[0.04em] text-[#888]">{stat.label}</div>
                            </article>
                        ))}
                    </motion.div>
                    <motion.p
                        className="mt-8 text-center text-[clamp(1.4rem,1.5vw,1.6rem)] leading-[1.9] text-[#555]"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        단순한 수치가 아닌, 실제 운영을 통해 쌓아온 플랫폼 신기록입니다.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
