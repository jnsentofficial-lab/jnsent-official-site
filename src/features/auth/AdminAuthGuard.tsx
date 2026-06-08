"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAdminSessionQuery } from "@/entities/auth/api/auth.query";

type AdminAuthGuardProps = {
    children: ReactNode;
};

const adminLoginPath = "/admin/login";
const adminDefaultPath = "/admin/inquiries";

function resolveRedirectPath(pathname: string, searchParams: URLSearchParams) {
    const redirectPath = searchParams.get("redirect");

    if (pathname === adminLoginPath) {
        return redirectPath?.startsWith("/admin") ? redirectPath : adminDefaultPath;
    }

    const queryString = searchParams.toString();
    return `${pathname}${queryString ? `?${queryString}` : ""}`;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
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
            router.replace(`${adminLoginPath}?redirect=${encodeURIComponent(resolveRedirectPath(pathname, searchParams))}`);
            return;
        }

        if (isAdmin && isLoginPath) {
            router.replace(resolveRedirectPath(pathname, searchParams));
        }
    }, [data?.isAdmin, isAdminPath, isError, isLoading, isLoginPath, pathname, router, searchParams]);

    if (isAdminPath && !isLoginPath && isLoading) {
        return <div className="flex min-h-[100dvh] items-center justify-center text-[1.6rem] font-[700] text-[var(--adaptive-grey500)]">관리자 정보를 불러오는 중입니다.</div>;
    }

    return children;
}
