"use client";

import type { RefObject } from "react";
import { useEffect } from "react";
import { useLayoutStore } from "../stores/useLayoutStore";

type Theme = "light" | "dark" | "mild" | "semiMild";

type UseSectionThemeOptions = {
    activeTheme?: Theme;
    defaultTheme?: Theme;
    threshold?: number;
};

/**
 * 사용 예시:
 * const sectionRef = useRef<HTMLElement>(null);
 * useSectionTheme(sectionRef, { activeTheme: "dark", defaultTheme: "light", threshold: 0.5 });
 */
export function useSectionTheme(ref: RefObject<HTMLElement | null>, { activeTheme = "dark", defaultTheme = "light", threshold = 0.5 }: UseSectionThemeOptions = {}) {
    // 상태 셋터 직접 레퍼런스
    const setIsNowDarkMode = useLayoutStore((s) => s.setIsNowDarkMode);

    useEffect(() => {
        const section = ref.current;

        if (!section) {
            return;
        }

        const setTheme = (theme: Theme) => {
            document.documentElement.dataset.theme = theme;
        };

        let prevActive = null as null | boolean;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isActive = entry.intersectionRatio >= threshold;
                setTheme(isActive ? activeTheme : defaultTheme);
                // 상태 업데이트는 변화 있을 때만
                if (prevActive !== isActive) {
                    setIsNowDarkMode(isActive);
                    prevActive = isActive;
                }
            },
            { threshold: [0, threshold, 1] },
        );

        observer.observe(section);

        // 마운트시 초기화도 보장
        const handleInit = () => {
            // 섹션이 뷰포트 내에 있는지 수동 체크
            const rect = section.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight * (1 - threshold) && rect.bottom > window.innerHeight * threshold;
            const isActive = isInView;
            setTheme(isActive ? activeTheme : defaultTheme);
            setIsNowDarkMode(isActive);
            prevActive = isActive;
        };

        handleInit();

        return () => {
            observer.disconnect();
            setTheme(defaultTheme);
            setIsNowDarkMode(defaultTheme === "dark");
        };
    }, [activeTheme, defaultTheme, ref, threshold, setIsNowDarkMode]);
}
