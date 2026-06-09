"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import useNavigate from "@/shared/hooks/useNavigate";

const socialItems = [
    { key: "kakao", href: "https://open.kakao.com/o/s0UmPOAc", label: "카카오톡 오픈채팅" },
    { key: "insta", href: "https://www.instagram.com/jns_ent__?igsh=MTc0M3RnMTluMzFqNQ%3D%3D&utm_source=qr", label: "인스타그램" },
    { key: "blog", href: "https://blog.naver.com/js_ent_", label: "네이버 블로그" },
    { key: "", href: "", label: "" },
];

const MOBILE_BREAKPOINT = 768;
const MOBILE_HIDE_X = "120%";
const QUICK_MENU_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function QuickMenu() {
    const { isReadyLanding } = useLayoutStore();
    const { currentPathName } = useNavigate();

    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (typeof window === "undefined") return;

        let lastScrollY = window.scrollY;

        const syncViewport = () => {
            const nextIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
            setIsMobile(nextIsMobile);
            setIsVisible(true);
            lastScrollY = window.scrollY;
        };

        const handleScroll = () => {
            if (window.innerWidth >= MOBILE_BREAKPOINT) {
                setIsVisible(true);
                return;
            }

            const currentScrollY = window.scrollY;
            const diff = currentScrollY - lastScrollY;

            if (Math.abs(diff) < 6) return;

            setIsVisible(diff < 0 || currentScrollY <= 0);
            lastScrollY = currentScrollY;
        };

        syncViewport();
        window.addEventListener("resize", syncViewport);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("resize", syncViewport);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (typeof document === "undefined") return;

        const { body } = document;
        const shouldHide = isReadyLanding && isMobile && !isVisible;

        body.dataset.quickMenuMobileHidden = shouldHide ? "true" : "false";

        return () => {
            delete body.dataset.quickMenuMobileHidden;
        };
    }, [isMobile, isReadyLanding, isVisible]);

    return (
        <AnimatePresence>
            {(isReadyLanding || currentPathName !== "/") && !currentPathName.includes("/admin") && !currentPathName.startsWith("/qna/") ? (
                <motion.aside
                    className="fixed mobile:top-[50%] mobile:right-[1.6rem] mobile:-translate-y-1/2 pc:top-auto pc:right-7 pc:bottom-[1.6rem] pc:translate-y-0 z-30 flex flex-col items-center justify-center gap-[2.4rem]"
                    data-report-id="플로팅 메뉴"
                    data-report-type="item"
                    initial={{ x: MOBILE_HIDE_X, opacity: 0 }}
                    animate={{
                        x: !isMobile || isVisible ? 0 : MOBILE_HIDE_X,
                        opacity: !isMobile || isVisible ? 1 : 0,
                    }}
                    exit={{ x: MOBILE_HIDE_X, opacity: 0 }}
                    transition={{ duration: 0.45, ease: QUICK_MENU_EASE }}
                >
                    <section className="flex flex-col gap-[0.8rem]">
                        {socialItems.map(({ key, href, label }) => (
                            <a
                                className={`grid mobile:h-[4.8rem] mobile:w-[4.8rem] pc:h-[7.2rem] pc:w-[7.2rem] place-items-center rounded-full ${!!key ? "bg-white" : "bg-transparent"} text-sm font-[700] text-black shadow-[0_0.8rem_2.6rem_rgba(0,0,0,0.14)]`}
                                href={href || undefined}
                                key={key || "spacer"}
                                aria-label={label || undefined}
                                {...(href ? { target: "_blank", rel: "noreferrer" } : {})}
                            >
                                {key ? (
                                    <Image
                                        src={`/images/icon/route/home/ico-floating-${key}.svg`}
                                        alt=""
                                        height={58}
                                        width={58}
                                        className="mobile:w-[4.2rem] pc:w-[5.8rem]"
                                    />
                                ) : null}
                            </a>
                        ))}
                    </section>
                    <div className="mx-auto h-[0.1rem] w-8 bg-[var(--adaptive-black400)]" />
                    <button
                        type="button"
                        aria-label="맨 위로 이동"
                        className="cursor-pointer grid mobile:h-[4.8rem] mobile:w-[4.8rem] pc:h-[7.2rem] pc:w-[7.2rem] place-items-center rounded-full bg-black text-3xl font-light text-white shadow-[0_0.8rem_2.6rem_rgba(0,0,0,0.16)]"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        <Image
                            src="/images/icon/route/home/ico-floating-up.svg"
                            alt=""
                            height={58}
                            width={58}
                            className="mobile:w-[4.2rem] pc:w-[5.8rem] invert"
                        />
                    </button>
                </motion.aside>
            ) : null}
        </AnimatePresence>
    );
}
