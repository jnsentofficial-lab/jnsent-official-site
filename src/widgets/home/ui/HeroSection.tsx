"use client";

import { motion } from "framer-motion";

const badges = [
    { value: "8", suffix: "년+", label: "운영 경험" },
    { value: "120", suffix: "명+", label: "BJ 네트워크" },
    { value: "10", suffix: ":0", label: "최대 계약 조건" },
];

export function HeroSection() {
    return (
        <section className="relative grid min-h-dvh overflow-hidden bg-[#faf8f6] lg:grid-cols-2">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-32 -top-32 h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(232,168,156,0.18)_0%,transparent_70%)]" />
                <div className="absolute -bottom-20 -left-20 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.12)_0%,transparent_70%)]" />
            </div>
            <motion.div
                className="relative z-[2] px-[6%] pb-20 pt-30 lg:pl-[8%]"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="mb-8 inline-flex items-center gap-2.5 text-[1.1rem] font-medium uppercase tracking-[0.28em] text-[#c9a96e] before:block before:h-px before:w-8 before:bg-[#c9a96e]">
                    JNS Entertainment · BJ Partner Recruit
                </div>
                <h1 className="mb-7 font-serif text-[clamp(3rem,3.8vw,5.2rem)] font-normal leading-[1.4] text-[#1e1e1e]">
                    혼자 시작하지 마세요.
                    <br />
                    <span className="bg-[linear-gradient(135deg,#e8a89c_0%,#d4897b_100%)] bg-clip-text text-transparent">제이엔에스가 방송 시작부터</span>
                    <br />
                    성장까지 함께합니다.
                </h1>
                <p className="mb-11 max-w-[44rem] text-[clamp(1.4rem,1.5vw,1.6rem)] leading-[1.9] text-[#555]">
                    플랫폼 신기록을 보유한 라이브 콘텐츠 운영사.
                    <br />
                    초보·투잡·방송 경험 없는 분들도 체계적인 시스템 안에서 안정적으로 시작할 수 있습니다.
                </p>
                <div className="flex flex-wrap gap-4">
                    <a className="inline-flex items-center rounded-full bg-[linear-gradient(135deg,#e8a89c_0%,#d4897b_100%)] px-9 py-4 text-sm font-medium tracking-[0.04em] text-white shadow-[0_0.8rem_2.8rem_rgba(212,137,123,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_1.2rem_3.6rem_rgba(212,137,123,0.45)]" href="#cta">
                        BJ 파트너 지원하기
                    </a>
                    <a className="inline-flex items-center rounded-full border border-[#c9a96e] px-8 py-[1.5rem] text-sm font-medium tracking-[0.04em] text-[#a8874a] transition hover:bg-[#c9a96e] hover:text-white" href="#about">
                        더 알아보기
                    </a>
                </div>
                <div className="mt-[5.2rem] flex flex-wrap gap-6">
                    {badges.map((badge, index) => (
                        <div className="contents" key={badge.label}>
                            {index > 0 ? <div className="w-px self-stretch bg-[#ede8e3]" /> : null}
                            <div className="flex flex-col gap-1">
                                <span className="font-serif text-[2.2rem] font-medium text-[#1e1e1e]">
                                    {badge.value}
                                    <span className="text-[#d4897b]">{badge.suffix}</span>
                                </span>
                                <span className="text-[1.1rem] tracking-[0.06em] text-[#888]">{badge.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
            <motion.div
                className="relative hidden min-h-dvh overflow-hidden lg:block"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
            >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7ede9_0%,#2d2420_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_30%,rgba(255,255,255,0.45),transparent_26%),linear-gradient(to_right,#faf8f6_0%,transparent_25%)]" />
                <div className="absolute bottom-[12%] left-[12%] right-[12%] rounded-3xl border border-white/40 bg-white/30 p-8 shadow-[0_2.4rem_8rem_rgba(30,30,30,0.16)] backdrop-blur-xl">
                    <div className="mb-6 h-56 rounded-2xl bg-[linear-gradient(135deg,rgba(232,168,156,0.9),rgba(201,169,110,0.52)),radial-gradient(circle_at_72%_24%,rgba(255,255,255,0.75),transparent_22%)]" />
                    <p className="text-sm font-medium tracking-[0.18em] text-white">LIVE CONTENT STUDIO</p>
                </div>
            </motion.div>
        </section>
    );
}
