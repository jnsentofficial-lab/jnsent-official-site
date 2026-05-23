"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Transition } from "@/shared/ui/transition/Transition";

type RouteTransitionProps = {
    children: ReactNode;
    className?: string;
    duration?: number;
    feather?: number;
};

export function RouteTransition({ children, className = "", duration = 0.72, feather = 12 }: RouteTransitionProps) {
    const pathname = usePathname();

    return (
        <Transition.FadeInOut
            activeKey={pathname}
            className={className}
            duration={duration}
            feather={feather}
        >
            {children}
        </Transition.FadeInOut>
    );
}
