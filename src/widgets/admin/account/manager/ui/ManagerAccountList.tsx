"use client";

import type { ManagerAccount } from "@/entities/managerAccount/model/managerAccount.type";

type ManagerAccountListProps = {
    accounts: ManagerAccount[];
    selectedAccountId?: string;
    onSelectAccount: (account: ManagerAccount) => void;
    onCreateAccount: () => void;
};

export function ManagerAccountList({ accounts, selectedAccountId, onSelectAccount, onCreateAccount }: ManagerAccountListProps) {
    return (
        <div className="grid gap-4">
            <button
                className="min-h-11 rounded-lg bg-blue-600 px-4 font-bold text-white"
                onClick={onCreateAccount}
                type="button"
            >
                담당자 계정 생성
            </button>
            <div
                className="grid overflow-hidden rounded-lg border border-slate-200"
                role="table"
                aria-label="담당자 계정 목록"
            >
                <div
                    className="grid grid-cols-[1fr_1fr_1fr] bg-slate-50 font-bold max-[86rem]:grid-cols-1"
                    role="row"
                >
                    <span className="px-4 py-3.5 text-slate-700" role="columnheader">이름</span>
                    <span className="px-4 py-3.5 text-slate-700" role="columnheader">권한</span>
                    <span className="px-4 py-3.5 text-slate-700" role="columnheader">아이디</span>
                </div>
                {accounts.length ? (
                    accounts.map((account) => (
                        <button
                            className={`grid w-full grid-cols-[1fr_1fr_1fr] border-t border-slate-200 bg-white text-left transition hover:bg-slate-50 max-[86rem]:grid-cols-1 ${selectedAccountId === account.id ? "bg-blue-50" : ""}`}
                            key={account.id}
                            onClick={() => onSelectAccount(account)}
                            type="button"
                        >
                            <span className="px-4 py-3.5 text-slate-800">{account.name}</span>
                            <span className="px-4 py-3.5 text-slate-700">{account.role}</span>
                            <span className="px-4 py-3.5 text-slate-700">{account.login_id}</span>
                        </button>
                    ))
                ) : (
                    <div className="grid grid-cols-[1fr_1fr_1fr] border-t border-slate-200 max-[86rem]:grid-cols-1">
                        <span className="px-4 py-3.5 text-slate-500">등록된 계정이 없습니다.</span>
                        <span className="px-4 py-3.5 text-slate-500">-</span>
                        <span className="px-4 py-3.5 text-slate-500">-</span>
                    </div>
                )}
            </div>
        </div>
    );
}
