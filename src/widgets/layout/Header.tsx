"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/widgets/layout/ui";

export function Header() {
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) {
        return null;
    }

    return <SiteHeader />;
}
