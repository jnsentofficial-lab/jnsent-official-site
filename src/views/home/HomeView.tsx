"use client";

import { HomePanel } from "@/widgets/home";
import { useEffect } from "react";

export function HomeView() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <HomePanel />;
}
