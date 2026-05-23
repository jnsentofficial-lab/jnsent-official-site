"use client";

import { useTestProvider } from "@/features/test/model/SubscriptionContext";

export function Intro() {
    const { isLoading } = useTestProvider();

    return (
        <section className="mx-auto flex w-full max-w-[128rem] flex-col gap-6 px-8 pb-10 pt-20 text-center max-[80rem]:px-6 max-[48rem]:px-5 max-[48rem]:pt-14">
            <span className="text-sm font-black uppercase tracking-[0.28em] text-[var(--adaptiveRed400)]">Motion Test</span>
            <div className="flex flex-col gap-4">
                <h1 className="m-0 text-6xl font-black leading-[1.08] text-black max-[64rem]:text-5xl max-[48rem]:text-4xl">
                    Framer Motion으로
                    <br />
                    전환과 reveal 감각을 시험하는 라우트입니다.
                </h1>
                <p className="m-0 text-xl font-semibold leading-[1.8] text-[var(--adaptiveGrey700)] max-[48rem]:text-lg">
                    페이지 전환과 scroll-reactive gradient text reveal을 공통 컴포넌트 형태로 확인할 수 있습니다.
                </p>
            </div>
            <p className="m-0 text-base font-black text-[var(--adaptiveGrey500)]">{isLoading ? "loading sequence running" : "content state ready"}</p>
        </section>
    );
}
