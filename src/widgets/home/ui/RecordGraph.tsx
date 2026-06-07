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
                className="relative h-svh min-h-0 overflow-x-clip flex flex-col"
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
                                    <span className="block mobile:hidden">
                                        <Text.Rolling
                                            value={record.value}
                                            textSize={28}
                                            rollingCount={5}
                                        />
                                    </span>
                                    <span className="hidden mobile:block">
                                        <Text.Rolling
                                            value={record.value}
                                            textSize={20}
                                            rollingCount={5}
                                        />
                                    </span>
                                    <span className="mt-2 block mobile:text-[1.4rem] pc:text-[1.8rem] text-base font-bold text-neutral-500">{record.label}</span>
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

const GraphVer3 = () => {
    const graphEase = [0.22, 1, 0.36, 1] as const;
    const hoverEase = [0.44, 0.05, 0.55, 0.95] as const;
    const chartConfigs = {
        desktop: {
            reportChartWidth: 1260,
            reportChartHeight: 900,
            panelX: 0,
            panelY: 116,
            panelWidth: 1260,
            panelHeight: 700,
            chartLeftPadding: 78,
            chartRightPadding: 2,
            chartTopPadding: 128,
            chartBottomPadding: 92,
            pointInsetStart: 68,
            pointInsetEnd: 74,
            pointRatios: [0.08, 0.52, 0.9] as const,
            dotOuter: 14,
            dotInner: 7,
            lineWidth: 3.2,
            startOffset: 112,
            firstCardWidth: 146,
            detailCardWidth: 184,
            cardHeight: 120,
            cardRadius: 22,
            amountValueFontSize: 28,
            amountPrefixFontSize: 16,
            growthValueFontSize: 22,
            growthCaptionFontSize: 18,
            guideBottomOffset: 40,
            plotOffsetY: 0,
            entryLift: 12,
            cardOffsetY: 42,
            cardLastExtraOffsetY: 26,
            firstCardOffsetXFactor: 0.8,
            lastCardOffsetXFactor: 0.72,
        },
        mobile: {
            reportChartWidth: 390,
            reportChartHeight: 540,
            panelX: 0,
            panelY: 120,
            panelWidth: 390,
            panelHeight: 332,
            chartLeftPadding: 14,
            chartRightPadding: 4,
            chartTopPadding: 98,
            chartBottomPadding: 36,
            pointInsetStart: 22,
            pointInsetEnd: 26,
            pointRatios: [0.08, 0.52, 0.9] as const,
            dotOuter: 12,
            dotInner: 6,
            lineWidth: 2.35,
            startOffset: 34,
            firstCardWidth: 88,
            detailCardWidth: 104,
            cardHeight: 72,
            cardRadius: 14,
            amountValueFontSize: 17,
            amountPrefixFontSize: 11,
            growthValueFontSize: 14,
            growthCaptionFontSize: 12,
            guideBottomOffset: 18,
            plotOffsetY: 0,
            entryLift: 8,
            cardOffsetY: 18,
            cardLastExtraOffsetY: 8,
            firstCardOffsetXFactor: 0.78,
            lastCardOffsetXFactor: 0.72,
        },
    } as const;

    const renderChart = (mode: keyof typeof chartConfigs) => {
        const config = chartConfigs[mode];
        const pointStartX = config.panelX + config.pointInsetStart;
        const pointEndX = config.panelX + config.panelWidth - config.pointInsetEnd;
        const innerWidth = pointEndX - pointStartX;
        const innerHeight = config.panelHeight - config.chartTopPadding - config.chartBottomPadding;
        const maxAmount = 200;
        const stepX = innerWidth / Math.max(graphBars.length - 1, 1);
        const chartBottom = config.panelY + config.panelHeight - config.chartBottomPadding;
        const chartTop = config.panelY + config.chartTopPadding;
        const linePoints = graphBars.map((bar, index) => {
            const pointRatio = config.pointRatios[index] ?? index / Math.max(graphBars.length - 1, 1);
            const x = pointStartX + innerWidth * pointRatio;
            const normalizedY = chartBottom - (bar.amount / maxAmount) * innerHeight + config.plotOffsetY;
            const y = Math.max(chartTop, normalizedY);
            const prevAmount = graphBars[index - 1]?.amount;
            const growthValue = prevAmount ? `+${(((bar.amount - prevAmount) / prevAmount) * 100).toFixed(1)}%` : undefined;

            return {
                ...bar,
                x,
                y,
                formattedAmount: bar.amount.toLocaleString("ko-KR"),
                growthValue,
            };
        });
        const lineStartX = linePoints[0].x - config.startOffset;
        const lineStartY = linePoints[0].y + config.entryLift;
        const linePath = linePoints.reduce((path, point, index) => {
            if (index === 0) {
                const entryControlX = lineStartX + config.startOffset * 0.48;
                const entryControlY = lineStartY - config.entryLift;

                return `M ${lineStartX} ${lineStartY} C ${entryControlX} ${entryControlY}, ${point.x - config.startOffset * 0.18} ${point.y}, ${point.x} ${point.y}`;
            }

            const previousPoint = linePoints[index - 1];
            const segmentWidth = point.x - previousPoint.x;
            const deltaY = point.y - previousPoint.y;
            const controlX1 = previousPoint.x + segmentWidth * (mode === "mobile" ? 0.42 : 0.44);
            const controlY1 = previousPoint.y + deltaY * 0.22;
            const controlX2 = point.x - segmentWidth * (mode === "mobile" ? 0.34 : 0.32);
            const controlY2 = point.y - deltaY * (mode === "mobile" ? 0.22 : 0.2);

            return `${path} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${point.x} ${point.y}`;
        }, "");
        const areaPath = `${linePath} L ${linePoints[linePoints.length - 1].x} ${chartBottom} L ${lineStartX} ${chartBottom} Z`;
        const cardData = linePoints.map((point, index) => {
            const cardWidth = index === 0 ? config.firstCardWidth : config.detailCardWidth;
            const cardHeight = config.cardHeight;
            const baseCardY = point.y - cardHeight - config.cardOffsetY;
            const cardY = index === 2 ? Math.max(12, baseCardY - config.cardLastExtraOffsetY) : baseCardY;
            const cardX = index === 0 ? point.x - cardWidth * config.firstCardOffsetXFactor : index === 2 ? point.x - cardWidth * config.lastCardOffsetXFactor : point.x - cardWidth / 2;

            return {
                point,
                cardWidth,
                cardHeight,
                cardX,
                cardY,
                pointerX: index === 0 ? point.x - 10 : point.x,
            };
        });

        return (
            <svg
                viewBox={`0 0 ${config.reportChartWidth} ${config.reportChartHeight}`}
                className="h-full w-full mx-auto"
                // className="h-full w-[05] pc:ml-[21.2rem] mx-auto"
                // className="h-full w-full"
            >
                <defs>
                    <linearGradient
                        id={`graph-line-${mode}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#ff5d72"
                            stopOpacity="0.78"
                        />
                        <stop
                            offset="55%"
                            stopColor="#ff4a66"
                            stopOpacity="0.92"
                        />
                        <stop
                            offset="100%"
                            stopColor="#ff7d8c"
                            stopOpacity="0.8"
                        />
                    </linearGradient>
                    <linearGradient
                        id={`graph-area-${mode}`}
                        x1="0%"
                        y1="8%"
                        x2="0%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#ff8d99"
                            stopOpacity="0.22"
                        />
                        <stop
                            offset="38%"
                            stopColor="#ff9ca4"
                            stopOpacity="0.54"
                        />
                        <stop
                            offset="100%"
                            stopColor="#fff4f5"
                            stopOpacity="0.02"
                        />
                    </linearGradient>
                    <radialGradient
                        id={`graph-area-glow-${mode}`}
                        cx="72%"
                        cy="40%"
                        r="74%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#ff8f9b"
                            stopOpacity="1"
                        />
                        <stop
                            offset="45%"
                            stopColor="#ff8f9b"
                            stopOpacity="0.52"
                        />
                        <stop
                            offset="100%"
                            stopColor="#ffffff"
                            stopOpacity="0"
                        />
                    </radialGradient>
                    <linearGradient
                        id={`graph-area-fade-${mode}`}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#ffffff"
                            stopOpacity="0"
                        />
                        <stop
                            offset="70%"
                            stopColor="#ffffff"
                            stopOpacity="0.56"
                        />
                        <stop
                            offset="100%"
                            stopColor="#ffffff"
                            stopOpacity="0.96"
                        />
                    </linearGradient>
                    <filter
                        id={`card-shadow-${mode}`}
                        x="-40%"
                        y="-40%"
                        width="180%"
                        height="220%"
                    >
                        <feDropShadow
                            dx="0"
                            dy={mode === "mobile" ? "8" : "14"}
                            stdDeviation={mode === "mobile" ? "10" : "14"}
                            floodColor="#111827"
                            floodOpacity="0.12"
                        />
                    </filter>
                    <filter
                        id={`glow-${mode}`}
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                    >
                        <feGaussianBlur stdDeviation={mode === "mobile" ? "16" : "22"} />
                    </filter>
                </defs>

                <motion.path
                    d={areaPath}
                    fill={`url(#graph-area-${mode})`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.82 }}
                    viewport={{ amount: 0.25, once: false }}
                    transition={{ duration: 0.8, delay: 0.2, ease: graphEase }}
                />

                <motion.path
                    d={areaPath}
                    fill={`url(#graph-area-glow-${mode})`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.9 }}
                    viewport={{ amount: 0.25, once: false }}
                    transition={{ duration: 0.95, delay: 0.24, ease: graphEase }}
                />

                <motion.path
                    d={areaPath}
                    fill={`url(#graph-area-fade-${mode})`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.9 }}
                    viewport={{ amount: 0.25, once: false }}
                    transition={{ duration: 1, delay: 0.25, ease: graphEase }}
                />

                <motion.path
                    d={linePath}
                    fill="none"
                    stroke={`url(#graph-line-${mode})`}
                    strokeWidth={config.lineWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0.4 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ amount: 0.25, once: false }}
                    transition={{ duration: 1.8, ease: graphEase }}
                />

                {linePoints.map((point, index) =>
                    index === 0 ? null : (
                        <motion.line
                            key={`${mode}-${point.name}-guide`}
                            x1={point.x}
                            y1={point.y + config.dotOuter}
                            x2={point.x}
                            y2={config.panelY + config.panelHeight - config.guideBottomOffset}
                            stroke="rgba(100,116,139,0.36)"
                            strokeWidth="1.5"
                            strokeDasharray={mode === "mobile" ? "4 4" : "5 5"}
                            initial={{ opacity: 0, pathLength: 0 }}
                            whileInView={{ opacity: 1, pathLength: 1 }}
                            viewport={{ amount: 0.25, once: false }}
                            transition={{ duration: 0.7, delay: 0.22 * index + 0.4, ease: graphEase }}
                        />
                    ),
                )}

                {linePoints.map((point, index) => (
                    <motion.g
                        key={`${mode}-${point.name}-dot`}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ amount: 0.25, once: false }}
                        transition={{ duration: 0.45, delay: 0.24 * index + 0.25, ease: graphEase }}
                        style={{ transformOrigin: `${point.x}px ${point.y}px` }}
                    >
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={config.dotOuter + (mode === "mobile" ? 4 : 5)}
                            fill="var(--adaptive-red500)"
                            opacity="0.14"
                            filter={`url(#glow-${mode})`}
                        />
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={config.dotOuter}
                            fill="#ffffff"
                            stroke="rgba(255,107,117,0.32)"
                            strokeWidth={mode === "mobile" ? 4 : 5}
                        />
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={config.dotInner}
                            fill="var(--adaptive-red500)"
                        />
                    </motion.g>
                ))}

                {cardData.map(({ point, cardWidth, cardHeight, cardX, cardY, pointerX }, index) => (
                    <motion.g
                        key={`${mode}-${point.name}-card`}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.25, once: false }}
                        transition={{ duration: 0.55, delay: 0.22 * index + 0.2, ease: graphEase }}
                    >
                        <rect
                            x={cardX}
                            y={cardY}
                            width={cardWidth}
                            height={cardHeight}
                            rx={config.cardRadius}
                            fill="rgba(255,255,255,0.96)"
                            filter={`url(#card-shadow-${mode})`}
                        />
                        <path
                            d={`M ${pointerX - 10} ${cardY + cardHeight - 2} L ${pointerX} ${cardY + cardHeight + 10} L ${pointerX + 10} ${cardY + cardHeight - 2} Z`}
                            fill="rgba(255,255,255,0.96)"
                        />

                        {index === 0 ? (
                            <text
                                x={cardX + cardWidth / 2}
                                y={cardY + cardHeight / 2 + (mode === "mobile" ? 4 : 6)}
                                textAnchor="middle"
                                fill="#111111"
                            >
                                <tspan
                                    fontSize={config.amountPrefixFontSize}
                                    fontWeight="700"
                                >
                                    약&nbsp;
                                </tspan>
                                <tspan
                                    fontSize={config.amountValueFontSize}
                                    fontWeight="900"
                                    fill="var(--adaptive-red500)"
                                >
                                    {point.formattedAmount}
                                </tspan>
                                <tspan
                                    fontSize={config.amountValueFontSize}
                                    fontWeight="900"
                                >
                                    억
                                </tspan>
                            </text>
                        ) : (
                            <>
                                <text
                                    x={cardX + cardWidth / 2}
                                    y={cardY + (mode === "mobile" ? 21 : 28)}
                                    textAnchor="middle"
                                    fontSize={config.growthCaptionFontSize}
                                    fontWeight="800"
                                    fill="var(--adaptive-grey500)"
                                >
                                    전년대비
                                </text>
                                <text
                                    x={cardX + cardWidth / 2}
                                    y={cardY + (mode === "mobile" ? 43 : 58)}
                                    textAnchor="middle"
                                    fontSize={config.growthValueFontSize}
                                    fontWeight="900"
                                    fill="var(--adaptive-red500)"
                                >
                                    {point.growthValue}
                                </text>
                                <text
                                    x={cardX + cardWidth / 2}
                                    y={cardY + (mode === "mobile" ? 67 : 86)}
                                    textAnchor="middle"
                                    fill="#111111"
                                >
                                    <tspan
                                        fontSize={config.amountPrefixFontSize}
                                        fontWeight="700"
                                    >
                                        약&nbsp;
                                    </tspan>
                                    <tspan
                                        fontSize={config.amountValueFontSize}
                                        fontWeight="900"
                                    >
                                        {point.formattedAmount}
                                    </tspan>
                                    <tspan
                                        fontSize={config.amountValueFontSize}
                                        fontWeight="900"
                                    >
                                        억
                                    </tspan>
                                </text>
                            </>
                        )}
                    </motion.g>
                ))}
            </svg>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: false }}
            transition={{ duration: 0.7, ease: graphEase }}
            className="mt-auto flex w-full"
        >
            <div className="relative mt-[3.2rem] h-[46rem] w-full px-[0.8rem] pb-[0.8rem] pt-[0.8rem] mobile:h-[52rem] mobile:px-[0.4rem] md:mt-[4rem] md:ml-auto md:h-[96dvh] md:min-h-[84rem] md:w-[70%] md:px-[0.8rem] md:pb-[1.6rem] md:pt-[1.6rem]">
                <div className="h-full md:hidden">{renderChart("mobile")}</div>
                <div className="hidden h-full md:block">{renderChart("desktop")}</div>

                {false ? (
                    <motion.div
                        className="absolute right-[4%] top-[5%] rounded-[1.8rem] bg-[#48c3bc] px-[1.4rem] py-[1.2rem] text-center text-white shadow-[0_24px_40px_rgba(72,195,188,0.2)] md:right-[0.8rem] md:top-[-2.2rem] md:rounded-[2.6rem] md:px-[2.4rem] md:py-[2rem]"
                        initial={{ opacity: 0, scale: 0.2 }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            y: [-10, 10, -10],
                        }}
                        viewport={{ amount: 0.25, once: false }}
                        transition={{
                            opacity: { duration: 0.35, delay: 0.5, ease: graphEase },
                            scale: { duration: 0.45, delay: 0.5, ease: graphEase },
                            y: { duration: 2.8, ease: hoverEase, repeat: Infinity, repeatType: "loop", repeatDelay: 0.1 },
                        }}
                    >
                        <div className="flex items-center text-[1.8rem] font-black md:text-[2.8rem]">
                            <span className="block mobile:hidden">
                                <Text.Rolling
                                    value={187}
                                    rollingCount={5}
                                    textSize={38}
                                />
                            </span>

                            <span className="hidden mobile:block">
                                <Text.Rolling
                                    value={187}
                                    rollingCount={5}
                                    textSize={30}
                                />
                            </span>

                            <p>억</p>
                        </div>

                        <div className="mt-[0.4rem] text-[1.6rem] font-black leading-[1.1] md:mt-[0.6rem] md:text-[2.4rem]">돌파!!</div>
                        <div className="absolute bottom-[-1rem] left-1/2 h-0 w-0 -translate-x-1/2 border-l-[1rem] border-r-[1rem] border-t-[1.4rem] border-l-transparent border-r-transparent border-t-[#48c3bc] md:bottom-[-1.6rem] md:border-l-[1.6rem] md:border-r-[1.6rem] md:border-t-[2.2rem]" />
                    </motion.div>
                ) : null}
            </div>
        </motion.div>
    );
};

// 건드리지마세요
const GraphVerBackup = () => {
    const graphEase = [0.22, 1, 0.36, 1] as const;
    const hoverEase = [0.44, 0.05, 0.55, 0.95] as const;
    const chartConfigs = {
        desktop: {
            reportChartWidth: 920,
            reportChartHeight: 600,
            chartLeftPadding: 86,
            chartRightPadding: 48,
            chartTopPadding: 90,
            chartBottomPadding: 84,
            barWidth: 90,
            amountY: 18,
            growthLabelY: 64,
            growthValueFontSize: 20,
            growthCaptionFontSize: 17,
            amountPrefixFontSize: 14,
            amountValueFontSize: 24,
            yearFontSize: 22,
            dotOuter: 12,
            dotInner: 7,
        },
        mobile: {
            reportChartWidth: 412,
            reportChartHeight: 420,
            chartLeftPadding: 28,
            chartRightPadding: 20,
            chartTopPadding: 76,
            chartBottomPadding: 32,
            barWidth: 80,
            amountY: 22,
            growthLabelY: 62,
            growthValueFontSize: 19,
            growthCaptionFontSize: 17,
            amountPrefixFontSize: 18,
            amountValueFontSize: 24,
            yearFontSize: 24,
            dotOuter: 17,
            dotInner: 9,
        },
    } as const;

    const renderChart = (mode: keyof typeof chartConfigs) => {
        const config = chartConfigs[mode];
        const innerWidth = config.reportChartWidth - config.chartLeftPadding - config.chartRightPadding;
        const innerHeight = config.reportChartHeight - config.chartTopPadding - config.chartBottomPadding;
        const maxAmount = 200;
        const stepX = innerWidth / Math.max(graphBars.length - 1, 1);
        const linePoints = graphBars.map((bar, index) => {
            const x = config.chartLeftPadding + stepX * index;
            const y = config.chartTopPadding + innerHeight - (bar.amount / maxAmount) * innerHeight;
            let growthValue: string | undefined;

            if (index > 0) {
                const prevAmount = graphBars[index - 1].amount;
                const growth = ((bar.amount - prevAmount) / prevAmount) * 100;
                growthValue = `+${growth.toFixed(1)}%`;
            }

            return {
                ...bar,
                x,
                y,
                formattedAmount: bar.amount.toLocaleString("ko-KR"),
                growthValue,
            };
        });
        const linePath = linePoints.reduce((path, point, index) => {
            if (index === 0) {
                return `M ${point.x} ${point.y}`;
            }

            const previousPoint = linePoints[index - 1];
            const rise = point.y - previousPoint.y;
            const controlX1 = previousPoint.x + stepX * (mode === "mobile" ? 0.38 : 0.42);
            const controlY1 = previousPoint.y + rise * 0.1;
            const controlX2 = point.x - stepX * (mode === "mobile" ? 0.12 : 0.16);
            const controlY2 = point.y - rise * (mode === "mobile" ? 0.7 : 0.78);

            return `${path} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${point.x} ${point.y}`;
        }, "");

        return (
            <svg
                viewBox={`0 0 ${config.reportChartWidth} ${config.reportChartHeight}`}
                className="h-full w-full"
            >
                {linePoints.map((point) => (
                    <g key={`${mode}-${point.name}`}>
                        {/* 
                          To have an 8px rounded top on the bar,
                          Use <rect> instead of <line> for the bar, with rx only on the top side.
                          In SVG, rx/ry round all corners, but we can "clip" the bottom by overlaying a rect, or via a clipPath.
                          For clarity and cross-browser reliability, use a clipPath that only rounds the top corners.
                        */}
                        <clipPath id={`bar-clip-${mode}-${point.name}`}>
                            <path
                                d={`
                                    M ${point.x - config.barWidth / 2} ${point.y + 8}
                                    a 8 8 0 0 1 8 -8
                                    h ${config.barWidth - 16}
                                    a 8 8 0 0 1 8 8
                                    v ${config.reportChartHeight - config.chartBottomPadding - point.y - 8}
                                    h -${config.barWidth}
                                    Z
                                `}
                            />
                        </clipPath>

                        <motion.rect
                            x={point.x - config.barWidth / 2}
                            y={point.y}
                            width={config.barWidth}
                            height={config.reportChartHeight - config.chartBottomPadding - point.y}
                            fill="var(--adaptive-grey900)"
                            clipPath={`url(#bar-clip-${mode}-${point.name})`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: config.reportChartHeight - config.chartBottomPadding - point.y, opacity: 1 }}
                            whileInView={{ height: config.reportChartHeight - config.chartBottomPadding - point.y, opacity: 1 }}
                            viewport={{ amount: 0.25, once: false }}
                            transition={{ duration: 0.8, delay: 0.16 * linePoints.indexOf(point), ease: graphEase }}
                        />

                        {point.growthValue ? (
                            <>
                                <motion.text
                                    x={point.x}
                                    y={point.y - config.growthLabelY - 12}
                                    textAnchor="middle"
                                    fontWeight="700"
                                    fill="var(--adaptive-grey500)"
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ amount: 0.25, once: false }}
                                    transition={{ duration: 0.55, delay: 0.4 * linePoints.indexOf(point) + 0.15, ease: graphEase }}
                                >
                                    <tspan
                                        fontSize={config.growthCaptionFontSize}
                                        fontWeight="700"
                                    >
                                        전년대비
                                    </tspan>
                                </motion.text>

                                <motion.text
                                    x={point.x}
                                    y={point.y - (config.growthLabelY - (mode === "mobile" ? 10 : 16))}
                                    textAnchor="middle"
                                    fontWeight="700"
                                    fill="var(--adaptive-red500)"
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ amount: 0.25, once: false }}
                                    transition={{ duration: 0.55, delay: 0.3 * linePoints.indexOf(point) + 0.15, ease: graphEase }}
                                >
                                    <tspan
                                        fontSize={config.growthValueFontSize}
                                        fontWeight="800"
                                    >
                                        {point.growthValue}
                                    </tspan>
                                </motion.text>
                            </>
                        ) : null}

                        <motion.text
                            x={point.x}
                            y={point.y - config.amountY}
                            textAnchor="middle"
                            fontWeight="700"
                            fill="#000000"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: 0.25, once: false }}
                            transition={{ duration: 0.55, delay: 0.2 * linePoints.indexOf(point) + 0.15, ease: graphEase }}
                        >
                            <tspan
                                fontSize={config.amountPrefixFontSize}
                                fontWeight="600"
                            >
                                약&nbsp;
                            </tspan>
                            <tspan
                                fontSize={config.amountValueFontSize}
                                fontWeight="800"
                            >
                                {point.formattedAmount}
                            </tspan>
                            <tspan
                                fontSize={config.amountValueFontSize}
                                fontWeight="800"
                            >
                                억
                            </tspan>
                        </motion.text>

                        <text
                            x={point.x}
                            y={config.reportChartHeight - (mode === "mobile" ? 14 : 60)}
                            textAnchor="middle"
                            fontSize={config.yearFontSize}
                            fontWeight="900"
                            fill="var(--adaptive-grey900)"
                        >
                            {point.name}
                        </text>
                    </g>
                ))}

                <motion.path
                    d={linePath}
                    fill="none"
                    stroke="var(--adaptive-red500)"
                    strokeWidth={mode === "mobile" ? 2 : 4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0.4 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ amount: 0.25, once: false }}
                    transition={{ duration: 1.8, ease: graphEase }}
                />

                {linePoints.map((point, index) => (
                    <motion.g
                        key={`${mode}-${point.name}-dot`}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ amount: 0.25, once: false }}
                        transition={{ duration: 0.45, delay: 0.24 * index + 0.25, ease: graphEase }}
                        style={{ transformOrigin: `${point.x}px ${point.y}px` }}
                    >
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={config.dotOuter}
                            fill="var(--adaptive-redOpacity100)"
                        />
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={config.dotInner}
                            fill="var(--adaptive-red500)"
                        />
                    </motion.g>
                ))}
            </svg>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: false }}
            transition={{ duration: 0.7, ease: graphEase }}
            className="mt-auto ml-auto flex w-full justify-end"
        >
            <div className="relative mt-[5.6rem] h-[46dvh] w-full px-[1.2rem] pb-[1.2rem] pt-[1.6rem] md:h-[80dvh] md:w-[80dvw] md:px-[2.4rem] md:pb-[2.4rem] md:pt-[3.2rem]">
                <div className="h-full md:hidden">{renderChart("mobile")}</div>
                <div className="hidden h-full md:block">{renderChart("desktop")}</div>

                {false ? (
                    <motion.div
                        className="absolute right-[4%] top-[5%] rounded-[1.8rem] bg-[#48c3bc] px-[1.4rem] py-[1.2rem] text-center text-white shadow-[0_24px_40px_rgba(72,195,188,0.2)] md:right-[0.8rem] md:top-[-2.2rem] md:rounded-[2.6rem] md:px-[2.4rem] md:py-[2rem]"
                        initial={{ opacity: 0, scale: 0.2 }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            y: [-10, 10, -10],
                        }}
                        viewport={{ amount: 0.25, once: false }}
                        transition={{
                            opacity: { duration: 0.35, delay: 0.5, ease: graphEase },
                            scale: { duration: 0.45, delay: 0.5, ease: graphEase },
                            y: { duration: 2.8, ease: hoverEase, repeat: Infinity, repeatType: "loop", repeatDelay: 0.1 },
                        }}
                    >
                        <div className="flex items-center text-[1.8rem] font-black md:text-[2.8rem]">
                            <span className="block mobile:hidden">
                                <Text.Rolling
                                    value={187}
                                    rollingCount={5}
                                    textSize={38}
                                />
                            </span>

                            <span className="hidden mobile:block">
                                <Text.Rolling
                                    value={187}
                                    rollingCount={5}
                                    textSize={30}
                                />
                            </span>

                            <p>억</p>
                        </div>

                        <div className="mt-[0.4rem] text-[1.6rem] font-black leading-[1.1] md:mt-[0.6rem] md:text-[2.4rem]">돌파!!</div>
                        <div className="absolute bottom-[-1rem] left-1/2 h-0 w-0 -translate-x-1/2 border-l-[1rem] border-r-[1rem] border-t-[1.4rem] border-l-transparent border-r-transparent border-t-[#48c3bc] md:bottom-[-1.6rem] md:border-l-[1.6rem] md:border-r-[1.6rem] md:border-t-[2.2rem]" />
                    </motion.div>
                ) : null}
            </div>
        </motion.div>
    );
};
