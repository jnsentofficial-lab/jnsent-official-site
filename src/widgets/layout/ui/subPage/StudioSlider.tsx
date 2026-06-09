"use client";

import { FormEvent, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, PanInfo, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";

type StudioSliderProps = {
    items: {
        title: string;
        image: string;
    }[];
    touch?: boolean;
};
export function StudioSlider({ items, touch = false }: StudioSliderProps) {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const sliderItems = [...items, ...items];
    const x = useMotionValue(0);
    const isDraggingRef = useRef(false);
    const loopWidthRef = useRef(0);
    const velocityRef = useRef(0);

    const normalizeX = (value: number, loopWidth: number) => {
        if (!loopWidth) return value;

        const normalized = value % loopWidth;
        return normalized > 0 ? normalized - loopWidth : normalized;
    };

    useEffect(() => {
        if (!touch) return;

        const updateLoopWidth = () => {
            const trackWidth = trackRef.current?.scrollWidth ?? 0;
            const nextLoopWidth = trackWidth / 2;
            loopWidthRef.current = nextLoopWidth;
            x.set(normalizeX(x.get(), nextLoopWidth));
        };

        updateLoopWidth();
        window.addEventListener("resize", updateLoopWidth);

        return () => window.removeEventListener("resize", updateLoopWidth);
    }, [items, touch, x]);

    useAnimationFrame((_, delta) => {
        if (!touch || isDraggingRef.current) return;

        const loopWidth = loopWidthRef.current;

        if (!loopWidth) return;

        const nextX = x.get() + ((-40 + velocityRef.current) * delta) / 1000;
        x.set(normalizeX(nextX, loopWidth));

        const dampedVelocity = velocityRef.current * Math.pow(0.92, delta / 16.67);
        velocityRef.current = Math.abs(dampedVelocity) < 1 ? 0 : dampedVelocity;
    });

    return (
        <motion.section
            className="overflow-hidden pb-16"
            initial={{ opacity: 0, transform: "translateY(100px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(100px)" }}
            transition={{
                delay: 0.4,
                type: "spring",
                mass: 0.1,
                stiffness: 100,
                damping: 10,
            }}
        >
            <motion.div
                ref={trackRef}
                className={`flex w-max ${touch ? "cursor-grab active:cursor-grabbing" : ""}`}
                animate={touch ? undefined : { x: ["0%", "-50%"] }}
                drag={touch ? "x" : false}
                dragElastic={touch ? 0.02 : undefined}
                dragMomentum={false}
                onDragStart={() => {
                    isDraggingRef.current = true;
                    velocityRef.current = 0;
                }}
                onDrag={() => {
                    const loopWidth = loopWidthRef.current;

                    if (!loopWidth) return;

                    x.set(normalizeX(x.get(), loopWidth));
                }}
                onDragEnd={(_, info: PanInfo) => {
                    isDraggingRef.current = false;
                    velocityRef.current = info.velocity.x;
                    x.set(normalizeX(x.get(), loopWidthRef.current));
                }}
                transition={touch ? undefined : { duration: 52, ease: "linear", repeat: Infinity }}
                style={touch ? { x, touchAction: "pan-y" } : undefined}
            >
                {sliderItems.map((item, index) => (
                    <article
                        className="relative h-[50dvh] w-[50dvw] overflow-hidden rounded-[0rem] bg-black max-[86rem]:h-[24rem] max-[86rem]:w-[min(34rem,calc(100vw-3.2rem))]"
                        key={`${item.title}-${index}`}
                    >
                        <img
                            alt={item.title}
                            className="h-full w-full object-cover opacity-85 select-none pointer-events-none"
                            src={item.image}
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent mobile:p-[2rem] pc:p-[3.2rem] h-[50%] flex items-end">
                            <h6 className="text-white font-[700] mobile:text-[2.4rem] pc:text-[3.2rem]">{item.title}</h6>
                        </div>
                    </article>
                ))}
            </motion.div>
        </motion.section>
    );
}
