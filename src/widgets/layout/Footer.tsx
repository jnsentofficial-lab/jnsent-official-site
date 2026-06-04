"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/widgets/layout/ui";

export function Footer() {
    const pathname = usePathname();

    if (pathname.startsWith("/admin") || pathname.startsWith("/qna/")) {
        return null;
    }

    return <SiteFooter />;
}
