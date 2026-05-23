import { util } from "@/shared/utils/util";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

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

export const Rolling = ({
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
