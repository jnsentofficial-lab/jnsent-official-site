"use client";

import type { MotionValue } from "motion/react";
import type { ReactNode } from "react";
import { Fragment, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useAnimationFrame, useMotionTemplate, useMotionValue, useScroll, useTransform, useVelocity } from "motion/react";
import { util } from "@/shared/utils/util";

type TextElement = "h1" | "h2" | "h3" | "p" | "span";

type RevealTextProps = {
    as?: TextElement;
    children: string;
    className?: string;
    completeThreshold?: number;
    damping?: number;
    delay?: number;
    highlightColor?: string;
    initialColor?: string;
    midColor?: string;
    align?: "center" | "left" | "right";
    revealColor?: string;
    revealWindow?: number;
    smooth?: boolean;
    softness?: number;
    stiffness?: number;
    transition?: number;
    onRevealComplete?: () => void;
};

type TextMarqueeProps = {
    children: ReactNode;
    className?: string;
    contentClassName?: string;
    direction?: "left" | "right";
    interaction?: boolean;
    repeat?: number;
    speed?: number;
};

type Line = {
    height: number;
    left: number;
    text: string;
    top: number;
    width: number;
};

type LineOverlayProps = {
    highlightColor: string;
    index: number;
    line: Line;
    progress: MotionValue<number>;
    revealColor: string;
    softness: number;
    total: number;
};

function useTransitionProgress(source: MotionValue<number>, duration: number) {
    const progress = useMotionValue(source.get());

    useEffect(() => {
        if (duration <= 0) {
            return source.on("change", (value) => progress.set(value));
        }

        let controls: ReturnType<typeof animate> | null = null;

        const unsubscribe = source.on("change", (value) => {
            controls?.stop();
            controls = animate(progress, value, {
                duration,
                ease: [0.22, 1, 0.36, 1],
            });
        });

        return () => {
            controls?.stop();
            unsubscribe();
        };
    }, [duration, progress, source]);

    return progress;
}

function groupTextLines(element: HTMLElement) {
    const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    const text = textNode?.textContent ?? "";
    const containerRect = element.getBoundingClientRect();
    const range = document.createRange();
    const groups: Array<{ end: number; rects: DOMRect[]; start: number; top: number }> = [];

    for (let index = 0; index < text.length; index += 1) {
        range.setStart(textNode as Text, index);
        range.setEnd(textNode as Text, index + 1);

        const rect = range.getBoundingClientRect();
        if (rect.width === 0 && text[index] !== " ") continue;

        const top = Math.round(rect.top);
        const group = groups.find((item) => Math.abs(item.top - top) < 4);

        if (group) {
            group.end = index + 1;
            group.rects.push(rect);
        } else {
            groups.push({ end: index + 1, rects: [rect], start: index, top });
        }
    }

    range.detach();

    return groups.map((group) => {
        const left = Math.min(...group.rects.map((rect) => rect.left));
        const right = Math.max(...group.rects.map((rect) => rect.right));
        const top = Math.min(...group.rects.map((rect) => rect.top));
        const bottom = Math.max(...group.rects.map((rect) => rect.bottom));

        return {
            height: bottom - top,
            left: left - containerRect.left,
            text: text.slice(group.start, group.end).trimEnd(),
            top: top - containerRect.top,
            width: right - left,
        };
    });
}

function LineOverlay({ highlightColor, index, line, progress, revealColor, softness, total }: LineOverlayProps) {
    const segment = 1 / Math.max(total, 1);
    const start = index * segment;
    const end = (index + 1) * segment;
    const lineProgress = useTransform(progress, [start, end], [0, 1], { clamp: true });
    const revealPercent = useTransform(lineProgress, [0, 1], [0, 100]);
    const revealMask = useMotionTemplate`linear-gradient(90deg, #000 0%, #000 ${revealPercent}%, transparent ${revealPercent}%, transparent 100%)`;
    const highlightMask = useMotionTemplate`linear-gradient(90deg, transparent 0%, transparent calc(${revealPercent}% - ${softness}px), rgba(0,0,0,0.35) calc(${revealPercent}% - ${softness / 2}px), #000 ${revealPercent}%, rgba(0,0,0,0.35) calc(${revealPercent}% + ${softness / 2}px), transparent calc(${revealPercent}% + ${softness}px), transparent 100%)`;

    return (
        <span
            aria-hidden="true"
            className="pointer-events-none absolute block whitespace-pre"
            style={{
                height: line.height,
                left: line.left - softness,
                lineHeight: `${line.height}px`,
                top: line.top,
                width: line.width + softness * 2,
            }}
        >
            <motion.span
                className="absolute inset-0 block"
                style={{
                    WebkitMaskImage: revealMask,
                    color: revealColor,
                    maskImage: revealMask,
                }}
            >
                <span style={{ display: "inline-block", paddingInline: softness }}>{line.text}</span>
            </motion.span>
            <motion.span
                className="absolute inset-0 block"
                style={{
                    WebkitMaskImage: highlightMask,
                    color: highlightColor,
                    maskImage: highlightMask,
                }}
            >
                <span style={{ display: "inline-block", paddingInline: softness }}>{line.text}</span>
            </motion.span>
        </span>
    );
}

function RevealText({
    as = "p",
    children,
    className = "",
    completeThreshold = 0.995,
    delay = 0,
    align = "center",
    highlightColor,
    initialColor = "rgb(203, 213, 225)",
    midColor = "rgb(244, 114, 182)",
    revealColor = "rgb(15, 23, 42)",
    revealWindow,
    softness = 22,
    transition = delay,
    onRevealComplete,
}: RevealTextProps) {
    const targetRef = useRef<HTMLElement | null>(null);
    const baseRef = useRef<HTMLSpanElement | null>(null);
    const [lines, setLines] = useState<Line[]>([]);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "center center"],
    });
    const transitionProgress = useTransitionProgress(scrollYProgress, transition);
    const Tag = as;
    const completeRef = useRef(false);
    const resolvedHighlightColor = highlightColor ?? midColor;
    const resolvedSoftness = revealWindow ? Math.max(14, revealWindow * 90) : softness;

    useEffect(() => {
        completeRef.current = false;

        return transitionProgress.on("change", (value) => {
            if (value < 0.05) {
                completeRef.current = false;
                return;
            }

            if (!completeRef.current && value >= completeThreshold) {
                completeRef.current = true;
                onRevealComplete?.();
            }
        });
    }, [completeThreshold, children, onRevealComplete, transitionProgress]);

    useLayoutEffect(() => {
        const element = baseRef.current;
        if (!element) return undefined;

        function measure() {
            if (!element) return;
            setLines(groupTextLines(element));
        }

        measure();

        const resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(element);
        window.addEventListener("resize", measure);
        document.fonts?.ready.then(measure);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [children]);

    return (
        <Tag
            aria-label={children}
            className={`relative block whitespace-pre-wrap ${className} ${align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left"}`}
            ref={targetRef as never}
        >
            <span
                aria-hidden="true"
                className="block"
                ref={baseRef}
                style={{ color: initialColor }}
            >
                {children}
            </span>
            <span className="pointer-events-none absolute inset-0 block">
                {lines.map((line, index) => (
                    <LineOverlay
                        highlightColor={resolvedHighlightColor}
                        index={index}
                        key={`${line.text}-${index}`}
                        line={line}
                        progress={transitionProgress}
                        revealColor={revealColor}
                        softness={resolvedSoftness}
                        total={lines.length}
                    />
                ))}
            </span>
        </Tag>
    );
}

interface FontSizeProps {
    textSize?: 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38;
}

// 메인 컴포넌트 (숫자를 자릿수별로 분리해서 NumberColumn으로 보냄)
interface AnimateNumberProps extends FontSizeProps {
    value: number;
    amount?: number;
    digit?: number;
    initialValue?: number;
    rollingCount?: number;
    staggerDelay?: number;
    className?: {
        container?: string;
        text?: string;
        guide?: {
            front?: string;
            back?: string;
        };
    };
    guide?: {
        front?: string;
        back?: string;
    };
    delay?: number;
    ariaLabel?: string;
    onClick?: () => void;
}

interface NumberColumnProps extends FontSizeProps {
    active: boolean;
    digit: number;
    className: string;
    initialDigit: number;
    rollingCount: number;
    size: any;
    delay: number;
    staggerDelay: number;
    columnIndex: number;
    onClick?: () => void;
}

const Rolling = ({
    value,
    amount = 0.25,
    digit = 1,
    delay = 0,
    initialValue = 0,
    rollingCount = 1,
    staggerDelay = 0.06,
    className = {
        container: "",
        text: "",
        guide: {
            front: "",
            back: "",
        },
    },
    textSize = 14,
    guide = {
        front: "",
        back: "",
    },
    ariaLabel = "",
    onClick,
}: AnimateNumberProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);
    const normalizedLength = Math.max(digit, String(Math.trunc(Math.abs(value))).length, String(Math.trunc(Math.abs(initialValue))).length);
    const FORMAT_VALUE = util.string.getCommaOnPrice(value).padStart(normalizedLength, "0").split("");
    const FORMAT_INITIAL_VALUE = util.string.getCommaOnPrice(initialValue).padStart(normalizedLength, "0").split("");

    const sizeMap = {
        12: { text: "1.2", height: "1.2" },
        13: { text: "1.3", height: "1.3" },
        14: { text: "1.4", height: "1.4" },
        15: { text: "1.5", height: "1.5" },
        16: { text: "1.6", height: "1.6" },
        17: { text: "1.7", height: "1.7" },
        18: { text: "1.8", height: "1.8" },
        19: { text: "1.9", height: "1.9" },
        20: { text: "2.0", height: "2.0" },
        21: { text: "2.1", height: "2.1" },
        22: { text: "2.2", height: "2.2" },
        23: { text: "2.3", height: "2.3" },
        24: { text: "2.4", height: "2.4" },
        25: { text: "2.5", height: "2.5" },
        26: { text: "2.6", height: "2.6" },
        27: { text: "2.7", height: "2.7" },
        28: { text: "2.8", height: "2.8" },
        29: { text: "2.9", height: "2.9" },
        30: { text: "3.0", height: "3.0" },
        31: { text: "3.1", height: "3.1" },
        32: { text: "3.2", height: "3.2" },
        33: { text: "3.3", height: "3.3" },
        34: { text: "3.4", height: "3.4" },
        35: { text: "3.5", height: "3.5" },
        36: { text: "3.6", height: "3.6" },
        37: { text: "3.7", height: "3.7" },
        38: { text: "3.8", height: "3.8" },
    };

    const size = sizeMap[textSize] || sizeMap[14]; // fallback

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return undefined;
        const currentElement = element;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio >= amount) {
                    setActive(true);
                    return;
                }

                if (entry.boundingClientRect.top >= window.innerHeight) {
                    setActive(false);
                }
            },
            {
                threshold: [...new Set([0, amount, ...Array.from({ length: 11 }, (_, index) => index / 10)])].sort((a, b) => a - b),
            },
        );

        function resetWhenBelow() {
            const rect = currentElement.getBoundingClientRect();
            if (rect.top >= window.innerHeight) setActive(false);
        }

        observer.observe(currentElement);
        resetWhenBelow();
        window.addEventListener("scroll", resetWhenBelow, { passive: true });
        window.addEventListener("resize", resetWhenBelow);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", resetWhenBelow);
            window.removeEventListener("resize", resetWhenBelow);
        };
    }, [amount]);

    return (
        <div
            className={`${className?.container ?? ""} relative`}
            aria-label={ariaLabel}
            data-value={value}
            ref={containerRef}
            style={{ display: "flex", alignItems: "center" }}
        >
            {guide.front ? (
                <motion.p
                    layout
                    className={`${className.guide?.front ?? ""} `}
                    style={{ fontSize: `${size.text}` }}
                >
                    {guide.front}
                </motion.p>
            ) : null}

            {FORMAT_VALUE.map((digit, idx) => {
                return (
                    <Fragment key={idx}>
                        {digit === "," ? (
                            <motion.p
                                layout
                                className={className?.text ?? ""}
                                style={{ fontSize: `${size.text}rem` }}
                            >
                                ,
                            </motion.p>
                        ) : (
                            <NumberColumn
                                active={active}
                                key={idx}
                                digit={parseInt(digit)}
                                className={className?.text ?? ""}
                                initialDigit={parseInt(FORMAT_INITIAL_VALUE[idx] ?? "0")}
                                rollingCount={rollingCount}
                                size={size}
                                delay={delay}
                                staggerDelay={staggerDelay}
                                columnIndex={idx}
                                onClick={onClick}
                            />
                        )}
                    </Fragment>
                );
            })}

            {guide.back ? (
                <motion.p
                    layout
                    className={`${className.guide?.back ?? ""}`}
                    style={{ fontSize: `${size.text}` }}
                >
                    {guide.back}
                </motion.p>
            ) : null}
        </div>
    );
};

// 숫자 하나(자릿수 하나) 애니메이션 처리
const NumberColumn = ({ active, digit, className, initialDigit, rollingCount, size, delay, staggerDelay, columnIndex, onClick }: NumberColumnProps) => {
    const [position, setPosition] = useState(0);
    const numbers = useMemo(() => Array.from({ length: Math.max(1, rollingCount) + 1 }, () => Array.from({ length: 10 }, (_, index) => index)).flat(), [rollingCount]);

    const columnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (columnRef.current) {
            const height = columnRef?.current?.clientHeight;

            setPosition(active ? -height * (Math.max(1, rollingCount) * 10 + digit) : -height * initialDigit); // 음수로 내려가야 증가됨
        }
    }, [active, digit, initialDigit, rollingCount]);

    return (
        <div
            className={`number-column ${className}`}
            style={{ textAlign: "center", overflow: "hidden", height: `${size.height}rem` }}
            ref={columnRef}
            onClick={onClick}
        >
            <motion.div
                key="number-column"
                animate={{ y: position }}
                transition={{ duration: active ? Math.max(0.9, rollingCount * 0.45) : 0, delay: active ? delay + columnIndex * staggerDelay : 0, ease: [0.25, 0.8, 0.25, 1], staggerChildren: 0.5 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                {numbers.map((number, index) => (
                    <p
                        key={index}
                        className={className}
                        style={{ textAlign: "center", fontSize: `${size.text}rem`, height: `${size.height}rem` }}
                    >
                        {number}
                    </p>
                ))}
            </motion.div>
        </div>
    );
};

interface TextShimmerProps {
    children: string;
    as?: React.ElementType;
    className?: string;
    duration?: number;
    style?: React.CSSProperties;
    color?: {
        start: string;
        end: string;
    };
}

const TextShimmer = ({
    children,
    as: Component = "span",
    className = "",
    style = {},
    color = {
        start: "var(--color-brand-500)",
        end: "rgba(0,0,0,1)",
    },
    duration = 2,
}: TextShimmerProps) => {
    const shimmerName = `text-shimmer-${useId().replace(/:/g, "")}`;

    useEffect(() => {
        const prev = document.getElementById(shimmerName);
        if (prev) prev.remove();

        const keyframes = `
      @keyframes ${shimmerName} {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `;

        const styleTag = document.createElement("style");
        styleTag.id = shimmerName;
        styleTag.innerHTML = keyframes;
        document.head.appendChild(styleTag);

        return () => {
            styleTag.remove();
        };
    }, [color.start, color.end, duration]);

    return (
        <Component
            ref={null}
            className={`inline-block relative text-transparent bg-clip-text [background-size:400%_100%] ${className}`}
            style={{
                ...style,
                backgroundImage: `linear-gradient(90deg, ${color.start} 0%, ${color.end} 50%, ${color.start} 100%)`,
                backgroundSize: "400% 100%",
                backgroundRepeat: "repeat",
                backgroundPosition: "0% 0%",
                animation: `${shimmerName} ${duration}s linear infinite`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}
        >
            {children}
        </Component>
    );
};

function wrap(min: number, max: number, value: number) {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
}

function TextMarquee({
    children,
    className = "",
    contentClassName = "",
    direction = "left",
    interaction = false,
    repeat = 4,
    speed = 40,
}: TextMarqueeProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const x = useTransform(baseX, (value) => `${wrap(-100, 0, value)}%`);
    const directionFactor = direction === "left" ? -1 : 1;

    useAnimationFrame((_, delta) => {
        const scrollBoost = interaction ? Math.min(Math.abs(scrollVelocity.get()) * 0.025, speed * 3) : 0;
        const moveBy = directionFactor * (speed + scrollBoost) * (delta / 1000);

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={`overflow-hidden whitespace-nowrap ${className}`}>
            <motion.div
                aria-hidden="true"
                className="flex w-max"
                style={{ x }}
            >
                {Array.from({ length: Math.max(2, repeat) }).map((_, index) => (
                    <div
                        className={`flex shrink-0 items-center ${contentClassName}`}
                        key={index}
                    >
                        {children}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

const Text = {
    Reveal: RevealText,
    Text: RevealText,
    Rolling,
    Shimmer: TextShimmer,
    Marquee: TextMarquee,
};

const Reveal = {
    Reveal: RevealText,
    Text: RevealText,
    Rolling,
    Marquee: TextMarquee,
};

export { Reveal, RevealText, Rolling, Text, TextMarquee };
export default Text;
