import { useAnimationFrame, useMotionValue, useScroll, useTransform, useVelocity } from "framer-motion";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextMarqueeProps = {
    children: ReactNode;
    className?: string;
    classNameInner?: string;
    contentClassName?: string;
    direction?: "left" | "right";
    interaction?: boolean;
    repeat?: number;
    speed?: number;
};

function wrap(min: number, max: number, value: number) {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
}

export function Marquee({ children, className = "", classNameInner = "", contentClassName = "", direction = "left", interaction = false, repeat = 4, speed = 40 }: TextMarqueeProps) {
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
                className={`flex w-max ${classNameInner}`}
                style={{ x }}
            >
                {Array.from({ length: Math.max(2, repeat) }).map((_, index) => (
                    <div
                        className={`flex shrink-0 items-center gap-[1.6rem] ${contentClassName}`}
                        key={index}
                    >
                        {children}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
