"use client";

import Text from "@/shared/ui/reveal";
import { motion } from "framer-motion";

const records = [
    { value: 2500000, label: "개인방송 단일 최고" },
    { value: 6230000, label: "주간 BJ 최고 기록" },
    { value: 7324709, label: "크루방송 단일 회차 최고" },
];

export function RecordGraph() {
    return (
        <section className="relative h-[100dvh] overflow-hidden py-[16rem] max-[86rem]:min-h-0 max-[86rem]:py-24">
            {/* <div className="relative max-w-[var(--size-pc)] mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-[36rem_minmax(0,1fr)] items-center gap-10 max-[86rem]:grid-cols-1"> */}
            <div className="relative max-w-[var(--size-pc)] w-full mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.25 }}
                    transition={{ duration: 0.7 }}
                    className="absolute "
                >
                    <section className="flex items-center">
                        <img
                            src={"/images/icon/filled/ico-filled-bay-tree.svg"}
                            alt=""
                            className="w-[3.2rem]"
                        />

                        <Text.Shimmer
                            as="p"
                            duration={4}
                            color={{
                                start: "#000000",
                                end: "#00000050",
                            }}
                            className="text-[2.0rem] font-bold"
                        >
                            플랫폼 신기록
                        </Text.Shimmer>

                        <img
                            src={"/images/icon/filled/ico-filled-bay-tree.svg"}
                            alt=""
                            className="w-[3.2rem]"
                            style={{
                                transform: "scaleX(-1)",
                            }}
                        />
                    </section>
                    {/* <p className="mb-6 text-xl font-extrabold text-neutral-300">
                    〔 플랫폼 신기록 〕
                    </p> */}
                    <Text.Reveal
                        as="h2"
                        className="max-w-[92rem] text-[3.8rem] leading-[1.5] max-[64rem]:text-5xl max-[48rem]:text-4xl"
                        initialColor="#ffffff00"
                        revealColor="#000000"
                        highlightColor="#FF6B75"
                        revealWindow={0.5}
                        // transition={2}
                        align="left"
                        delay={2}
                    >
                        {`기록은 거짓말하지 않습니다\n결과로 증명된 운영성과`}
                    </Text.Reveal>

                    <h2 className="m-0 text-5xl leading-[1.28] max-[86rem]:text-4xl"></h2>

                    <div className="mt-12 grid gap-8">
                        {records.map((record) => (
                            <div key={record.label}>
                                <Text.Rolling
                                    value={record.value}
                                    textSize={28}
                                    rollingCount={5}
                                />
                                {/* <Text.Rolling
                                    value={record.value}
                                    textSize={28}
                                    rollingCount={5}
                                /> */}
                                {/* <strong className="block text-[2.8rem] font-black">{record.value}</strong> */}
                                <span className="mt-2 block text-[1.8rem] text-base font-bold text-neutral-500">{record.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="relative w-full "
                // className="relative h-[54rem] max-[86rem]:h-[32rem]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.25, once: false }}
                transition={{ duration: 0.9 }}
                style={{
                    maskImage: "linear-gradient(90deg, transparent 5%, transparent 20%, black 80%, black 100%)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent 5%, transparent 20%, black 80%, black 100%)",
                }}
            >
                <svg
                    className="h-full w-full"
                    viewBox="0 0 760 460"
                >
                    <motion.polyline
                        fill="none"
                        points="30,390 190,310 330,345 470,160 615,220 725,45"
                        stroke="#ff7b86"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0.25 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ amount: 0.25, once: false }}
                        // viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                    <motion.circle
                        cx="725"
                        cy="45"
                        fill="#ff6b7650"
                        r="2"
                        animate={{
                            opacity: [0.25, 1, 0.25],
                            // r: [6, 14, 6],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1,
                            repeatDelay: 0,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.circle
                        cx="725"
                        cy="45"
                        fill="#ff6b76"
                        r="3"
                        initial={{ pathLength: 0, opacity: 0.25 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ amount: 0.25, once: false }}
                        // viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />

                    <circle
                        cx="725"
                        cy="45"
                        fill="#ff6b76"
                        opacity="0.12"
                        r="8"
                    />
                </svg>
            </motion.div>
        </section>
    );
}
