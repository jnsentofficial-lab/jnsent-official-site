"use client";

import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import UI from "@/shared/ui/UIComponent";

const navigationItems = [
    { href: "/", label: "메인" },
    { href: "/consulting", label: "엔터창업" },
    { href: "/equipmentRental", label: "장비렌탈" },
    // { href: "/setupGuide", label: "시스템/지원내용" },
    { href: "/studioRental", label: "스튜디오 대여/대관" },
    { href: "/news", label: "뉴스" },
];

export function SiteHeader() {
    const { isNowDarkMode } = useLayoutStore();
    return (
        <header className="fixed top-0 left-[50%] transform translate-x-[-50%] z-40 w-full bg-[linear-gradient(0deg,_transparent,var(--adaptive-background))] h-[7.2rem]">
            <div className="mx-auto h-full w-full max-w-[var(--size-pc)] flex justify-between items-center">
                <UI.Link
                    className="shrink-0 text-2xl"
                    href="/"
                >
                    <img
                        src={"/images/common/ico-logo.svg"}
                        alt=""
                        className={`${isNowDarkMode ? "invert" : ""}`}
                    />
                </UI.Link>

                <nav
                    className="flex-1 flex justify-center gap-[2.4rem]"
                    aria-label="주요 메뉴"
                >
                    {navigationItems.map((item) => (
                        <UI.Link
                            className="text-[1.8rem] whitespace-nowrap hover:text-[#ff6673]"
                            href={item.href}
                            key={item.href}
                        >
                            {item.label}
                        </UI.Link>
                    ))}
                </nav>

                <UI.Link
                    className="text-[1.6rem] inline-flex shrink-0 items-center justify-center rounded-full bg-black px-6 py-[0.2rem] text-base text-white"
                    href="/bjSupport"
                >
                    BJ 지원하기
                </UI.Link>
            </div>
        </header>
    );
}
