"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAdminSessionQuery } from "@/entities/auth/api/auth.query";

type AdminAuthGuardProps = {
    children: ReactNode;
};

const adminLoginPath = "/admin/login";
const adminDefaultPath = "/admin/inquiries";

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPath = pathname === adminLoginPath;
    const isAdminPath = pathname.startsWith("/admin");
    const { data, isError, isLoading } = useAdminSessionQuery();

    useEffect(() => {
        if (!isAdminPath) {
            return;
        }

        if (isLoading) {
            return;
        }

        const isAdmin = data?.isAdmin === true && !isError;

        if (!isAdmin && !isLoginPath) {
            router.replace(adminLoginPath);
            return;
        }

        if (isAdmin && isLoginPath) {
            router.replace(adminDefaultPath);
        }
    }, [data?.isAdmin, isAdminPath, isError, isLoading, isLoginPath, router]);

    return children;
}
