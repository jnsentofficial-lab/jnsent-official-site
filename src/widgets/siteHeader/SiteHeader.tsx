"use client";

import UI from "@/shared/ui/UIComponent";

const navigationItems = [
    // { href: "/about", label: "회사소개" },
    // { href: "/setupGuide", label: "세팅안내" },
    // { href: "/equipmentRental", label: "장비렌탈" },
    // { href: "/studioRental", label: "스튜디오" },
    { href: "/bjSupport", label: "엔터창업" },
    { href: "/bjSupport", label: "장비렌탈" },
    { href: "/bjSupport", label: "스튜디오 대여/대관" },
    { href: "/news", label: "NEWS" },
    // { href: "/consulting", label: "창업컨설팅" },
];

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-md">
            <div className="mx-auto flex min-h-18 w-[min(112rem,calc(100%_-_3.2rem))] items-center justify-between gap-6 max-[86rem]:min-h-0 max-[86rem]:flex-col max-[86rem]:items-start max-[86rem]:py-4">
                <UI.Link
                    className="shrink-0 text-lg font-bold"
                    href="/"
                >
                    New Project 2
                </UI.Link>
                <nav
                    className="flex items-center justify-end gap-[1.8rem] text-sm text-slate-700 max-[86rem]:w-full max-[86rem]:flex-wrap max-[86rem]:justify-start max-[86rem]:gap-x-4 max-[86rem]:gap-y-3"
                    aria-label="주요 메뉴"
                >
                    {navigationItems.map((item) => (
                        <UI.Link
                            className="whitespace-nowrap hover:text-teal-700"
                            href={item.href}
                            key={item.href}
                        >
                            {item.label}
                        </UI.Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
