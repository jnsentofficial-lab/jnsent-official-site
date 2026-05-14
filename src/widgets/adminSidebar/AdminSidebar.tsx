"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogoutAdminMutation } from "@/entities/auth/api/auth.query";
import UI from "@/shared/ui/UIComponent";

const adminNavItems = [
    { href: "/admin/dashboard", label: "대시보드" },
    { href: "/admin/banners", label: "메인 배너" },
    { href: "/admin/pages", label: "페이지 콘텐츠" },
    { href: "/admin/news", label: "NEWS" },
    { href: "/admin/inquiries", label: "문의" },
    { href: "/admin/account/manager", label: "담당자 계정" },
    { href: "/admin/uploads", label: "이미지" },
    { href: "/admin/modals", label: "전역 모달" },
];

export function AdminSidebar() {
    const router = useRouter();
    const logoutAdmin = useLogoutAdminMutation();

    async function handleLogout() {
        await logoutAdmin.mutateAsync();
        router.replace("/admin/login");
        router.refresh();
    }

    return (
        <aside className="border-r border-slate-200 bg-white px-5 py-7 max-[86rem]:border-r-0 max-[86rem]:border-b">
            <strong className="mb-7 block text-xl text-slate-900">Admin</strong>
            <nav
                className="grid gap-1.5 max-[86rem]:grid-cols-2"
                aria-label="관리자 메뉴"
            >
                {adminNavItems.map((item) => (
                    <UI.Link
                        className="rounded-lg px-3.5 py-3 font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                        href={item.href}
                        key={item.href}
                    >
                        {item.label}
                    </UI.Link>
                ))}
            </nav>
            <UI.Button
                className="mt-6 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 font-bold text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700 max-[86rem]:mt-4"
                onClick={handleLogout}
                type="button"
            >
                로그아웃
            </UI.Button>
        </aside>
    );
}
