"use client";

import UI from "@/shared/ui/UIComponent";

const navigationItems = [
    { href: "/bjSupport", label: "혜택" },
    { href: "/bjSupport", label: "방송지원" },
    { href: "/bjSupport", label: "전문매니징" },
    { href: "/news", label: "소식/뉴스" },
];

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex min-h-18 w-[min(112rem,calc(100%_-_3.2rem))] items-center justify-between gap-6 max-[86rem]:min-h-0 max-[86rem]:flex-wrap max-[86rem]:py-4">
                <UI.Link
                    className="shrink-0 text-xl font-black text-black"
                    href="/"
                >
                    JNS ENTERTAINMENT
                </UI.Link>
                <nav
                    className="flex items-center justify-end gap-[2.4rem] text-sm font-black text-black max-[86rem]:order-3 max-[86rem]:w-full max-[86rem]:flex-wrap max-[86rem]:justify-start max-[86rem]:gap-x-4 max-[86rem]:gap-y-3"
                    aria-label="주요 메뉴"
                >
                    {navigationItems.map((item) => (
                        <UI.Link
                            className="whitespace-nowrap hover:text-[#ff6673]"
                            href={item.href}
                            key={item.href}
                        >
                            {item.label}
                        </UI.Link>
                    ))}
                </nav>
                <UI.Link
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-black text-white"
                    href="/bjSupport"
                >
                    BJ 지원하기
                </UI.Link>
            </div>
        </header>
    );
}
