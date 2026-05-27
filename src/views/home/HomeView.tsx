"use client";

import { HomePanel } from "@/widgets/home";
import { useEffect } from "react";
import Lenis from "lenis";

export function HomeView() {
    useEffect(() => {
        window.scrollTo(0, 0);

        const lenis = new Lenis({ lerp: 0.14 });
        let frameId = 0;

        const raf = (time: number) => {
            lenis.raf(time);
            frameId = window.requestAnimationFrame(raf);
        };

        frameId = window.requestAnimationFrame(raf);

        return () => {
            window.cancelAnimationFrame(frameId);
            lenis.destroy();
        };
    }, []);

    return <HomePanel />;
}
