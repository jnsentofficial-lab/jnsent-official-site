"use client";

import { useDeleteManagerAccountMutation } from "@/entities/managerAccount/api/managerAccount.query";
import type { ManagerAccount } from "@/entities/managerAccount/model/managerAccount.type";
import { Text } from "@/shared/ui/kit/Text";
import UI from "@/shared/ui/UIComponent";
import { AdminPagination, ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";
import Image from "next/image";
import { Fragment, useState } from "react";

type ManagerAccountListProps = {
    accounts: ManagerAccount[];
    selectedAccountId?: string;
    onSelectAccount: (account: ManagerAccount) => void;
};

export function ManagerAccountList({ accounts, selectedAccountId, onSelectAccount }: ManagerAccountListProps) {
    const [page, setPage] = useState(1);
    const [deleteTarget, setDeleteTarget] = useState<ManagerAccount | null>(null);
    const deleteAccount = useDeleteManagerAccountMutation();
    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(accounts.length / pageSize));
    const visibleAccounts = accounts.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="flex flex-col">
            {accounts.length ? (
                visibleAccounts.map((account, mappedIdx) => {
                    const SELECTED = selectedAccountId === account.id;

                    return (
                        <Fragment key={account.id}>
                            <section className="flex items-center justify-between h-[9.2rem]">
                                <UI.Button
                                    className={`${SELECTED ? "text-[var(--adaptive-red500)]" : ""} flex flex-col justify-center items-start gap-[1.2rem] transition hover:bg-white h-full flex-1`}
                                    onClick={() => onSelectAccount(account)}
                                    type="button"
                                >
                                    {SELECTED ? (
                                        <Text.Shimmer
                                            color={{
                                                start: "#780B12",
                                                end: "#FF6B75",
                                            }}
                                            duration={4}
                                            className="text-[2.0rem]"
                                        >
                                            {account.login_id}
                                        </Text.Shimmer>
                                    ) : (
                                        <h6 className="text-[2.0rem]">{account.login_id}</h6>
                                    )}

                                    <p className="text-[var(--adaptive-black500)] text-[1.4rem]">
                                        {account.name} <span className="mx-3">|</span> {account.role} <span className="mx-3">|</span>{" "}
                                        {new Intl.DateTimeFormat("ko-KR").format(new Date(account.created_at))} 생성
                                    </p>
                                </UI.Button>

                                <UI.Button
                                    className="h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                    onClick={() => setDeleteTarget(account)}
                                    type="button"
                                >
                                    <Image
                                        src={"/images/icon/outlined/ico-outlined-trash.svg"}
                                        alt=""
                                        width={32}
                                        height={32}
                                    />

                                    <p>삭제</p>
                                </UI.Button>
                            </section>

                            {mappedIdx + 1 !== visibleAccounts.length ? <div className="h-[0.1rem] w-full bg-[var(--adaptive-grey200)]" /> : null}
                        </Fragment>
                    );
                })
            ) : (
                <p className="py-16 text-2xl font-[700] text-[var(--adaptiveGrey500)]">등록된 계정이 없습니다.</p>
            )}

            <AdminPagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
            />

            <ConfirmDialog
                open={Boolean(deleteTarget)}
                title="선택한 계정을 삭제 할까요?"
                description="선택하신 계정을 삭제합니다. 신중하게 선택해주세요."
                targetLabel={deleteTarget?.login_id}
                confirmLabel="삭제하기"
                tone="delete"
                onCancel={() => setDeleteTarget(null)}
                onConfirm={() => {
                    if (deleteTarget) {
                        deleteAccount.mutate({ id: deleteTarget.id });
                    }
                    setDeleteTarget(null);
                }}
            />
        </div>
    );
}
