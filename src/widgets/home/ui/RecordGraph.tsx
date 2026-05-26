"use client";

import { Text } from "@/shared/ui/kit/Text";
import { motion } from "framer-motion";
import Image from "next/image";

const records = [
    { value: 2500000, label: "개인방송 단일 최고" },
    { value: 6230000, label: "주간 BJ 최고 기록" },
    { value: 7324709, label: "크루방송 단일 회차 최고" },
];

/** path(30,390)→(725,45) + 끝점 원 여유만 포함 */
const GRAPH_VIEWBOX = "14 21 735 385";

export function RecordGraph() {
    return (
        <section className="relative h-dvh min-h-0 overflow-x-clip">
            <div className="absolute top-[clamp(1.6rem,4vw,4rem)] left-1/2 z-10 w-full max-w-[var(--size-pc)] -translate-x-1/2 px-[clamp(1.6rem,4vw,4rem)]">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.25 }}
                    transition={{ duration: 0.7 }}
                    className="shrink-0"
                >
                    <section className="flex items-center">
                        <Image
                            src={"/images/icon/filled/ico-filled-bay-tree.svg"}
                            alt=""
                            width={32}
                            height={32}
                        />

                        <Image
                            src={"/images/icon/filled/ico-filled-bay-tree.svg"}
                            alt=""
                            height={32}
                            width={32}
                            style={{
                                transform: "scaleX(-1)",
                            }}
                        />
                    </section>

                    <Text.Reveal
                        as="h2"
                        className="text-[3.8rem] font-black leading-[1.5]"
                        // className="max-w-[92rem] text-[3.8rem] leading-[1.5] max-[64rem]:text-5xl max-[48rem]:text-4xl"
                        initialColor="#ffffff00"
                        revealColor="#000000"
                        subHighlightColor="#A953FF"
                        highlightColor="#FF6B75"
                        revealWindow={0.5}
                        revealStartPosition={20}
                        revealEndPosition={60}
                        align="left"
                        delay={2}
                        transition={0}
                    >
                        {`기록은 거짓말하지 않습니다\n결과로 증명된 운영성과`}
                    </Text.Reveal>

                    <div className="mt-8 grid gap-6 max-[48rem]:mt-6 max-[48rem]:gap-4 min-[86rem]:mt-12 min-[86rem]:gap-8">
                        {records.map((record) => (
                            <div key={record.label}>
                                <Text.Rolling
                                    value={record.value}
                                    textSize={28}
                                    rollingCount={5}
                                />
                                <span className="mt-2 block text-[1.8rem] text-base font-bold text-neutral-500">{record.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.25, once: false }}
                transition={{ duration: 0.9 }}
                style={{
                    maskImage: "linear-gradient(90deg, transparent 0%, transparent 18%, black 55%, black 100%)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent 0%, transparent 18%, black 55%, black 100%)",
                }}
            >
                <svg
                    viewBox={GRAPH_VIEWBOX}
                    preserveAspectRatio="xMidYMid meet"
                    className="block h-auto w-[100dvw] max-w-none"
                    aria-hidden
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
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                    <motion.circle
                        cx="725"
                        cy="45"
                        fill="#ff6b7650"
                        r="2"
                        animate={{
                            opacity: [0.25, 1, 0.25],
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
