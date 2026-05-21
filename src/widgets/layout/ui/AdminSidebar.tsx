"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLogoutAdminMutation } from "@/entities/auth/api/auth.query";
import UI from "@/shared/ui/UIComponent";

const adminNavItems = [
    { href: "/admin/inquiries", label: "문의 관리" },
    { href: "/admin/account/manager", label: "관리자 계정 관리" },
    { href: "/admin/modals", label: "팝업 관리" },
    { href: "/admin/news", label: "뉴스 관리" },
];

export function AdminSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const logoutAdmin = useLogoutAdminMutation();

    async function handleLogout() {
        await logoutAdmin.mutateAsync();
        router.replace("/admin/login");
        router.refresh();
    }

    return (
        <aside className="flex h-full flex-col border-r border-[var(--adaptiveGrey200)] bg-white px-6 py-8 max-[86rem]:border-r-0 max-[86rem]:border-b">
            <div className="mb-10 flex items-center gap-4">
                <strong className="text-5xl font-black leading-none text-black">JNS</strong>
                <div>
                    <p className="m-0 text-xl font-black text-black">JNS 님</p>
                    <p className="m-0 mt-1 text-base font-semibold text-[var(--adaptiveGrey600)]">제이엔에스 관리자</p>
                </div>
            </div>
            <nav
                className="grid gap-9 text-2xl font-black max-[86rem]:grid-cols-2 max-[86rem]:gap-4"
                aria-label="관리자 메뉴"
            >
                {adminNavItems.map((item) => (
                    <UI.Link
                        className={`${pathname === item.href ? "text-[var(--adaptiveRed300)]" : "text-black"} hover:text-[var(--adaptiveRed300)]`}
                        href={item.href}
                        key={item.href}
                    >
                        {item.label}
                    </UI.Link>
                ))}
            </nav>
            <UI.Button
                className="mt-auto flex min-h-16 items-center justify-start bg-white text-2xl font-black text-black hover:text-[var(--adaptiveRed500)] max-[86rem]:mt-8"
                onClick={handleLogout}
                type="button"
            >
                로그아웃
            </UI.Button>
        </aside>
    );
}
