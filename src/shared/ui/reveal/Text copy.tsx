"use client";

import type { MotionValue } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "motion/react";

type TextElement = "h1" | "h2" | "h3" | "p" | "span";

type RevealTextProps = {
    as?: TextElement;
    children: string;
    className?: string;
    damping?: number;
    delay?: number;
    highlightColor?: string;
    initialColor?: string;
    midColor?: string;
    revealColor?: string;
    revealWindow?: number;
    smooth?: boolean;
    softness?: number;
    stiffness?: number;
    transition?: number;
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
                left: line.left,
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
                {line.text}
            </motion.span>
            <motion.span
                className="absolute inset-0 block"
                style={{
                    WebkitMaskImage: highlightMask,
                    color: highlightColor,
                    maskImage: highlightMask,
                }}
            >
                {line.text}
            </motion.span>
        </span>
    );
}

function Reveal({
    as = "p",
    children,
    className = "",
    delay = 0,
    highlightColor,
    initialColor = "rgb(203, 213, 225)",
    midColor = "rgb(244, 114, 182)",
    revealColor = "rgb(15, 23, 42)",
    revealWindow,
    softness = 22,
    transition = delay,
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
    const resolvedHighlightColor = highlightColor ?? midColor;
    const resolvedSoftness = revealWindow ? Math.max(14, revealWindow * 90) : softness;

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
            className={`relative block whitespace-pre-wrap ${className}`}
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

const Text = {
    Reveal,
};

export { Reveal, Text };
export default Text;
