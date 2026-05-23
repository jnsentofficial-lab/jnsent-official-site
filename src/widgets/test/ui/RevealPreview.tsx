"use client";

import { Reveal } from "@/shared/ui/reveal";

export function RevealPreview() {
    return (
        <section className="mx-auto w-full max-w-[128rem] px-8 pb-[38dvh] pt-28 max-[80rem]:px-6 max-[48rem]:px-5">
            <div className="mb-16 flex items-end justify-between gap-8 max-[64rem]:flex-col max-[64rem]:items-start">
                <div>
                    <span className="text-sm font-black uppercase tracking-[0.28em] text-[var(--adaptiveRed400)]">Scroll Reveal</span>
                    <h2 className="mt-5 text-5xl font-black leading-[1.08] text-black max-[48rem]:text-4xl">Gradient Text Reveal</h2>
                </div>
                <p className="max-w-[42rem] text-lg font-semibold leading-[1.75] text-[var(--adaptiveGrey700)]">
                    텍스트가 화면 아래에 있을 때는 0%, 화면 정중앙에 도달하면 100%로 reveal 됩니다.
                </p>
            </div>
            <div className="flex min-h-[105dvh] items-end rounded-[3.2rem] bg-black p-10 max-[48rem]:rounded-[2.4rem] max-[48rem]:p-6">
                <Reveal.Text
                    as="h2"
                    className="max-w-[92rem] text-6xl font-black leading-[1.08] max-[64rem]:text-5xl max-[48rem]:text-4xl"
                    highlightColor="rgb(255, 92, 118)"
                    initialColor="rgb(63, 63, 70)"
                    revealColor="rgb(255, 255, 255)"
                    softness={28}
                    transition={0.25}
                >
                    스크롤이 텍스트를 화면 중앙으로 데려오는 순간, 문장 위로 부드러운 그라데이션이 밀려옵니다.
                </Reveal.Text>
            </div>
        </section>
    );
}
