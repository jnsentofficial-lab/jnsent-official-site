"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionTemplate, useMotionValue } from "motion/react";

type FadeInOutProps = {
    activeKey: string | number;
    children: ReactNode;
    className?: string;
    duration?: number;
    feather?: number;
};

type Layer = {
    children: ReactNode;
    key: string | number;
};

type FadeLayerProps = {
    children: ReactNode;
    duration: number;
    feather: number;
    mode: "enter" | "exit";
    phase: "idle" | "run";
};

function FadeLayer({ children, duration, feather, mode, phase }: FadeLayerProps) {
    const wipeX = useMotionValue(phase === "run" ? 120 : -20);
    const enterMask = useMotionTemplate`linear-gradient(90deg, transparent 0%, transparent calc(${wipeX}% - ${feather}%), rgba(0,0,0,0.48) ${wipeX}%, #000 calc(${wipeX}% + ${feather}%), #000 100%)`;
    const exitMask = useMotionTemplate`linear-gradient(90deg, #000 0%, #000 calc(${wipeX}% - ${feather}%), rgba(0,0,0,0.48) ${wipeX}%, transparent calc(${wipeX}% + ${feather}%), transparent 100%)`;
    const maskImage = mode === "enter" ? enterMask : exitMask;

    useEffect(() => {
        wipeX.set(phase === "run" ? 120 : -20);

        if (phase !== "run") return undefined;

        const controls = animate(wipeX, -20, {
            duration,
            ease: [0.22, 1, 0.36, 1],
        });

        return () => controls.stop();
    }, [duration, phase, wipeX]);

    return (
        <motion.div
            className="h-full w-full"
            style={{
                WebkitMaskImage: maskImage,
                maskImage,
            }}
        >
            {children}
        </motion.div>
    );
}

function FadeInOut({ activeKey, children, className = "", duration = 1.4, feather = 12 }: FadeInOutProps) {
    const currentRef = useRef<Layer>({ children, key: activeKey });
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [current, setCurrent] = useState<Layer>({ children, key: activeKey });
    const [previous, setPrevious] = useState<Layer | null>(null);
    const [transitionId, setTransitionId] = useState(0);

    useEffect(() => {
        if (currentRef.current.key === activeKey) {
            const nextCurrent = { children, key: activeKey };
            currentRef.current = nextCurrent;
            setCurrent(nextCurrent);
            return undefined;
        }

        const previousCurrent = currentRef.current;
        const nextCurrent = { children, key: activeKey };

        if (timerRef.current) clearTimeout(timerRef.current);

        currentRef.current = nextCurrent;
        setPrevious(previousCurrent);
        setCurrent(nextCurrent);
        setTransitionId((value) => value + 1);

        timerRef.current = setTimeout(() => {
            setPrevious(null);
        }, duration * 1000 + 120);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [activeKey, children, duration]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <FadeLayer
                duration={duration}
                feather={feather}
                key={`current-${String(current.key)}-${transitionId}`}
                mode="enter"
                phase={previous ? "run" : "idle"}
            >
                {current.children}
            </FadeLayer>
            {previous ? (
                <div className="pointer-events-none absolute inset-0 z-[2]">
                    <FadeLayer
                        duration={duration}
                        feather={feather}
                        key={`previous-${String(previous.key)}-${transitionId}`}
                        mode="exit"
                        phase="run"
                    >
                        {previous.children}
                    </FadeLayer>
                </div>
            ) : null}
        </div>
    );
}

const Transition = {
    FadeInOut,
};

export { FadeInOut, Transition };
export default Transition;
