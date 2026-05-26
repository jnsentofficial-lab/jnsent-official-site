"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAdminSessionQuery, useLogoutAdminMutation } from "@/entities/auth/api/auth.query";
import UI from "@/shared/ui/UIComponent";
import Image from "next/image";
import { Shimmer } from "@/shared/ui/kit/Text/ui/Shimmer";
import { Text } from "@/shared/ui/kit/Text";

const adminNavItems = [
    { href: "/admin/inquiries", label: "문의 관리" },
    { href: "/admin/account/manager", label: "관리자 계정 관리", roles: ["manager", "admin"] },
    { href: "/admin/modals", label: "팝업 관리" },
    { href: "/admin/news", label: "뉴스 관리" },
] as const;

export function AdminSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const logoutAdmin = useLogoutAdminMutation();
    const { data: session } = useAdminSessionQuery();
    const canManageAccounts = session?.role === "admin" || session?.role === "manager";
    const navItems = adminNavItems.filter((item) => !("roles" in item) || canManageAccounts);

    async function handleLogout() {
        await logoutAdmin.mutateAsync();
        router.replace("/admin/login");
        router.refresh();
    }

    return (
        // <aside className="flex h-full flex-col border-r border-[var(--adaptiveGrey200)] bg-white px-6 py-8 max-[86rem]:border-r-0 max-[86rem]:border-b">
        <aside className="flex h-full flex-col">
            <section className="mb-10 flex items-center gap-4 p-[1.6rem]">
                <Image
                    src={"/images/common/ico-logo.svg"}
                    width={42}
                    height={42}
                    alt=""
                    // className={`${isNowDarkMode ? "invert" : ""}`}
                />
                <div className="flex flex-col">
                    <h6 className="font-[700]">{session?.name ?? "JNS"} 님</h6>
                    <h6 className="text-[1.4rem] text-[var(--adaptive-grey600)]">{session?.role ?? "관리자"}</h6>
                </div>
            </section>

            <nav
                className="flex flex-col gap-[1.6rem] w-[24rem] flex-1"
                // className="grid gap-9 text-2xl font-black max-[86rem]:grid-cols-2 max-[86rem]:gap-4"
                aria-label="관리자 메뉴"
            >
                {navItems.map((item) => {
                    const SELECTED = pathname === item.href;

                    return (
                        <UI.Linker
                            className={`${SELECTED ? "text-[var(--adaptive-red500)]" : "text-black"} hover:text-[var(--adaptiveRed300)] text-[2.0rem] px-[1.6rem]`}
                            href={item.href}
                            key={item.href}
                        >
                            {SELECTED ? (
                                <Text.Shimmer
                                    color={{
                                        start: "#780B12",
                                        end: "#FF6B75",
                                    }}
                                    duration={4}
                                >
                                    {item.label}
                                </Text.Shimmer>
                            ) : (
                                item.label
                            )}
                        </UI.Linker>
                    );
                })}
            </nav>

            <section className="w-[24rem]">
                <div className="h-[0.1rem] w-full bg-[var(--adaptive-grey100)]" />

                <UI.Linker
                    className="flex items-center gap-[0.4rem] px-[1.2rem] hover:bg-[var(--adaptive-grey200)] w-full"
                    href="/"
                >
                    <Image
                        src={"/images/icon/outlined/ico-outlined-arrow-single-up.svg"}
                        alt=""
                        width={18}
                        height={18}
                        className="rotate-270"
                    />

                    <p className="text-[2.0rem]">메인으로 돌아가기</p>
                </UI.Linker>

                <div className="h-[0.1rem] w-full bg-[var(--adaptive-grey100)]" />

                <UI.Button
                    className="flex items-center gap-[0.4rem] px-[1.2rem] hover:bg-[var(--adaptive-grey200)] w-full"
                    // className="mt-auto flex min-h-16 items-center justify-start bg-white text-2xl font-black text-black hover:text-[var(--adaptiveRed500)] max-[86rem]:mt-8"
                    onClick={handleLogout}
                    type="button"
                >
                    <Image
                        src={"/images/icon/outlined/ico-outlined-unlock.svg"}
                        alt=""
                        width={24}
                        height={24}
                    />

                    <p className="text-[2.0rem]">로그아웃</p>
                </UI.Button>
            </section>
        </aside>
    );
}
