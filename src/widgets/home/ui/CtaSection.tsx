"use client";

import { motion } from "framer-motion";

export function CtaSection() {
    return (
        <section className="relative flex min-h-[60dvh] items-center overflow-hidden bg-[linear-gradient(135deg,#1e1e1e_0%,#2d2420_100%)] py-[clamp(8rem,10vw,14rem)]" id="cta">
            <div className="absolute -right-[20rem] -top-[20rem] h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(circle,rgba(232,168,156,0.12)_0%,transparent_65%)]" />
            <div className="absolute -bottom-[15rem] -left-[15rem] h-[45rem] w-[45rem] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.1)_0%,transparent_65%)]" />
            <div className="mx-auto w-[min(112rem,90%)]">
                <motion.div
                    className="relative z-[2] text-center"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="mb-6 text-[1.1rem] font-medium uppercase tracking-[0.28em] text-[#c9a96e]">Join JNS Entertainment</div>
                    <h2 className="mb-5 font-serif text-[clamp(2.8rem,4vw,5.2rem)] font-normal leading-[1.45] text-white">
                        지금 바로 시작하세요.
                        <br />
                        <span className="bg-[linear-gradient(135deg,#e8a89c_0%,#c9a96e_100%)] bg-clip-text text-transparent">당신의 첫 방송, JNS와 함께.</span>
                    </h2>
                    <p className="mb-12 text-[1.5rem] leading-[1.8] text-white/55">
                        초보도, 투잡도, 경험 없어도 괜찮습니다.
                        <br />
                        제이엔에스엔터테인먼트가 방송 시작부터 성장까지 함께합니다.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a className="inline-flex items-center rounded-full bg-[linear-gradient(135deg,#e8a89c_0%,#d4897b_100%)] px-12 py-[1.8rem] text-[1.5rem] font-medium tracking-[0.04em] text-white shadow-[0_1rem_3.6rem_rgba(212,137,123,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_1.6rem_4.8rem_rgba(212,137,123,0.5)]" href="https://open.kakao.com">
                            카카오톡으로 문의하기
                        </a>
                        <a className="inline-flex items-center rounded-full border border-[#c9a96e]/60 px-10 py-[1.7rem] text-[1.5rem] font-medium tracking-[0.04em] text-[#e8d5b0] transition hover:border-[#c9a96e] hover:text-[#c9a96e]" href="tel:010-0000-0000">
                            전화 상담 신청
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
