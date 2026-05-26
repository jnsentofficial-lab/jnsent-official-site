"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/widgets/layout/ui";
import useNavigate from "@/shared/hooks/useNavigate";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";

export function Header() {
    const { isReadyLanding } = useLayoutStore();
    const { currentPathName } = useNavigate();

    if (currentPathName.includes("admin") || (currentPathName === "/" && !isReadyLanding)) {
        // if (currentPathName === "admin" || (currentPathName === "/" && !isReadyLanding)) {
        return null;
    }

    return <SiteHeader />;
}
