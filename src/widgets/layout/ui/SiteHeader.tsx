"use client";

import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import UI from "@/shared/ui/UIComponent";
import Image from "next/image";

const navigationItems = [
    { href: "/", label: "메인" },
    { href: "/consulting", label: "엔터창업" },
    { href: "/equipmentRental", label: "장비렌탈" },
    { href: "/studioRental", label: "스튜디오 대여/대관" },
    { href: "/news", label: "뉴스" },
];

export function SiteHeader() {
    const { isNowDarkMode, isMobileNavOpen, setIsMobileNavOpen } = useLayoutStore();

    return (
        <header className="fixed top-0 left-[50%] transform translate-x-[-50%] z-40 w-full bg-[linear-gradient(0deg,_transparent,var(--adaptive-background))] h-[7.2rem]">
            <div className="mx-auto h-full w-full max-w-[var(--size-pc)] flex justify-between items-center mobile:px-[1.6rem] pc:px-0">
                <UI.Linker
                    className="shrink-0 text-2xl"
                    href="/"
                    onClick={() => setIsMobileNavOpen(false)}
                >
                    <Image
                        src={"/images/common/ico-logo.svg"}
                        width={52}
                        height={52}
                        alt=""
                        className={`${isNowDarkMode ? "invert" : ""}`}
                    />
                </UI.Linker>

                <nav
                    className="mobile:hidden flex-1 justify-center gap-[2.4rem] pc:flex"
                    aria-label="주요 메뉴"
                >
                    {navigationItems.map((item) => (
                        <UI.Linker
                            className="text-[1.8rem] whitespace-nowrap hover:text-[#ff6673]"
                            href={item.href}
                            key={item.href}
                            onClick={() => setIsMobileNavOpen(false)}
                        >
                            {item.label}
                        </UI.Linker>
                    ))}
                </nav>

                <UI.Linker
                    className="mobile:hidden rounded-full bg-black px-[1.2rem] text-white pc:inline-flex"
                    // className="text-[1.6rem] inline-flex shrink-0 items-center justify-center rounded-full bg-black px-6 py-[0.2rem] text-base text-white"
                    href="/bjSupport"
                    size="sm"
                >
                    BJ 지원하기
                </UI.Linker>

                <UI.Button
                    className="relative z-[60] min-h-[4.8rem] min-w-[4.8rem] bg-transparent px-0 text-[2.8rem] leading-none touch-manipulation pc:hidden"
                    onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                    type="button"
                >
                    {isMobileNavOpen ? "×" : "☰"}
                </UI.Button>
            </div>

            {isMobileNavOpen ? (
                <div className="fixed inset-0 top-0 z-50 flex min-h-[100dvh] flex-col bg-white p-[2.4rem] pc:hidden">
                    <div className="mb-[4rem] flex items-center justify-between">
                        <UI.Linker
                            className="shrink-0 text-2xl"
                            href="/"
                            onClick={() => setIsMobileNavOpen(false)}
                        >
                            <Image
                                src={"/images/common/ico-logo.svg"}
                                width={52}
                                height={52}
                                alt=""
                            />
                        </UI.Linker>

                        <UI.Button
                            className="min-h-[4.8rem] min-w-[4.8rem] bg-transparent px-0 text-[2.8rem] leading-none touch-manipulation"
                            onClick={() => setIsMobileNavOpen(false)}
                            type="button"
                        >
                            ×
                        </UI.Button>
                    </div>

                    <nav
                        className="flex flex-1 flex-col gap-[2.0rem]"
                        aria-label="모바일 주요 메뉴"
                    >
                        {navigationItems.map((item) => (
                            <UI.Linker
                                className="text-[2.4rem] hover:text-[#ff6673]"
                                href={item.href}
                                key={item.href}
                                onClick={() => setIsMobileNavOpen(false)}
                            >
                                {item.label}
                            </UI.Linker>
                        ))}
                    </nav>

                    <UI.Linker
                        className="inline-flex w-full justify-center rounded-full bg-black px-[1.2rem] text-white"
                        href="/bjSupport"
                        onClick={() => setIsMobileNavOpen(false)}
                        size="sm"
                    >
                        BJ 지원하기
                    </UI.Linker>
                </div>
            ) : null}
        </header>
    );
}
