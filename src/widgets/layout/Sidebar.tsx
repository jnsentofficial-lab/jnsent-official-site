"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/widgets/layout/ui";

export function Sidebar() {
    const pathname = usePathname();

    if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 h-[100dvh]">
            {/* <div className="fixed top-0 left-0 z-40 h-screen w-[24rem] max-[86rem]:static max-[86rem]:h-auto max-[86rem]:w-full"> */}
            <AdminSidebar />
        </div>
    );
}
