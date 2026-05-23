"use client";

import type { ManagerAccount } from "@/entities/managerAccount/model/managerAccount.type";
import { AdminPagination } from "@/widgets/admin/shared/AdminLayout";
import { useState } from "react";

type ManagerAccountListProps = {
    accounts: ManagerAccount[];
    selectedAccountId?: string;
    onSelectAccount: (account: ManagerAccount) => void;
};

export function ManagerAccountList({ accounts, selectedAccountId, onSelectAccount }: ManagerAccountListProps) {
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(accounts.length / pageSize));
    const visibleAccounts = accounts.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="grid gap-0">
                {accounts.length ? (
                    visibleAccounts.map((account) => (
                        <button
                            className={`grid w-full grid-cols-[minmax(0,1fr)_14rem] items-center gap-6 border-b border-[var(--adaptiveGrey200)] py-8 text-left transition hover:bg-white max-[86rem]:grid-cols-1 ${selectedAccountId === account.id ? "text-[var(--adaptiveRed300)]" : "text-black"}`}
                            key={account.id}
                            onClick={() => onSelectAccount(account)}
                            type="button"
                        >
                            <span className="grid gap-4">
                                <span className="text-lg font-semibold text-black">{account.name} <span className="mx-3">|</span> {account.role} <span className="mx-3">|</span> {new Intl.DateTimeFormat("ko-KR").format(new Date(account.created_at))} 생성</span>
                                <strong className="text-3xl font-black">{account.login_id}</strong>
                            </span>
                            <span className="flex justify-end gap-8 text-center text-base font-black text-black">
                                <span>▱<br />삭제</span>
                                <span className="h-10 w-px bg-black" />
                                <span>□<br />편집</span>
                            </span>
                        </button>
                    ))
                ) : (
                    <p className="py-16 text-2xl font-black text-[var(--adaptiveGrey500)]">등록된 계정이 없습니다.</p>
                )}
            <AdminPagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
    );
}
