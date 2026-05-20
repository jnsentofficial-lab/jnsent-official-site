"use client";

import { motion } from "framer-motion";

export function FinalCtaSection() {
    return (
        <section className="relative min-h-[66rem] overflow-hidden bg-black px-6 py-[16rem] text-center text-white max-[86rem]:min-h-0 max-[86rem]:py-24">
            <div className="absolute inset-0 bg-[url('/images/landing/meetingCta.webp')] bg-cover bg-center opacity-55" />
            <div className="absolute inset-0 bg-black/45" />
            <motion.div
                className="relative z-[1] mx-auto max-w-[78rem]"
                initial={{ opacity: 0, y: 28 }}
                transition={{ duration: 0.75 }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                <h2 className="m-0 text-5xl font-black leading-[1.32] max-[86rem]:text-4xl">
                    제이엔에스와 함께
                    <br />
                    신뢰할 수 있는 미래를 만들어보세요
                </h2>
                <p className="mx-auto mt-7 mb-0 max-w-[54rem] text-xl font-semibold leading-[1.75] text-white/80">
                    성장에 필요한 장비, 공간, 매니징, 정산 구조까지 처음부터 투명하게 안내합니다.
                </p>
                <motion.a
                    className="mt-10 inline-flex items-center justify-center rounded-full border border-white bg-black px-8 py-4 text-base font-black text-white"
                    href="/bjSupport"
                    whileHover={{ y: -2 }}
                >
                    문의하기
                </motion.a>
            </motion.div>
        </section>
    );
}
