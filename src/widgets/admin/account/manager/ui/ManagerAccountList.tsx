"use client";

import { useEffect, useState } from "react";
import { useAdminSessionQuery } from "@/entities/auth/api/auth.query";
import { useDeleteManagerAccountMutation } from "@/entities/managerAccount/api/managerAccount.query";
import type { ManagerAccount } from "@/entities/managerAccount/model/managerAccount.type";
import { canEditManagerAccount, getManagerAccountRoleLabel, isReservedMasterLoginId } from "@/shared/lib/AdminAccountAuth";
import { Text } from "@/shared/ui/kit/Text";
import UI from "@/shared/ui/UIComponent";
import { AdminListRow, AdminListSection, AdminPagination, ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";
import { useAdminSidePanelStore } from "@/widgets/admin/shared/model/useAdminSidePanelStore";
import Image from "next/image";
import { Fragment } from "react";

type ManagerAccountListProps = {
    accounts: ManagerAccount[];
    selectedAccountId?: string;
    onSelectAccount: (account: ManagerAccount) => void;
};

export function ManagerAccountList({ accounts, selectedAccountId, onSelectAccount }: ManagerAccountListProps) {
    const [page, setPage] = useState(1);
    const [deleteTarget, setDeleteTarget] = useState<ManagerAccount | null>(null);
    const { data: session } = useAdminSessionQuery();
    const deleteAccount = useDeleteManagerAccountMutation();
    const pageSize = useAdminSidePanelStore((state) => state.listPageSize);
    const totalPages = Math.max(1, Math.ceil(accounts.length / pageSize));
    const visibleAccounts = accounts.slice((page - 1) * pageSize, page * pageSize);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    return (
        <AdminListSection
            empty={<p className="py-16 text-2xl font-[700] text-[var(--adaptiveGrey500)]">등록된 계정이 없습니다.</p>}
            hasItems={accounts.length > 0}
            pagination={
                <AdminPagination
                    page={page}
                    totalPages={totalPages}
                    onChange={setPage}
                />
            }
        >
            {visibleAccounts.map((account, mappedIdx) => {
                const SELECTED = selectedAccountId === account.id;
                const canDelete = canEditManagerAccount(session?.role, account.role) && !isReservedMasterLoginId(account.login_id);

                return (
                    <Fragment key={account.id}>
                        <AdminListRow
                            actions={
                                <UI.Button
                                    className="flex items-center h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                    disabled={!canDelete}
                                    onClick={() => setDeleteTarget(account)}
                                    type="button"
                                    tooltip={[
                                        {
                                            type: "disabled",
                                            msg: isReservedMasterLoginId(account.login_id) ? "마스터 계정은 삭제할 수 없습니다." : "삭제 권한이 없는 계정입니다.",
                                        },
                                    ]}
                                >
                                    <Image
                                        src={"/images/icon/outlined/ico-outlined-trash.svg"}
                                        alt=""
                                        width={24}
                                        height={24}
                                    />

                                    <p className="mobile:text-[var(--adaptive-red500)] pc:text-black">삭제</p>
                                </UI.Button>
                            }
                            contentClassName="flex-col items-start"
                            description={
                                <p className="text-[var(--adaptive-black500)] text-[1.4rem]">
                                    {account.name} <span className="mx-3">|</span> {getManagerAccountRoleLabel(account.role)} <span className="mx-3">|</span>{" "}
                                    {account.is_active ? "활성" : "비활성"} <span className="mx-3">|</span> {new Intl.DateTimeFormat("ko-KR").format(new Date(account.created_at))} 생성
                                </p>
                            }
                            onClick={() => onSelectAccount(account)}
                            selected={SELECTED}
                            title={
                                SELECTED ? (
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
                                )
                            }
                        />

                        {mappedIdx + 1 !== visibleAccounts.length ? <div className="h-[0.1rem] w-full bg-[var(--adaptive-grey200)]" /> : null}
                    </Fragment>
                );
            })}

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
        </AdminListSection>
    );
}
