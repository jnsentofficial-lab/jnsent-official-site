"use client";

import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import UI from "@/shared/ui/UIComponent";
import Image from "next/image";
import { useEffect } from "react";

const navigationItems = [
    { href: "/", label: "메인" },
    { href: "/consulting", label: "엔터창업" },
    { href: "/equipmentRental", label: "장비렌탈" },
    { href: "/studioRental", label: "스튜디오 대여/대관" },
    { href: "/news", label: "뉴스" },
];

export function SiteHeader() {
    const { isNowDarkMode, isMobileNavOpen, setIsMobileNavOpen } = useLayoutStore();

    useEffect(() => {
        const { body, documentElement } = document;
        const previousBodyOverflow = body.style.overflow;
        const previousHtmlOverflow = documentElement.style.overflow;

        if (isMobileNavOpen) {
            body.style.overflow = "hidden";
            documentElement.style.overflow = "hidden";
        }

        return () => {
            body.style.overflow = previousBodyOverflow;
            documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [isMobileNavOpen]);

    return (
        <header
            className="fixed top-0 left-[50%] transform translate-x-[-50%] z-1000000 w-full bg-[linear-gradient(0deg,_transparent,var(--adaptive-background))] pc:h-[7.2rem]"
            data-report-id="상단 헤더"
            data-report-type="group"
        >
            <div className="mx-auto h-full w-full max-w-[var(--size-pc)] flex justify-between items-center mobile:p-[2.4rem] pc:px-0">
                <UI.Linker
                    className="shrink-0 text-2xl"
                    href="/"
                    onClick={() => setIsMobileNavOpen(false)}
                    data-report-id="상단 헤더 로고"
                    data-report-type="item"
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
                    className="mobile:hidden flex-1 justify-center gap-[4.2rem] pc:flex"
                    aria-label="상단 헤더 메뉴"
                    data-report-id="상단 헤더 메뉴"
                    data-report-type="item"
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
                    className="mobile:hidden rounded-full bg-black px-[1.2rem] text-white flex items-center justify-center"
                    // className="text-[1.6rem] inline-flex shrink-0 items-center justify-center rounded-full bg-black px-6 py-[0.2rem] text-base text-white"
                    href="/bjSupport"
                    data-report-id="상단 헤더 지원 버튼"
                    data-report-type="item"
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
                <div className="fixed inset-0 top-0 z-100 flex min-h-[100dvh] flex-col bg-white gap-[1.6rem] p-[2.4rem_2.4rem_5.2rem] pc:hidden">
                    <div className="flex items-center justify-between">
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
                            className="min-h-[4.8rem] min-w-[4.8rem] text-black bg-transparent px-0 text-[2.8rem] leading-none touch-manipulation"
                            onClick={() => setIsMobileNavOpen(false)}
                            type="button"
                        >
                            ×
                        </UI.Button>
                    </div>

                    <nav
                        className="flex flex-1 flex-col justify-end"
                        aria-label="모바일 주요 메뉴"
                        data-report-id="모바일 헤더 메뉴"
                        data-report-type="item"
                    >
                        {navigationItems.map((item) => (
                            <UI.Linker
                                className="text-[2.4rem] text-black hover:text-[#ff6673]"
                                href={item.href}
                                key={item.href}
                                onClick={() => setIsMobileNavOpen(false)}
                            >
                                {item.label}
                            </UI.Linker>
                        ))}
                    </nav>

                    {/* <section className="w-full flex flex-col gap-[1.6rem]">
                        <div className="h-[0.1rem] w-full bg-[var(--adaptive-grey200)]" />
                        <UI.Linker
                            className="flex items-center w-full"
                            href="/bjSupport"
                            onClick={() => setIsMobileNavOpen(false)}
                            size="sm"
                        >
                            <p className="text-[2.4rem]">BJ 지원하기</p>
                            <Image
                                src={"/images/icon/outlined/ico-outlined-arrow-single-right.svg"}
                                alt=""
                                width={32}
                                height={32}
                            />
                        </UI.Linker>
                    </section> */}
                </div>
            ) : null}
        </header>
    );
}
