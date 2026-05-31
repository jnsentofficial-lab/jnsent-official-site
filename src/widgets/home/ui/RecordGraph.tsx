"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bar, CartesianGrid, ComposedChart, LabelList, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Text } from "@/shared/ui/kit/Text";

const datas = [
    { name: "2023", amount: 29.8, growth: 213.1 },
    { name: "2024", amount: 93.2, growth: 100.6 },
    { name: "2025", amount: 187, growth: null },
];

const records = [
    { value: 2500000, label: "개인방송 단일 최고" },
    { value: 6230000, label: "주간 BJ 최고 기록" },
    { value: 8007828, label: "크루방송 단일 회차 최고" },
];

function GrowthLabel({ x = 0, y = 0, value }: { x?: number; y?: number; value?: number | null }) {
    if (value == null) {
        return null;
    }

    return (
        <g transform={`translate(${x - 52}, ${y - 96})`}>
            <line
                x1="52"
                y1="84"
                x2="52"
                y2="136"
                stroke="#ffb3bc"
                strokeDasharray="4 4"
                opacity="0.8"
            />
            <rect
                width="104"
                height="60"
                rx="18"
                fill="rgba(255,255,255,0.96)"
                stroke="rgba(255, 132, 146, 0.18)"
            />
            <text
                x="52"
                y="24"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#ff5b68"
            >
                {`+${value}%`}
            </text>
            <text
                x="52"
                y="42"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#4b5563"
            >
                전년 대비
            </text>
        </g>
    );
}

function AmountLabel({ x = 0, y = 0, value }: { x?: number; y?: number; value?: number }) {
    if (value == null) {
        return null;
    }

    return (
        <text
            x={x}
            y={y - 18}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="#111111"
        >
            <tspan>약 </tspan>
            <tspan
                fill="#ff5b68"
                fontSize="18"
            >
                {value}
            </tspan>
            <tspan>억</tspan>
        </text>
    );
}

function CurveDot(props: { cx?: number; cy?: number; index?: number }) {
    const { cx = 0, cy = 0, index = 0 } = props;

    return (
        <g>
            {index === datas.length - 1 ? (
                <path
                    d={`M ${cx + 8} ${cy - 3} Q ${cx + 22} ${cy - 22} ${cx + 34} ${cy - 38}`}
                    fill="none"
                    stroke="#ff5b68"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            ) : null}
            {index === datas.length - 1 ? (
                <path
                    d={`M ${cx + 30} ${cy - 42} L ${cx + 40} ${cy - 40} L ${cx + 35} ${cy - 30} Z`}
                    fill="#ff5b68"
                />
            ) : null}
            <circle
                cx={cx}
                cy={cy}
                r="7"
                fill="rgba(255,91,104,0.12)"
            />
            <circle
                cx={cx}
                cy={cy}
                r="4"
                fill="#ff5b68"
            />
        </g>
    );
}

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
                // className="pointer-events-none absolute left-[50%] inset-0 z-0 flex items-center justify-center overflow-x-hidden"
                // className="pointer-events-none absolute left-[25%] inset-0 z-0 flex items-center justify-center overflow-x-hidden"
                className="pointer-events-none absolute mobile:left-0 pc:left-[25%] inset-0 z-0 flex items-center justify-center overflow-x-hidden"
                data-report-id="플랫폼 기록 그래프"
                data-report-type="item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.25, once: false }}
                transition={{ duration: 0.9 }}
                // style={{
                //     maskImage: "linear-gradient(90deg, transparent 0%, transparent 18%, black 55%, black 100%)",
                //     WebkitMaskImage: "linear-gradient(90deg, transparent 0%, transparent 18%, black 55%, black 100%)",
                // }}
            >
                <ResponsiveContainer>
                    <ComposedChart
                        data={datas}
                        // margin={{ top: 72, right: 50, bottom: 18, left: 24 }}
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke="rgba(148, 163, 184, 0.25)"
                            strokeDasharray="4 6"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#374151", fontSize: 13, fontWeight: 500 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickMargin={12}
                            domain={[0, 200]}
                            ticks={[0, 50, 100, 150, 200]}
                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: "1.6rem",
                                background: "rgba(255,255,255,0.98)",
                                boxShadow: "0 16px 50px rgba(255, 91, 104, 0.18)",
                                border: "none",
                            }}
                            itemStyle={{
                                color: "#ff5b68",
                            }}
                            wrapperStyle={{
                                borderRadius: "1rem",
                            }}
                            formatter={(value) => [`${value ?? 0}억`, "매출"]}
                            labelFormatter={(label) => `${label}년`}
                        />
                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#ff5b68"
                            strokeWidth={2}
                            dot={<CurveDot />}
                            activeDot={false}
                        />
                        <Bar
                            dataKey="amount"
                            barSize={56}
                            fill="#111111"
                            radius={[12, 12, 0, 0]}
                            activeBar={{
                                fill: "#111111",
                            }}
                        >
                            <LabelList
                                dataKey="amount"
                                position="top"
                                content={<AmountLabel />}
                            />
                            <LabelList
                                dataKey="growth"
                                content={<GrowthLabel />}
                            />
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </motion.div>
        </section>
    );
}
