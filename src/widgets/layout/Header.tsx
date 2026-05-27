"use client";

import { useEffect } from "react";
import { SiteHeader } from "@/widgets/layout/ui";
import useNavigate from "@/shared/hooks/useNavigate";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";

export function Header() {
    const { isReadyLanding, setIsMobileNavOpen } = useLayoutStore();
    const { currentPathName } = useNavigate();

    useEffect(() => {
        setIsMobileNavOpen(false);
    }, [currentPathName, setIsMobileNavOpen]);

    if (currentPathName.includes("/admin") || (currentPathName === "/" && !isReadyLanding)) {
        // if (currentPathName === "admin" || (currentPathName === "/" && !isReadyLanding)) {
        return null;
    }

    return <SiteHeader />;
}
