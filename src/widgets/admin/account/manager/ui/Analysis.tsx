"use client";

import { useState } from "react";
import { useManagerAccountsQuery } from "@/entities/managerAccount/api/managerAccount.query";
import type { ManagerAccount } from "@/entities/managerAccount/model/managerAccount.type";
import UI from "@/shared/ui/UIComponent";
import { AdminTwoPanel, AdminWorkspace } from "@/widgets/admin/shared/AdminLayout";
import { ManagerAccountList } from "@/widgets/admin/account/manager/ui/ManagerAccountList";
import { ManagerAccountSidebar } from "@/widgets/admin/account/manager/ui/ManagerAccountSidebar";

type SidebarMode = "create" | "edit" | "empty";

export function Analysis() {
    const { data: accounts = [], isLoading } = useManagerAccountsQuery();
    const [selectedAccount, setSelectedAccount] = useState<ManagerAccount | null>(null);
    const [sidebarMode, setSidebarMode] = useState<SidebarMode>("empty");

    return (
        <AdminWorkspace>
            <AdminTwoPanel
                current="관리자 계정 관리"
                title="관리자 계정 관리"
                action={
                    <UI.Button
                        onClick={() => {
                            setSelectedAccount(null);
                            setSidebarMode("create");
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
                                }}
                            />
                        )}
                    </>
                }
                right={
                    <ManagerAccountSidebar
                        account={selectedAccount}
                        mode={sidebarMode}
                        onSaved={(account) => {
                            setSelectedAccount(account);
                            setSidebarMode("edit");
                        }}
                    />
                }
            />
        </AdminWorkspace>
    );
}
