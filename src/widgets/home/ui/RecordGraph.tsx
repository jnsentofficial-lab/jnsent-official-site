"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Text } from "@/shared/ui/kit/Text";

const ACCENT_COLOR = "#ff6b75";

const graphBars = [
    { name: "2023", left: "10%", width: "10rem", height: "18%" },
    { name: "2024", left: "41%", width: "13rem", height: "50%" },
    { name: "2025", left: "81%", width: "15rem", height: "82%" },
];

const records = [
    { value: 2500000, label: "개인방송 단일 최고" },
    { value: 6230000, label: "주간 BJ 최고 기록" },
    { value: 8007828, label: "크루방송 단일 회차 최고" },
];

export function RecordGraph() {
    return (
        <section
            className="relative h-dvh min-h-0 overflow-x-clip"
            data-report-id="플랫폼 기록 섹션"
            data-report-type="group"
        >
            <div
                className="absolute top-[calc(50%-(1.6rem*2))] left-1/2 z-10 w-full -translate-x-1/2 translate-y-[-50%] px-[clamp(1.6rem,4vw,4rem)]"
                // className="absolute top-[clamp(1.6rem,4vw,4rem)] left-1/2 z-10 w-full -translate-x-1/2 px-[clamp(1.6rem,4vw,4rem)]"

                data-report-id="플랫폼 기록 카피"
                data-report-type="item"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.25 }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col gap-[1.6rem] max-w-[var(--size-pc)] mx-auto"
                >
                    <section className="flex items-center">
                        <Image
                            src={"/images/icon/filled/ico-filled-bay-tree.svg"}
                            alt=""
                            width={32}
                            height={32}
                            className="mobile:w-[2.4rem] mobile:h-[2.4rem] pc:w-[3.2rem] pc:h-[3.2rem]"
                        />

                        <Text.Shimmer
                            className="mobile:text-[1.8rem] pc:text-[2.4rem] font-[700] font-[NanumSquare]"
                            color={{
                                start: "#000000",
                                end: "#e0e0e0",
                            }}
                            duration={10}
                        >
                            플랫폼 신기록
                        </Text.Shimmer>

                        <Image
                            src={"/images/icon/filled/ico-filled-bay-tree.svg"}
                            alt=""
                            height={32}
                            width={32}
                            style={{
                                transform: "scaleX(-1)",
                                // width: "2.4rem",
                                // height: "2.4rem",
                            }}
                            className="mobile:w-[2.4rem] mobile:h-[2.4rem] pc:w-[3.2rem] pc:h-[3.2rem]"
                        />
                    </section>

                    <Text.Reveal
                        as="h2"
                        className="mobile:text-[2.4rem] pc:text-[3.8rem] font-[900] leading-[1.5]"
                        // className="max-w-[92rem] mobile:text-[2.4rem] pc:text-[3.8rem] leading-[1.5] max-[64rem]:text-5xl max-[48rem]:text-4xl"
                        initialColor="#ffffff00"
                        revealColor="#000000"
                        subHighlightColor="#A953FF"
                        highlightColor="#FF6B75"
                        revealWindow={0.5}
                        revealStartPosition={20}
                        revealEndPosition={60}
                        align="left"
                        // delay={2}
                        // transition={0}
                        transition={2}
                    >
                        {`기록은 거짓말하지 않습니다\n결과로 증명된 운영성과`}
                    </Text.Reveal>

                    <div
                        className="mt-8 grid gap-6 max-[48rem]:mt-6 max-[48rem]:gap-4 min-[86rem]:mt-12 min-[86rem]:gap-8"
                        data-report-id="플랫폼 기록 수치 목록"
                        data-report-type="item"
                    >
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
                className="pointer-events-none absolute inset-x-0 z-0 flex items-center justify-center overflow-x-hidden mobile:bottom-0 mobile:left-0 mobile:h-1/2 mobile:opacity-50 pc:left-[25%] pc:inset-y-0 pc:h-[90dvh] pc:opacity-100"
                data-report-id="플랫폼 기록 그래프"
                data-report-type="item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.2, once: false }}
                transition={{ duration: 0.9 }}
                style={{
                    maskImage: "linear-gradient(90deg, transparent 0%, transparent 10%, black 15%, black 100%)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent 0%, transparent 18%, black 55%, black 100%)",
                }}
            >
                <div className="relative h-full w-full">
                    <div className="absolute inset-x-0 top-[18%] border-t border-dashed border-[rgba(255,182,193,0.28)]" />
                    <div className="absolute inset-x-0 top-[44%] border-t border-dashed border-[rgba(255,182,193,0.22)]" />
                    <div className="absolute inset-x-0 top-[72%] border-t border-dashed border-[rgba(255,182,193,0.18)]" />
                    <div className="absolute inset-x-0 bottom-[6%] border-t border-dashed border-[rgba(255,182,193,0.12)]" />

                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full overflow-visible"
                    >
                        <defs>
                            <linearGradient
                                id="recordLineGradient"
                                x1="0%"
                                y1="100%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#ffd7dc"
                                    stopOpacity="0.08"
                                />
                                <stop
                                    offset="45%"
                                    stopColor="#f8b4bc"
                                    stopOpacity="0.48"
                                />
                                <stop
                                    offset="100%"
                                    stopColor={ACCENT_COLOR}
                                    stopOpacity="0.95"
                                />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 14 86 C 24 80, 35 69, 51 55 S 76 26, 88 12"
                            fill="none"
                            stroke="url(#recordLineGradient)"
                            strokeWidth="0.42"
                            strokeLinecap="round"
                        />
                        <path
                            d="M 90.2 8.6 L 93.5 12 L 90.2 15.4"
                            fill="none"
                            stroke={ACCENT_COLOR}
                            strokeWidth="0.42"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle
                            cx="14"
                            cy="86"
                            r="0.85"
                            fill="rgba(255,107,117,0.14)"
                        />
                        <circle
                            cx="14"
                            cy="86"
                            r="0.38"
                            fill={ACCENT_COLOR}
                        />
                        <circle
                            cx="51"
                            cy="55"
                            r="0.85"
                            fill="rgba(255,107,117,0.14)"
                        />
                        <circle
                            cx="51"
                            cy="55"
                            r="0.42"
                            fill={ACCENT_COLOR}
                        />
                        <circle
                            cx="88"
                            cy="12"
                            r="0.95"
                            fill="rgba(255,107,117,0.14)"
                        />
                        <circle
                            cx="88"
                            cy="12"
                            r="0.48"
                            fill={ACCENT_COLOR}
                        />
                    </svg>

                    {graphBars.map((bar) => (
                        <div
                            key={bar.name}
                            className="absolute bottom-[6%]"
                            style={{ left: bar.left, width: bar.width, height: bar.height }}
                        >
                            <div
                                className="h-full w-full rounded-t-[3.2rem] bg-[linear-gradient(90deg,#2b2b2b_0%,#121212_72%,#050505_100%)] shadow-[-16px_0_32px_rgba(255,255,255,0.08)_inset]"
                                style={{
                                    opacity: bar.name === "2023" ? 0.16 : 1,
                                }}
                            />
                            <span className="absolute left-1/2 top-[calc(100%+1.2rem)] -translate-x-1/2 text-[1.8rem] font-medium text-[#6b7280]">{bar.name}</span>
                        </div>
                    ))}

                    <div
                        className="absolute top-[31%] flex -translate-x-1/2 flex-col items-center rounded-[2.4rem] border border-[rgba(255,132,146,0.2)] bg-[rgba(255,255,255,0.96)] px-[2rem] py-[1.6rem] shadow-[0_18px_48px_rgba(255,183,191,0.2)]"
                        style={{ left: "47%" }}
                    >
                        <span className="text-[2.2rem] font-extrabold leading-none text-[#f58b93]">+100.6%</span>
                        <span className="mt-[0.8rem] text-[1.4rem] font-bold text-[#6b7280]">전년 대비</span>
                        <span className="absolute left-1/2 top-[100%] h-[4.8rem] -translate-x-1/2 border-l border-dashed border-[rgba(255,107,117,0.32)]" />
                    </div>

                    <div
                        className="absolute top-[44%] -translate-x-1/2 text-center"
                        style={{ left: "48.5%" }}
                    >
                        <span className="text-[1.8rem] font-bold text-[#6b7280]">약 </span>
                        <span className="text-[5.2rem] font-extrabold leading-none text-[#f27b84]">93.2</span>
                        <span className="text-[1.8rem] font-bold text-[#6b7280]">억</span>
                    </div>

                    <div
                        className="absolute top-[8%] -translate-x-1/2 text-center"
                        style={{ left: "87%" }}
                    >
                        <span className="text-[1.8rem] font-bold text-[#6b7280]">약 </span>
                        <span className="text-[5.8rem] font-extrabold leading-none text-[#f27b84]">187</span>
                        <span className="text-[1.8rem] font-bold text-[#6b7280]">억</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
