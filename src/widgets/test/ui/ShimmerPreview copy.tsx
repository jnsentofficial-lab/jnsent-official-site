"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTestProvider } from "@/features/test/model/SubscriptionContext";

type DemoCardProps = {
    body: string;
    eyebrow: string;
    highlight: string;
    isLoading: boolean;
    title: string;
};

const TRANSITION_SECONDS = 1;
const MASK_IMAGE = "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.16) 18%, #000 38%, #000 62%, rgba(0,0,0,0.16) 82%, transparent 100%)";

function getLayerMaskStyle(maskPosition: string): CSSProperties {
    return {
        WebkitMaskImage: MASK_IMAGE,
        WebkitMaskPosition: maskPosition,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "320% 100%",
        maskImage: MASK_IMAGE,
        maskPosition,
        maskRepeat: "no-repeat",
        maskSize: "320% 100%",
    };
}

function useDirectionalMask(isVisible: boolean) {
    const [maskPosition, setMaskPosition] = useState(isVisible ? "50% 0%" : "-120% 0%");
    const [canTransition, setCanTransition] = useState(true);

    useEffect(() => {
        let secondFrame = 0;

        if (!isVisible) {
            setCanTransition(true);
            setMaskPosition("-320% 0%");
            // setMaskPosition("-120% 0%");
            return undefined;
        }

        setCanTransition(false);
        setMaskPosition("120% 0%");

        const firstFrame = window.requestAnimationFrame(() => {
            secondFrame = window.requestAnimationFrame(() => {
                setCanTransition(true);
                setMaskPosition("50% 0%");
            });
        });

        return () => {
            window.cancelAnimationFrame(firstFrame);
            window.cancelAnimationFrame(secondFrame);
        };
    }, [isVisible]);

    return { canTransition, maskPosition };
}

function ShimmerBlock({ className }: { className: string }) {
    return (
        <div className={`relative overflow-hidden rounded-full bg-[rgba(15,23,42,0.08)] ${className}`}>
            <motion.div
                animate={{ x: ["-200%", "200%"] }}
                className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.92)_50%,rgba(255,255,255,0)_100%)]"
                transition={{ duration: 1.6, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
            />
        </div>
    );
}

function DemoCard({ body, eyebrow, highlight, isLoading, title }: DemoCardProps) {
    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setShowSkeleton(isLoading);
        }, 80);

        return () => window.clearTimeout(timer);
    }, [isLoading]);

    const originalVisible = !showSkeleton;
    const skeletonVisible = showSkeleton;
    const originalMask = useDirectionalMask(originalVisible);
    const skeletonMask = useDirectionalMask(skeletonVisible);

    return (
        <article className="relative min-h-[27rem] overflow-hidden rounded-[2.8rem] border border-[rgba(15,23,42,0.08)] bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <motion.div
                animate={{
                    // filter: originalVisible ? "blur(0px)" : "blur(2px)",
                    opacity: originalVisible ? 1 : 0,
                    // scale: originalVisible ? 1 : 0.995,
                }}
                style={getLayerMaskStyle(originalMask.maskPosition)}
                initial={{
                    opacity: 1,
                }}
                className={`relative z-[1] flex h-full flex-col transition-[-webkit-mask-position,mask-position] ${originalMask.canTransition ? "duration-[5000ms]" : "duration-0"} ease-[cubic-bezier(0.22,1,0.36,1)]`}
                transition={{
                    opacity: { duration: TRANSITION_SECONDS, ease: [0.22, 1, 0.36, 1] },
                }}
            >
                <span className="text-sm font-black uppercase tracking-[0.22em] text-[var(--adaptiveRed400)]">{eyebrow}</span>
                <strong className="mt-5 text-4xl font-black leading-[1.15] text-black">{title}</strong>
                <p className="mt-5 text-lg font-semibold leading-[1.75] text-[var(--adaptiveGrey700)]">{body}</p>
                <div className="mt-auto flex items-end justify-between pt-12">
                    <div className="flex flex-col">
                        <span className="text-sm font-black uppercase tracking-[0.18em] text-[var(--adaptiveGrey500)]">highlight</span>
                        <span className="mt-3 text-3xl font-black text-black">{highlight}</span>
                    </div>
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-black text-sm font-black text-white">LIVE</div>
                </div>
            </motion.div>
            <motion.div
                animate={{
                    opacity: skeletonVisible ? 1 : 0,
                }}
                className={`pointer-events-none absolute inset-0 z-[2] p-8 transition-[opacity,-webkit-mask-position,mask-position] ${skeletonMask.canTransition ? "duration-[5000ms]" : "duration-0"} ease-[cubic-bezier(0.22,1,0.36,1)]`}
                initial={{
                    opacity: 0,
                }}
                style={getLayerMaskStyle(skeletonMask.maskPosition)}
                transition={{
                    opacity: { duration: TRANSITION_SECONDS, ease: [0.22, 1, 0.36, 1] },
                }}
            >
                <motion.div
                    animate={{ x: skeletonVisible ? 0 : 12 }}
                    className="flex h-full flex-col"
                    transition={{ duration: TRANSITION_SECONDS, ease: [0.22, 1, 0.36, 1] }}
                >
                    <ShimmerBlock className="h-5 w-24 rounded-full" />
                    <ShimmerBlock className="mt-6 h-12 w-3/4 rounded-[1.2rem]" />
                    <ShimmerBlock className="mt-4 h-12 w-1/2 rounded-[1.2rem]" />

                    <div className="mt-6 grid gap-3">
                        <ShimmerBlock className="h-4 w-full rounded-full" />
                        <ShimmerBlock className="h-4 w-[92%] rounded-full" />
                        <ShimmerBlock className="h-4 w-[78%] rounded-full" />
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-12">
                        <div className="flex flex-col gap-3">
                            <ShimmerBlock className="h-4 w-20 rounded-full" />
                            <ShimmerBlock className="h-10 w-28 rounded-[1.2rem]" />
                        </div>
                        <ShimmerBlock className="h-16 w-16 rounded-full" />
                    </div>
                </motion.div>

                <motion.div
                    animate={{ x: skeletonVisible ? "140%" : "-120%", opacity: [0, 0.85, 0] }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.86)_52%,rgba(255,255,255,0)_100%)]"
                    transition={{ duration: TRANSITION_SECONDS, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.div>
        </article>
    );
}

export function ShimmerPreview() {
    const { cycle, isLoading, restartDemo } = useTestProvider();

    return (
        <section className="mx-auto w-full max-w-[128rem] px-8 pb-24 max-[80rem]:px-6 max-[48rem]:px-5">
            <div className="rounded-[3.2rem] bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fb_100%)] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] max-[48rem]:rounded-[2.4rem] max-[48rem]:p-5">
                <div className="mb-8 flex items-center justify-between gap-5 max-[48rem]:flex-col max-[48rem]:items-start">
                    <div>
                        <strong className="block text-3xl font-black text-black max-[48rem]:text-2xl">Skeleton Shimmer Preview</strong>
                        <p className="mt-3 text-lg font-semibold leading-[1.7] text-[var(--adaptiveGrey700)]">새로고침 없이도 로딩 진입과 완료 전환을 반복해보며 질감을 확인할 수 있습니다.</p>
                    </div>
                    <button
                        className="inline-flex h-16 items-center justify-center rounded-full bg-black px-8 text-lg font-black text-white transition-transform duration-200 hover:-translate-y-1"
                        onClick={restartDemo}
                        type="button"
                    >
                        다시 재생
                    </button>
                </div>
                <div
                    className="grid gap-6 md:grid-cols-3"
                    key={cycle}
                >
                    <DemoCard
                        body="실제 카드 구조를 먼저 잡아둔 뒤 skeleton overlay만 gradient mask로 걷히게 해서 자리 이동 없이 전환됩니다."
                        eyebrow="overlay"
                        highlight="Layout kept"
                        isLoading={isLoading}
                        title="자리부터 먼저 고정합니다"
                    />
                    <DemoCard
                        body="면적을 잘라내지 않고 왼쪽에서 오른쪽으로 fadeout 레이어가 지나가며 실제 UI를 드러냅니다."
                        eyebrow="mask fade"
                        highlight="Soft transition"
                        isLoading={isLoading}
                        title="오버레이가 부드럽게 걷힙니다"
                    />
                    <DemoCard
                        body="skeleton을 완전히 다른 화면으로 보이게 하지 않고, 최종 UI와 비슷한 실루엣으로 맞춰 이질감을 줄였습니다."
                        eyebrow="shared silhouette"
                        highlight="Less jarring"
                        isLoading={isLoading}
                        title="스켈레톤과 실제 UI의 결을 맞춥니다"
                    />
                </div>
            </div>
        </section>
    );
}
