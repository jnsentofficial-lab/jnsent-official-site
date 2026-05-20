"use client";

import { motion } from "framer-motion";

const aboutItems = [
    "플랫폼 직속 엔터테인먼트 운영으로 안정적인 방송 환경 제공",
    "협력 포함 120명 이상의 BJ 네트워크를 통한 크루 방송 운영",
    "방송 컨설팅 및 전담 매니저 1:1 배정 시스템",
    "콘텐츠 방향성 설계부터 장비 세팅까지 전 과정 지원",
    "공정 계약 운영 지향 — 최대 10:0 계약 조건 가능",
];

export function AboutSection() {
    return (
        <section className="flex min-h-dvh items-center bg-white py-[clamp(8rem,10vw,14rem)]" id="about">
            <div className="mx-auto w-[min(112rem,90%)]">
                <div className="grid items-center gap-20 lg:grid-cols-2 max-[90rem]:gap-12">
                    <motion.div
                        className="relative max-[90rem]:order-first"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="absolute -left-5 -top-5 -z-0 h-full w-full rounded border border-[#e8d5b0]" />
                        <div className="relative z-[1] min-h-[52rem] rounded bg-[linear-gradient(135deg,#f5f0eb_0%,#f7ede9_52%,#e8d5b0_100%)] shadow-[0_2rem_7rem_rgba(0,0,0,0.06)]">
                            <div className="absolute inset-8 rounded-sm border border-white/70" />
                            <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white/55 p-6 backdrop-blur-md">
                                <p className="text-sm leading-[1.8] text-[#555]">JNS 매니저와 BJ 파트너가 함께 방송 방향을 설계하는 상담 환경</p>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 z-[2] rounded-xl border border-[#ede8e3] bg-white px-6 py-5 shadow-[0_0.8rem_3.2rem_rgba(0,0,0,0.06)]">
                            <div className="font-serif text-[2.8rem] font-medium leading-none text-[#1e1e1e]">
                                5<span className="text-[#d4897b]">년+</span>
                            </div>
                            <div className="mt-1 text-[1.1rem] text-[#888]">라이브 콘텐츠 운영 경험</div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <span className="mb-3 block text-[1.1rem] font-medium uppercase tracking-[0.25em] text-[#c9a96e]">About JNS</span>
                        <span className="mb-5 block h-[0.15rem] w-12 bg-[linear-gradient(90deg,#c9a96e,#e8d5b0)]" />
                        <h2 className="font-serif text-[clamp(2.6rem,3.5vw,4.2rem)] font-normal leading-[1.45] text-[#1e1e1e]">
                            체계적인 시스템으로
                            <br />
                            <strong className="font-semibold">당신의 방송을 함께 만들어갑니다</strong>
                        </h2>
                        <p className="mt-5 text-[clamp(1.4rem,1.5vw,1.6rem)] leading-[1.9] text-[#555]">
                            제이엔에스엔터테인먼트는 플랫폼 직속 운영사로서 5년 이상의 라이브 콘텐츠 운영 경험을 바탕으로 BJ 파트너 한 분 한 분의 성장을 책임지는 매니지먼트 시스템을 운영하고 있습니다.
                        </p>
                        <ul className="mt-9 flex list-none flex-col gap-4 p-0">
                            {aboutItems.map((item) => (
                                <li className="flex items-start gap-3.5 text-[1.5rem] leading-[1.7] text-[#555] before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-[linear-gradient(135deg,#e8a89c,#c9a96e)] before:content-['']" key={item}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
