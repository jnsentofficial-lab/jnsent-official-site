"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { ManagerAccount } from "@/entities/managerAccount/model/managerAccount.type";
import { useManagerAccountsQuery } from "@/entities/managerAccount/api/managerAccount.query";

import { ManagerAccountList } from "@/widgets/admin/account/manager/ui/ManagerAccountList";
import { useAdminSidePanelStore } from "@/widgets/admin/shared/model/useAdminSidePanelStore";
import { ManagerAccountSidebar } from "@/widgets/admin/account/manager/ui/ManagerAccountSidebar";
import { AdminSidePanel, AdminTwoPanel, AdminWorkspace } from "@/widgets/admin/shared/AdminLayout";

import Portal from "@/shared/ui/kit/Portal";

type SidebarMode = "create" | "edit" | "empty";
const PANEL_KEY = "/admin/account/manager";

export function Analysis() {
    const { data: accounts = [], isLoading } = useManagerAccountsQuery();

    const [selectedAccount, setSelectedAccount] = useState<ManagerAccount | null>(null);
    const [sidebarMode, setSidebarMode] = useState<SidebarMode>("empty");

    const openPanel = useAdminSidePanelStore((state) => state.openPanel);
    const closePanel = useAdminSidePanelStore((state) => state.closePanel);

    useEffect(() => {
        closePanel(PANEL_KEY);
    }, [closePanel]);

    return (
        <AdminWorkspace>
            <AdminTwoPanel
                panelKey={PANEL_KEY}
                current="관리자 계정 관리"
                title="관리자 계정 관리"
                action={
                    <button
                        className="absolute bottom-[1.6rem] right-[1.6rem] bg-black hover:bg-[var(--adaptive-blue500)] cursor-pointer flex flex-col justify-center items-center gap-[1.2rem] h-[5.8rem] w-[5.8rem] rounded-full z-100 shadow-[0_0_50px_0_var(--adaptive-black500)]"
                        onClick={() => {
                            setSelectedAccount(null);
                            setSidebarMode("create");
                            openPanel(PANEL_KEY);
                        }}
                        type="button"
                    >
                        <Image
                            src={"/images/icon/outlined/ico-outlined-edit.svg"}
                            alt=""
                            width={32}
                            height={32}
                            className="invert"
                        />
                    </button>
                    // <Portal portal={["mobile"]}>
                    // </Portal>
                }
                left={
                    <>
                        {isLoading ? (
                            <p className="m-0 text-2xl font-[700] text-[var(--adaptiveGrey500)]">계정을 불러오는 중입니다.</p>
                        ) : (
                            <ManagerAccountList
                                accounts={accounts}
                                selectedAccountId={selectedAccount?.id}
                                onSelectAccount={(account) => {
                                    setSelectedAccount(account);
                                    setSidebarMode("edit");
                                    openPanel(PANEL_KEY);
                                }}
                            />
                        )}
                    </>
                }
                right={
                    <AdminSidePanel title={"생성하기"}>
                        <ManagerAccountSidebar
                            account={selectedAccount}
                            mode={sidebarMode}
                            onSaved={(account) => {
                                setSelectedAccount(account);
                                setSidebarMode("edit");
                                closePanel(PANEL_KEY);
                            }}
                        />
                    </AdminSidePanel>
                }
            />
        </AdminWorkspace>
    );
}
