"use client";

import { useState } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/widgets/layout/ui";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import { ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";

export function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isMainConfirmOpen, setIsMainConfirmOpen] = useState(false);
    const isMobileNavOpen = useLayoutStore((state) => state.isMobileNavOpen);
    const setIsMobileNavOpen = useLayoutStore((state) => state.setIsMobileNavOpen);

    useEffect(() => {
        setIsMobileNavOpen(false);
    }, [pathname, setIsMobileNavOpen]);

    if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
        return null;
    }

    return (
        <>
            <div
                className={`${isMobileNavOpen ? "mobile:translate-x-0 mobile:opacity-100 mobile:pointer-events-auto" : "mobile:-translate-x-full mobile:opacity-0 mobile:pointer-events-none"} fixed top-0 left-0 z-50 h-[100dvh] bg-white transition-all duration-300 pc:translate-x-0 pc:opacity-100 pc:pointer-events-auto`}
            >
                <AdminSidebar onMainNavigationClick={() => setIsMainConfirmOpen(true)} />
            </div>

            <ConfirmDialog
                open={isMainConfirmOpen}
                title="메인으로 돌아갈까요?"
                description="관리자 페이지를 나가서 메인 화면으로 이동합니다."
                confirmLabel="이동하기"
                tone="create"
                onCancel={() => setIsMainConfirmOpen(false)}
                onConfirm={() => {
                    setIsMainConfirmOpen(false);
                    setIsMobileNavOpen(false);
                    router.push("/");
                }}
            />
        </>
    );
}
