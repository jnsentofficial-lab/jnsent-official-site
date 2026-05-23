"use client";

import { useState } from "react";
import { Transition } from "@/shared/ui/transition";

const pages = {
    a: {
        badge: "A Page",
        body: "현재 페이지가 오른쪽에서 왼쪽으로 gradient fadeOut 되면서 다음 페이지와 동시에 교체됩니다.",
        metric: "Fade out",
        title: "원본 A 페이지",
    },
    b: {
        badge: "B Page",
        body: "새 페이지는 같은 방향으로 gradient fadeIn 되기 때문에 기다림 없이 자연스럽게 겹쳐 나타납니다.",
        metric: "Fade in",
        title: "다음 B 페이지",
    },
};

type PageKey = keyof typeof pages;

function PageCard({ pageKey }: { pageKey: PageKey }) {
    const page = pages[pageKey];

    return (
        <article className="min-h-[30rem] rounded-[2.8rem] border border-[rgba(15,23,42,0.08)] bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <span className="text-sm font-black uppercase tracking-[0.22em] text-[var(--adaptiveRed400)]">{page.badge}</span>
            <strong className="mt-5 block text-5xl font-black leading-[1.08] text-black">{page.title}</strong>
            <p className="mt-6 max-w-[54rem] text-xl font-semibold leading-[1.75] text-[var(--adaptiveGrey700)]">{page.body}</p>
            <div className="mt-16 flex items-end justify-between gap-6">
                <div>
                    <span className="text-sm font-black uppercase tracking-[0.18em] text-[var(--adaptiveGrey500)]">transition</span>
                    <span className="mt-3 block text-3xl font-black text-black">{page.metric}</span>
                </div>
                <div className="grid h-16 w-16 place-items-center rounded-full bg-black text-sm font-black text-white">{pageKey.toUpperCase()}</div>
            </div>
        </article>
    );
}

export function ShimmerPreview() {
    const [activePage, setActivePage] = useState<PageKey>("a");

    function togglePage() {
        setActivePage((current) => (current === "a" ? "b" : "a"));
    }

    return (
        <section className="mx-auto w-full max-w-[128rem] px-8 pb-24 max-[80rem]:px-6 max-[48rem]:px-5">
            <div className="rounded-[3.2rem] bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fb_100%)] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] max-[48rem]:rounded-[2.4rem] max-[48rem]:p-5">
                <div className="mb-8 flex items-center justify-between gap-5 max-[48rem]:flex-col max-[48rem]:items-start">
                    <div>
                        <strong className="block text-3xl font-black text-black max-[48rem]:text-2xl">Page Transition Preview</strong>
                        <p className="mt-3 text-lg font-semibold leading-[1.7] text-[var(--adaptiveGrey700)]">Transition.FadeInOut 공통 컴포넌트의 오른쪽에서 왼쪽 방향 전환 예시입니다.</p>
                    </div>
                    <button
                        className="inline-flex h-16 items-center justify-center rounded-full bg-black px-8 text-lg font-black text-white transition-transform duration-200 hover:-translate-y-1"
                        onClick={togglePage}
                        type="button"
                    >
                        페이지 전환
                    </button>
                </div>
                <Transition.FadeInOut
                    activeKey={activePage}
                    className="rounded-[2.8rem]"
                    duration={1.4}
                >
                    <PageCard pageKey={activePage} />
                </Transition.FadeInOut>
            </div>
        </section>
    );
}
