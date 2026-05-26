"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/widgets/layout/ui";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";

export function Sidebar() {
    const pathname = usePathname();
    const isMobileNavOpen = useLayoutStore((state) => state.isMobileNavOpen);
    const setIsMobileNavOpen = useLayoutStore((state) => state.setIsMobileNavOpen);

    useEffect(() => {
        setIsMobileNavOpen(false);
    }, [pathname, setIsMobileNavOpen]);

    if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
        return null;
    }

    return (
        <div
            className={`${isMobileNavOpen ? "mobile:translate-x-0 mobile:opacity-100 mobile:pointer-events-auto" : "mobile:-translate-x-full mobile:opacity-0 mobile:pointer-events-none"} fixed top-0 left-0 z-50 h-[100dvh] bg-white transition-all duration-300 pc:translate-x-0 pc:opacity-100 pc:pointer-events-auto`}
        >
            <AdminSidebar />
        </div>
    );
}
