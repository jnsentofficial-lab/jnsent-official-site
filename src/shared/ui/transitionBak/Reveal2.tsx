"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "motion/react";

type TextElement = "h1" | "h2" | "h3" | "p" | "span";

type RevealTextProps = {
    as?: TextElement;
    children: string;
    className?: string;
    damping?: number;
    gradient?: string;
    initialColor?: string;
    midColor?: string;
    revealColor?: string;
    revealWindow?: number;
    smooth?: boolean;
    softness?: number;
    stiffness?: number;
};

function Text({
    as = "p",
    children,
    className = "",
    damping = 28,
    gradient,
    initialColor = "rgb(203, 213, 225)",
    midColor = "rgb(244, 114, 182)",
    revealColor = "rgb(15, 23, 42)",
    revealWindow,
    smooth = false,
    softness = 18,
    stiffness = 120,
}: RevealTextProps) {
    const targetRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "center center"],
    });
    const smoothProgress = useSpring(scrollYProgress, {
        damping,
        stiffness,
    });
    const revealProgress = smooth ? smoothProgress : scrollYProgress;
    const revealPercent = useTransform(revealProgress, [0, 1], [0, 100]);
    const resolvedGradient = gradient ?? `linear-gradient(90deg, ${midColor} 0%, ${revealColor} 56%, ${midColor} 100%)`;
    const resolvedSoftness = revealWindow ? Math.max(12, revealWindow * 80) : softness;
    const maskImage = useMotionTemplate`linear-gradient(90deg, #000 0%, #000 ${revealPercent}%, rgba(0,0,0,0.45) calc(${revealPercent}% + ${resolvedSoftness}px), transparent calc(${revealPercent}% + ${resolvedSoftness * 2}px), transparent 100%)`;
    const Tag = as;

    return (
        <Tag
            aria-label={children}
            className={`relative block whitespace-pre-wrap ${className}`}
            ref={targetRef as never}
        >
            <span
                aria-hidden="true"
                className="block"
                style={{ color: initialColor }}
            >
                {children}
            </span>
            <motion.span
                aria-hidden="true"
                className="absolute inset-0 block bg-clip-text text-transparent"
                style={{
                    WebkitMaskImage: maskImage,
                    backgroundImage: resolvedGradient,
                    maskImage,
                }}
            >
                {children}
            </motion.span>
        </Tag>
    );
}

const Reveal = {
    Text,
};

export { Reveal, Text };
export default Reveal;
