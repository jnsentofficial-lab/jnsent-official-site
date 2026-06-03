"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Text } from "@/shared/ui/kit/Text";

const ACCENT_COLOR = "#ff6b75";
const GRAPH_BASELINE = 88;

const graphBars = [
    { name: "2023", amount: 29.8, left: "10%", width: "10rem", height: 18, center: 14 },
    { name: "2024", amount: 93.2, left: "41%", width: "13rem", height: 50, center: 48 },
    { name: "2025", amount: 187, left: "81%", width: "15rem", height: 82, center: 86 },
];

const records = [
    { value: 2500000, label: "개인방송 단일 최고" },
    { value: 6230000, label: "주간 BJ 최고 기록" },
    { value: 8007828, label: "크루방송 단일 회차 최고" },
];

export function RecordGraph() {
    return (
        <>
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

                <GraphVer3 />
                {/* <GraphVer2 /> */}
            </section>
        </>
    );
}

const GraphVer2 = () => {
    const graphLinePath = graphBars.reduce((path, bar, index) => {
        const top = GRAPH_BASELINE - bar.height;

        if (index === 0) {
            return `M ${bar.center} ${top}`;
        }

        const previousBar = graphBars[index - 1];
        const previousTop = GRAPH_BASELINE - previousBar.height;
        const controlX = (previousBar.center + bar.center) / 2;
        const controlY = Math.min(previousTop, top) - (index === graphBars.length - 1 ? 14 : 8);

        return `${path} Q ${controlX} ${controlY} ${bar.center} ${top}`;
    }, "");

    return (
        <motion.div
            className="pointer-events-none absolute inset-x-0 z-0 flex items-center justify-center overflow-x-hidden mobile:bottom-0 mobile:left-0 mobile:h-1/2 mobile:opacity-50 pc:left-[25%] pc:inset-y-0 pc:h-[90dvh] pc:opacity-100"
            data-report-id="플랫폼 기록 그래프 v2"
            data-report-type="item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.2, once: false }}
            transition={{ duration: 0.9 }}
            style={{
                maskImage: "linear-gradient(90deg, transparent 0%, transparent 10%, black 18%, black 100%)",
                WebkitMaskImage: "linear-gradient(90deg, transparent 0%, transparent 18%, black 60%, black 100%)",
            }}
        >
            <div className="relative h-full w-full">
                <div className="absolute inset-x-0 top-[14%] border-t border-dashed border-[rgba(255,189,197,0.26)]" />
                <div className="absolute inset-x-0 top-[38%] border-t border-dashed border-[rgba(255,189,197,0.18)]" />
                <div className="absolute inset-x-0 top-[62%] border-t border-dashed border-[rgba(255,189,197,0.14)]" />
                <div className="absolute inset-x-0 bottom-[12%] border-t border-dashed border-[rgba(255,189,197,0.12)]" />

                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full overflow-visible"
                >
                    <defs>
                        <linearGradient
                            id="graphVer2Line"
                            x1="12%"
                            y1="82%"
                            x2="92%"
                            y2="8%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#ffe7ea"
                                stopOpacity="0.2"
                            />
                            <stop
                                offset="42%"
                                stopColor="#ffb2bb"
                                stopOpacity="0.62"
                            />
                            <stop
                                offset="100%"
                                stopColor={ACCENT_COLOR}
                                stopOpacity="1"
                            />
                        </linearGradient>
                    </defs>

                    <path
                        d={graphLinePath}
                        fill="none"
                        stroke="url(#graphVer2Line)"
                        strokeWidth="0.48"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 87.2 6.8 L 92.8 11.5 L 87.2 16.2"
                        fill="none"
                        stroke={ACCENT_COLOR}
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {graphBars.map((bar) => {
                        const top = GRAPH_BASELINE - bar.height;

                        return (
                            <g key={bar.name}>
                                <circle
                                    cx={bar.center}
                                    cy={top}
                                    r="1.1"
                                    fill="rgba(255,107,117,0.18)"
                                />
                                <circle
                                    cx={bar.center}
                                    cy={top}
                                    r="0.5"
                                    fill={ACCENT_COLOR}
                                />
                            </g>
                        );
                    })}
                </svg>

                {graphBars.map((bar, index) => (
                    <div
                        key={bar.name}
                        className="absolute bottom-[12%]"
                        style={{ left: bar.left, width: bar.width, height: `${bar.height}%` }}
                    >
                        <div
                            className="relative h-full w-full overflow-hidden rounded-t-[3.6rem] bg-[#050505] shadow-[inset_18px_0_32px_rgba(255,255,255,0.1),0_24px_48px_rgba(0,0,0,0.14)]"
                            style={{ opacity: index === 0 ? 0.26 : 1 }}
                        >
                            <div className="absolute inset-y-0 left-0 w-[26%] bg-[linear-gradient(90deg,rgba(255,255,255,0.22),rgba(255,255,255,0))]" />
                            <div className="absolute inset-x-[14%] top-0 h-[1px] bg-[rgba(255,255,255,0.16)]" />
                        </div>

                        <div className="absolute bottom-[calc(100%+2.4rem)] left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                            <div className="leading-none">
                                <span className="text-[1.8rem] font-semibold text-[#7a7f89]">약 </span>
                                <span className="text-[clamp(3.6rem,2vw,6rem)] font-black tracking-[-0.04em] text-[#f0717d]">{bar.amount}</span>
                                <span className="text-[1.8rem] font-semibold text-[#7a7f89]">억</span>
                            </div>

                            {index > 0 ? (
                                <div className="mx-auto mt-[1.6rem] flex w-fit flex-col items-center rounded-[2.2rem] border border-[rgba(255,167,177,0.25)] bg-[rgba(255,255,255,0.92)] px-[1.8rem] py-[1.4rem] shadow-[0_20px_40px_rgba(255,182,193,0.18)]">
                                    <span className="text-[2rem] font-black leading-none text-[#f38a93]">
                                        +{(((bar.amount - graphBars[index - 1].amount) / graphBars[index - 1].amount) * 100).toFixed(1)}%
                                    </span>
                                    <span className="mt-[0.6rem] text-[1.3rem] font-bold text-[#7a7f89]">전년 대비</span>
                                </div>
                            ) : null}
                        </div>

                        <div className="absolute left-1/2 top-[calc(100%+1.6rem)] -translate-x-1/2 text-[1.8rem] font-semibold tracking-[0.08em] text-[#69707b]">{bar.name}</div>
                    </div>
                ))}

                <div className="absolute right-[8%] bottom-[10%] flex flex-col gap-[1rem]">
                    {records.map((record) => (
                        <div
                            key={record.label}
                            className="rounded-full border border-[rgba(255,214,219,0.8)] bg-[rgba(255,255,255,0.9)] px-[1.4rem] py-[0.9rem] text-[1.3rem] font-bold text-[#6f7680] shadow-[0_12px_24px_rgba(255,192,199,0.12)]"
                        >
                            {record.label}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const GraphVer3 = () => {
    const reportChartHeight = 600;
    const reportChartWidth = 920;
    const chartLeftPadding = 86;
    const chartRightPadding = 48;
    const chartTopPadding = 90;
    const chartBottomPadding = 84;
    const innerWidth = reportChartWidth - chartLeftPadding - chartRightPadding;
    const innerHeight = reportChartHeight - chartTopPadding - chartBottomPadding;
    const maxAmount = 200;
    const stepX = innerWidth / Math.max(graphBars.length - 1, 1);
    const linePoints = graphBars.map((bar, index) => {
        const x = chartLeftPadding + stepX * index;
        const y = chartTopPadding + innerHeight - (bar.amount / maxAmount) * innerHeight;

        return {
            ...bar,
            x,
            y,
            formattedAmount: bar.amount.toLocaleString("ko-KR"),
        };
    });
    const linePath = linePoints.reduce((path, point, index) => {
        if (index === 0) {
            return `M ${point.x} ${point.y}`;
        }

        const previousPoint = linePoints[index - 1];
        const rise = point.y - previousPoint.y;
        const controlX1 = previousPoint.x + stepX * 0.42;
        const controlY1 = previousPoint.y + rise * 0.1;
        const controlX2 = point.x - stepX * 0.16;
        const controlY2 = point.y - rise * 0.78;

        return `${path} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${point.x} ${point.y}`;
    }, "");
    const gridValues = [0, 40, 80, 120, 160, 200];
    const growthBadges = linePoints.slice(1).map((point, index) => {
        const previousPoint = linePoints[index];
        const growth = ((point.amount - previousPoint.amount) / previousPoint.amount) * 100;

        return {
            year: point.name,
            value: `+${growth.toFixed(1)}%`,
            left: `${(point.x / reportChartWidth) * 100}%`,
            top: `${((point.y - 88) / reportChartHeight) * 100}%`,
        };
    });
    const graphEase = [0.22, 1, 0.36, 1] as const;
    const hoverEase = [0.44, 0.05, 0.55, 0.95] as const;

    return (
        <motion.div
            // className="mx-auto max-w-[120rem] rounded-[4rem] bg-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: false }}
            transition={{ duration: 0.7, ease: graphEase }}
            style={{
                maskImage: "linear-gradient(90deg, transparent 0%, transparent 10%, black 18%, black 100%)",
                WebkitMaskImage: "linear-gradient(90deg, transparent 0%, transparent 18%, black 60%, black 100%)",
            }}
        >
            {/* <div className="relative mt-[5.6rem] overflow-hidden rounded-[3.2rem] border border-[#e9ecef] bg-[#fcfcfb] px-[2.4rem] pb-[2.4rem] pt-[3.2rem]"> */}
            <div className="relative mt-[5.6rem] overflow-hidden rounded-[3.2rem] px-[2.4rem] pb-[2.4rem] pt-[3.2rem]">
                <div className="mb-[1.6rem] text-[2rem] font-semibold text-[#5f666d]">(단위: 억 원)</div>

                <svg
                    viewBox={`0 0 ${reportChartWidth} ${reportChartHeight}`}
                    className="w-full"
                >
                    {gridValues.map((value) => {
                        const y = chartTopPadding + innerHeight - (value / maxAmount) * innerHeight;

                        return (
                            <g key={value}>
                                <line
                                    x1={chartLeftPadding}
                                    y1={y}
                                    x2={reportChartWidth - chartRightPadding}
                                    y2={y}
                                    stroke="#dde2e5"
                                    strokeWidth="1"
                                />
                                <text
                                    x={18}
                                    y={y + 7}
                                    fontSize="22"
                                    fontWeight="500"
                                    fill="#6d747b"
                                >
                                    {value.toLocaleString("ko-KR")}
                                </text>
                            </g>
                        );
                    })}

                    {/* <line
                        x1={chartLeftPadding}
                        y1={reportChartHeight - chartBottomPadding}
                        x2={reportChartWidth - chartRightPadding}
                        y2={reportChartHeight - chartBottomPadding}
                        stroke="#101418"
                        strokeWidth="3"
                        className="z-[100]"
                    /> */}

                    {linePoints.map((point) => (
                        <g key={point.name}>
                            <motion.line
                                x1={point.x}
                                y1={reportChartHeight - chartBottomPadding}
                                x2={point.x}
                                y2={point.y}
                                stroke="#000000"
                                // stroke="#8ad6d0"
                                strokeDasharray="5 6"
                                strokeWidth="50"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ amount: 0.25, once: false }}
                                transition={{ duration: 0.8, delay: 0.16 * linePoints.indexOf(point), ease: graphEase }}
                            />
                            <motion.text
                                x={point.x}
                                y={point.y - 18}
                                textAnchor="middle"
                                fontSize="24"
                                fontWeight="700"
                                fill="#000000"
                                // fill="#57bcb5"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ amount: 0.25, once: false }}
                                transition={{ duration: 0.55, delay: 0.2 * linePoints.indexOf(point) + 0.15, ease: graphEase }}
                            >
                                약 {point.formattedAmount}억
                            </motion.text>
                            <text
                                x={point.x}
                                y={reportChartHeight - 30}
                                textAnchor="middle"
                                fontSize="22"
                                fontWeight="500"
                                fill="#666d74"
                            >
                                {point.name}
                            </text>
                        </g>
                    ))}

                    <motion.path
                        d={linePath}
                        fill="none"
                        stroke="#4bc3bb"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0.4 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ amount: 0.25, once: false }}
                        transition={{ duration: 1.8, ease: graphEase }}
                    />

                    {linePoints.map((point, index) => (
                        <motion.g
                            key={`${point.name}-dot`}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ amount: 0.25, once: false }}
                            transition={{ duration: 0.45, delay: 0.24 * index + 0.25, ease: graphEase }}
                            style={{ transformOrigin: `${point.x}px ${point.y}px` }}
                        >
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r="12"
                                fill="rgba(75,195,187,0.22)"
                            />
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r="7"
                                fill="#4bc3bb"
                            />
                        </motion.g>
                    ))}
                </svg>

                {growthBadges.map((badge, index) => (
                    <motion.div
                        key={badge.year}
                        className="absolute -translate-x-1/2 rounded-[2rem] bg-[var(--adaptive-red50)] px-[1.6rem] py-[1.2rem] text-center"
                        style={{ left: badge.left, top: badge.top }}
                        initial={{ opacity: 0, y: 24, scale: 0.94 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ amount: 0.25, once: false }}
                        transition={{ duration: 0.55, delay: 0.3 * index + 0.35, ease: graphEase }}
                    >
                        <div className="text-[1.9rem] font-black leading-none text-[var(--adaptive-red500)]">{badge.value}</div>
                        <div className="mt-[0.6rem] text-[1.2rem] font-bold text-[var(--adaptive-red300)]">전년 대비</div>
                    </motion.div>
                ))}

                <motion.div
                    className="absolute right-[2.5%] top-[7.5%] rounded-[2.6rem] bg-[#48c3bc] px-[2.4rem] py-[2rem] text-center text-white shadow-[0_24px_40px_rgba(72,195,188,0.2)]"
                    initial={{ opacity: 0, scale: 0.2 }}
                    exit={{ opacity: 0, scale: 0.2 }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                        // rotate: 0,
                        y: [-10, 10, -10],
                    }}
                    viewport={{ amount: 0.25, once: false }}
                    transition={{
                        opacity: { duration: 0.45, delay: 1.05, ease: graphEase },
                        scale: { duration: 0.45, delay: 1.05, ease: graphEase },
                        rotate: { duration: 0.45, delay: 1.05, ease: graphEase },
                        y: { duration: 2.8, ease: hoverEase, repeat: Infinity, repeatType: "loop", delay: 1.2 },
                    }}
                >
                    <div className="text-[2.8rem] font-black flex items-center">
                        <Text.Rolling
                            value={187}
                            rollingCount={5}
                            textSize={30}
                        />
                        <p>억</p>
                    </div>

                    {/* <div className="text-[2.8rem] font-black leading-[1.1]">{linePoints.at(-1)?.formattedAmount}억</div> */}

                    <div className="mt-[0.6rem] text-[2.4rem] font-black leading-[1.1]">돌파!!</div>
                    <div className="absolute bottom-[-1.6rem] left-1/2 h-0 w-0 -translate-x-1/2 border-l-[1.6rem] border-r-[1.6rem] border-t-[2.2rem] border-l-transparent border-r-transparent border-t-[#48c3bc]" />
                </motion.div>
            </div>
        </motion.div>
    );
};
