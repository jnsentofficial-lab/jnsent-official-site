"use client";

import type { ManagerAccount } from "@/entities/managerAccount/model/managerAccount.type";
import UI from "@/shared/ui/UIComponent";
import { AdminPagination } from "@/widgets/admin/shared/AdminLayout";
import Image from "next/image";
import { Fragment, useState } from "react";

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
        <div className="flex flex-col">
            {accounts.length ? (
                visibleAccounts.map((account, mappedIdx) => (
                    <Fragment key={account.id}>
                        <UI.Button
                            className={`${selectedAccountId === account.id ? "text-[var(--adaptive-red500)]" : ""} flex justify-between transition hover:bg-white py-[2.4rem]`}
                            onClick={() => onSelectAccount(account)}
                            type="button"
                        >
                            <section className="flex gap-[1.2rem] flex-col items-start flex-1">
                                <h6 className="text-[2.0rem]">{account.login_id}</h6>

                                <div className="text-[var(--adaptive-black300)] text-[1.4rem]">
                                    {account.name} <span className="mx-3">|</span> {account.role} <span className="mx-3">|</span>{" "}
                                    {new Intl.DateTimeFormat("ko-KR").format(new Date(account.created_at))} 생성
                                </div>
                            </section>

                            <section className="">
                                <Image
                                    src={"/images/icon/outlined/ico-outlined-trash.svg"}
                                    alt=""
                                    width={32}
                                    height={32}
                                />

                                <p>삭제</p>
                            </section>
                        </UI.Button>

                        {mappedIdx + 1 !== visibleAccounts.length ? <div className="h-[0.1rem] w-full bg-[var(--adaptive-grey300)]" /> : null}
                    </Fragment>
                ))
            ) : (
                <p className="py-16 text-2xl font-black text-[var(--adaptiveGrey500)]">등록된 계정이 없습니다.</p>
            )}
            <AdminPagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
            />
        </div>
    );
}
