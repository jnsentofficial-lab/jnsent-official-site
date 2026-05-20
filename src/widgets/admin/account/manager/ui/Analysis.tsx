"use client";

import { useState } from "react";
import { useManagerAccountsQuery } from "@/entities/managerAccount/api/managerAccount.query";
import type { ManagerAccount } from "@/entities/managerAccount/model/managerAccount.type";
import { ManagerAccountList } from "@/widgets/admin/account/manager/ui/ManagerAccountList";
import { ManagerAccountSidebar } from "@/widgets/admin/account/manager/ui/ManagerAccountSidebar";

type SidebarMode = "create" | "edit" | "empty";

export function Analysis() {
    const { data: accounts = [], isLoading } = useManagerAccountsQuery();
    const [selectedAccount, setSelectedAccount] = useState<ManagerAccount | null>(null);
    const [sidebarMode, setSidebarMode] = useState<SidebarMode>("empty");

    return (
        <div className="grid grid-cols-[minmax(0,1fr)_38rem] gap-6 max-[120rem]:grid-cols-1">
            <section className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">계정 목록</h2>
                {isLoading ? (
                    <p className="m-0 text-slate-500">계정을 불러오는 중입니다.</p>
                ) : (
                    <ManagerAccountList
                        accounts={accounts}
                        selectedAccountId={selectedAccount?.id}
                        onCreateAccount={() => {
                            setSelectedAccount(null);
                            setSidebarMode("create");
                        }}
                        onSelectAccount={(account) => {
                            setSelectedAccount(account);
                            setSidebarMode("edit");
                        }}
                    />
                )}
            </section>
            <ManagerAccountSidebar
                account={selectedAccount}
                mode={sidebarMode}
                onSaved={(account) => {
                    setSelectedAccount(account);
                    setSidebarMode("edit");
                }}
            />
        </div>
    );
}
