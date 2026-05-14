"use client";

import UI from "@/shared/ui/UIComponent";

export function SiteFooter() {
    return (
        <footer className="border-t border-slate-200 bg-slate-900 text-slate-50">
            <div className="mx-auto flex min-h-30 w-[min(112rem,calc(100%_-_3.2rem))] items-center justify-between gap-6 max-[86rem]:flex-col max-[86rem]:items-start max-[86rem]:py-7">
                <div>
                    <strong>New Project 2</strong>
                    <p className="mt-2 mb-0 text-slate-300">콘텐츠 비즈니스를 위한 운영 파트너</p>
                </div>
                <nav
                    className="flex gap-[1.8rem] text-sm text-slate-200 max-[86rem]:w-full max-[86rem]:flex-wrap max-[86rem]:justify-start max-[86rem]:gap-x-4 max-[86rem]:gap-y-3 [&_a:hover]:text-teal-700"
                    aria-label="하단 메뉴"
                >
                    <UI.Link href="/news">NEWS</UI.Link>
                    <UI.Link href="/bjSupport">상담 문의</UI.Link>
                    <UI.Link href="/consulting">창업컨설팅</UI.Link>
                </nav>
            </div>
        </footer>
    );
}
