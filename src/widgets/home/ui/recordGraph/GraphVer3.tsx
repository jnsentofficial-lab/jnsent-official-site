"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Text } from "@/shared/ui/kit/Text";
import { graphBars } from "@/widgets/home/ui/recordGraph/constants";

export function GraphVer3() {
    const graphEase = [0.22, 1, 0.36, 1] as const;
    const hoverEase = [0.44, 0.05, 0.55, 0.95] as const;
    const graphRef = useRef<HTMLDivElement>(null);
    const isGraphInView = useInView(graphRef, { amount: 0.2 });
    const chartConfigs = {
        desktop: {
            reportChartWidth: 1260,
            reportChartHeight: 900,
            panelX: 0,
            panelY: 116,
            // panelWidth: 1440,
            panelWidth: 1300,
            panelHeight: 700,
            chartLeftPadding: 78,
            chartRightPadding: 2,
            chartTopPadding: 128,
            chartBottomPadding: 92,
            pointInsetStart: 68,
            pointInsetEnd: 74,
            pointVisualOffsetX: 50,
            pointVisualOffsetY: [-6, 0, 4] as const,
            pointRatios: [0.08, 0.52, 0.9] as const,
            dotOuter: 14,
            dotInner: 7,
            lineWidth: 3.2,
            startOffset: 112,
            endOffset: 36,
            firstCardWidth: 146,
            firstCardHeight: 82,
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
            lineLift: 14,
            exitLift: 8,
            cardOffsetY: 42,
            cardLastExtraOffsetY: 26,
            cardLastLowerOffsetY: 12,
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
            pointVisualOffsetX: 0,
            pointVisualOffsetY: [0, 0, 0] as const,
            pointRatios: [0.08, 0.52, 0.9] as const,
            dotOuter: 12,
            dotInner: 6,
            lineWidth: 2.35,
            startOffset: 42,
            endOffset: 20,
            firstCardWidth: 88,
            firstCardHeight: 58,
            detailCardWidth: 104,
            cardHeight: 98,
            cardRadius: 14,
            amountValueFontSize: 17,
            amountPrefixFontSize: 11,
            growthValueFontSize: 14,
            growthCaptionFontSize: 12,
            guideBottomOffset: 18,
            plotOffsetY: 0,
            entryLift: 8,
            lineLift: 2,
            exitLift: 4,
            cardOffsetY: 18,
            cardLastExtraOffsetY: 8,
            cardLastLowerOffsetY: 6,
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
        const lineStartY = linePoints[0].y + config.entryLift - config.lineLift;
        const lineEndX = linePoints[linePoints.length - 1].x + config.endOffset;
        const lineEndY = linePoints[linePoints.length - 1].y - config.lineLift - config.exitLift;
        const linePath = linePoints.reduce((path, point, index) => {
            const liftedPointY = point.y - config.lineLift;
            if (index === 0) {
                const entryControlX = lineStartX + config.startOffset * 0.48;
                const entryControlY = lineStartY - config.entryLift;

                return `M ${lineStartX} ${lineStartY} C ${entryControlX} ${entryControlY}, ${point.x - config.startOffset * 0.18} ${liftedPointY}, ${point.x} ${liftedPointY}`;
            }

            const previousPoint = linePoints[index - 1];
            const segmentWidth = point.x - previousPoint.x;
            const previousPointY = previousPoint.y - config.lineLift;
            const deltaY = liftedPointY - previousPointY;
            const controlX1 = previousPoint.x + segmentWidth * (mode === "mobile" ? 0.42 : 0.44);
            const controlY1 = previousPointY + deltaY * 0.22;
            const controlX2 = point.x - segmentWidth * (mode === "mobile" ? 0.34 : 0.32);
            const controlY2 = liftedPointY - deltaY * (mode === "mobile" ? 0.22 : 0.2);

            return `${path} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${point.x} ${liftedPointY}`;
        }, "");
        const extendedLinePath = `${linePath} L ${lineEndX} ${lineEndY}`;
        const areaPath = `${extendedLinePath} L ${lineEndX} ${chartBottom} L ${lineStartX} ${chartBottom} Z`;
        const cardData = linePoints.map((point, index) => {
            const cardWidth = index === 0 ? config.firstCardWidth : config.detailCardWidth;
            const cardHeight = index === 0 ? config.firstCardHeight : config.cardHeight;
            const pointVisualX = point.x - config.pointVisualOffsetX;
            const pointVisualY = point.y + (config.pointVisualOffsetY[index] ?? 0);
            const baseCardY = pointVisualY - cardHeight - config.cardOffsetY;
            const cardY = index === 2 ? Math.max(12, baseCardY - config.cardLastExtraOffsetY + config.cardLastLowerOffsetY) : baseCardY;
            const cardX = pointVisualX - cardWidth / 2;

            return {
                point,
                cardWidth,
                cardHeight,
                cardX,
                cardY,
                pointerX: pointVisualX,
                pointVisualY,
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
                    animate={{ opacity: isGraphInView ? 0.82 : 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: graphEase }}
                />

                <motion.path
                    d={areaPath}
                    fill={`url(#graph-area-glow-${mode})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isGraphInView ? 0.9 : 0 }}
                    transition={{ duration: 0.95, delay: 0.24, ease: graphEase }}
                />

                <motion.path
                    d={areaPath}
                    fill={`url(#graph-area-fade-${mode})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isGraphInView ? 0.9 : 0 }}
                    transition={{ duration: 1, delay: 0.25, ease: graphEase }}
                />

                <motion.path
                    d={extendedLinePath}
                    fill="none"
                    stroke={`url(#graph-line-${mode})`}
                    strokeWidth={config.lineWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0.4 }}
                    animate={{ pathLength: isGraphInView ? 1 : 0, opacity: isGraphInView ? 1 : 0.4 }}
                    transition={{ duration: 1.8, ease: graphEase }}
                />

                {linePoints.map((point, index) =>
                    index === 0 ? null : (
                        <motion.line
                            key={`${mode}-${point.name}-guide`}
                            x1={point.x - config.pointVisualOffsetX}
                            y1={point.y + (config.pointVisualOffsetY[index] ?? 0) + config.dotOuter}
                            x2={point.x - config.pointVisualOffsetX}
                            y2={config.panelY + config.panelHeight - config.guideBottomOffset}
                            stroke="rgba(100,116,139,0.36)"
                            strokeWidth="1.5"
                            strokeDasharray={mode === "mobile" ? "4 4" : "5 5"}
                            initial={{ opacity: 0, pathLength: 0 }}
                            animate={{ opacity: isGraphInView ? 1 : 0, pathLength: isGraphInView ? 1 : 0 }}
                            transition={{ duration: 0.7, delay: 0.22 * index + 0.4, ease: graphEase }}
                        />
                    ),
                )}

                {linePoints.map((point, index) => (
                    <motion.g
                        key={`${mode}-${point.name}-dot`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: isGraphInView ? 1 : 0, opacity: isGraphInView ? 1 : 0 }}
                        transition={{ duration: 0.45, delay: 0.24 * index + 0.25, ease: graphEase }}
                        style={{ transformOrigin: `${point.x}px ${point.y}px` }}
                    >
                        <circle
                            cx={point.x - config.pointVisualOffsetX}
                            cy={point.y + (config.pointVisualOffsetY[index] ?? 0)}
                            r={config.dotOuter + (mode === "mobile" ? 4 : 5)}
                            fill="var(--adaptive-red500)"
                            opacity="0.14"
                            filter={`url(#glow-${mode})`}
                        />
                        <circle
                            cx={point.x - config.pointVisualOffsetX}
                            cy={point.y + (config.pointVisualOffsetY[index] ?? 0)}
                            r={config.dotOuter}
                            fill="#ffffff"
                            stroke="rgba(255,107,117,0.32)"
                            strokeWidth={mode === "mobile" ? 4 : 5}
                        />
                        <circle
                            cx={point.x - config.pointVisualOffsetX}
                            cy={point.y + (config.pointVisualOffsetY[index] ?? 0)}
                            r={config.dotInner}
                            fill="var(--adaptive-red500)"
                        />
                    </motion.g>
                ))}

                {cardData.map(({ point, cardWidth, cardHeight, cardX, cardY, pointerX }, index) => (
                    <motion.g
                        key={`${mode}-${point.name}-card`}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: isGraphInView ? 1 : 0, y: isGraphInView ? 0 : 18 }}
                        transition={{ duration: 0.55, delay: 0.22 * index + 0.2, ease: graphEase }}
                    >
                        <rect
                            x={cardX + 10}
                            y={cardY + 15}
                            width={cardWidth - 20}
                            height={cardHeight - 20}
                            rx={config.cardRadius}
                            fill="rgba(255,255,255,0.96)"
                            filter={`url(#card-shadow-${mode})`}
                        />
                        <path
                            d={`M ${pointerX - 10} ${cardY + cardHeight - 6} L ${pointerX} ${cardY + cardHeight + 6} L ${pointerX + 10} ${cardY + cardHeight - 6} Z`}
                            fill="rgba(255,255,255,0.96)"
                        />

                        {index === 0 ? (
                            <text
                                x={cardX + cardWidth / 2}
                                y={cardY + cardHeight / 2 + (mode === "mobile" ? 10 : 14)}
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
                                    y={cardY + (mode === "mobile" ? 28 : 38)}
                                    textAnchor="middle"
                                    fontSize={config.growthCaptionFontSize}
                                    fontWeight="800"
                                    fill="var(--adaptive-grey500)"
                                >
                                    전년대비
                                </text>
                                <text
                                    x={cardX + cardWidth / 2}
                                    y={cardY + (mode === "mobile" ? 58 : 68)}
                                    textAnchor="middle"
                                    fontSize={config.growthValueFontSize}
                                    fontWeight="900"
                                    fill="var(--adaptive-red500)"
                                >
                                    {point.growthValue}
                                </text>
                                <text
                                    x={cardX + cardWidth / 2}
                                    y={cardY + (mode === "mobile" ? 90 : 100)}
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
            ref={graphRef}
            initial={false}
            animate={{ opacity: isGraphInView ? 1 : 0, y: isGraphInView ? 0 : 40 }}
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
}
