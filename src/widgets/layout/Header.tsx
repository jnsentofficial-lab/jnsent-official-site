"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/widgets/layout/ui";
import useNavigate from "@/shared/hooks/useNavigate";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";

export function Header() {
    const { isNeedShowHeader } = useLayoutStore();
    const { currentPathName } = useNavigate();

    if (currentPathName === "admin" || (currentPathName === "/" && !isNeedShowHeader)) {
        return null;
    }

    return <SiteHeader />;
}
