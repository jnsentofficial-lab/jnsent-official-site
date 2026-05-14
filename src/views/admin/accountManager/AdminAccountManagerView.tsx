"use client";

import { useState } from "react";
import { useManagerAccountsQuery } from "@/entities/managerAccount/api/managerAccount.query";
import type { ManagerAccount } from "@/entities/managerAccount/model/managerAccount.type";
import { AdminHeader } from "@/widgets/adminHeader/AdminHeader";
import { AdminSidebar } from "@/widgets/adminSidebar/AdminSidebar";
import { ManagerAccountList } from "@/widgets/managerAccount/ManagerAccountList";
import { ManagerAccountSidebar } from "@/widgets/managerAccount/ManagerAccountSidebar";

type SidebarMode = "create" | "edit" | "empty";

export function AdminAccountManagerView() {
    const { data: accounts = [], isLoading } = useManagerAccountsQuery();
    const [selectedAccount, setSelectedAccount] = useState<ManagerAccount | null>(null);
    const [sidebarMode, setSidebarMode] = useState<SidebarMode>("empty");

    function handleSelectAccount(account: ManagerAccount) {
        setSelectedAccount(account);
        setSidebarMode("edit");
    }

    function handleCreateAccount() {
        setSelectedAccount(null);
        setSidebarMode("create");
    }

    function handleSaved(account: ManagerAccount) {
        setSelectedAccount(account);
        setSidebarMode("edit");
    }

    return (
        <main className="grid min-h-screen grid-cols-[24rem_minmax(0,1fr)] bg-slate-100 max-[86rem]:grid-cols-1">
            <AdminSidebar />
            <section className="p-8 max-[86rem]:px-4 max-[86rem]:py-6">
                <AdminHeader
                    description="담당자 계정을 생성하고 권한과 로그인 정보를 관리합니다."
                    title="담당자 계정 관리"
                />
                <div className="grid grid-cols-[minmax(0,1fr)_38rem] gap-6 max-[120rem]:grid-cols-1">
                    <section className="rounded-lg border border-slate-200 bg-white p-6">
                        <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">계정 목록</h2>
                        {isLoading ? (
                            <p className="m-0 text-slate-500">계정을 불러오는 중입니다.</p>
                        ) : (
                            <ManagerAccountList
                                accounts={accounts}
                                selectedAccountId={selectedAccount?.id}
                                onCreateAccount={handleCreateAccount}
                                onSelectAccount={handleSelectAccount}
                            />
                        )}
                    </section>
                    <ManagerAccountSidebar
                        account={selectedAccount}
                        mode={sidebarMode}
                        onSaved={handleSaved}
                    />
                </div>
            </section>
        </main>
    );
}
