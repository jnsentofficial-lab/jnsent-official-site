"use client";

import { useEffect, useState } from "react";
import { useManagerAccountsQuery } from "@/entities/managerAccount/api/managerAccount.query";
import type { ManagerAccount } from "@/entities/managerAccount/model/managerAccount.type";
import UI from "@/shared/ui/UIComponent";
import { AdminSidePanel, AdminTwoPanel, AdminWorkspace } from "@/widgets/admin/shared/AdminLayout";
import { ManagerAccountList } from "@/widgets/admin/account/manager/ui/ManagerAccountList";
import { ManagerAccountSidebar } from "@/widgets/admin/account/manager/ui/ManagerAccountSidebar";
import { useAdminSidePanelStore } from "@/widgets/admin/shared/model/useAdminSidePanelStore";

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
                    <UI.Button
                        size="sm"
                        className="bg-black text-white px-[1.2rem]"
                        onClick={() => {
                            setSelectedAccount(null);
                            setSidebarMode("create");
                            openPanel(PANEL_KEY);
                        }}
                        type="button"
                    >
                        + 생성하기
                    </UI.Button>
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
