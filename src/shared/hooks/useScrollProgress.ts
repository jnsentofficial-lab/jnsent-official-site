import { useState, useEffect, useRef, RefObject } from "react";

// 상태 타입 정의
type ScrollStatus = "below" | "active" | "above";

interface ScrollData {
    progress: number;
    status: ScrollStatus;
}

/**
 * @param threshold 기준점 (0 ~ 100, 기본값 50). 80을 넣으면 화면 상단에서 80% 지점이 기준이 됨.
 */
const useScrollProgress = <T extends HTMLElement>(threshold: number = 50) => {
    const ref = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<ScrollData>({
        progress: 0,
        status: "below",
    });

    useEffect(() => {
        // 성능 최적화를 위한 변수
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateScrollData();
                    ticking = false;
                });
                ticking = true;
            }
        };

        const updateScrollData = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // 사용자가 입력한 threshold를 기반으로 기준점(px) 계산
            // 예: 80% 지점 = windowHeight * 0.8
            const customTargetLine = windowHeight * (threshold / 100);

            // 1. 상태 판별 (사용자 지정 기준점 기준)
            let status: ScrollStatus = "active";
            if (rect.top > customTargetLine) {
                status = "below"; // 기준점보다 아래 있음
            } else if (rect.bottom < customTargetLine) {
                status = "above"; // 기준점보다 위로 지나감
            }

            // 2. 진행도 계산 (%)
            // 시작점: 화면 하단 (windowHeight)
            // 끝점: 사용자 지정 기준점 (customTargetLine)
            const start = windowHeight;
            const end = customTargetLine;

            let progress = ((start - rect.top) / (start - end)) * 100;
            progress = Math.max(0, Math.min(100, progress));

            setData({
                progress: Math.floor(progress),
                status,
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        updateScrollData(); // 초기 실행

        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]); // threshold가 바뀌면 다시 계산

    return [ref, data] as const;
};

export default useScrollProgress;
