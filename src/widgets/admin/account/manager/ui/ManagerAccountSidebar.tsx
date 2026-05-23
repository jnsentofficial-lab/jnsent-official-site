"use client";

import { FormEvent, useEffect, useState } from "react";
import { useCreateManagerAccountMutation, useDeleteManagerAccountMutation, useUpdateManagerAccountMutation } from "@/entities/managerAccount/api/managerAccount.query";
import type { ManagerAccount, ManagerAccountRole } from "@/entities/managerAccount/model/managerAccount.type";
import { ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";

type ManagerAccountSidebarProps = {
    account: ManagerAccount | null;
    mode: "create" | "edit" | "empty";
    onSaved: (account: ManagerAccount) => void;
};

const roles: ManagerAccountRole[] = ["manager", "admin", "viewer"];

export function ManagerAccountSidebar({ account, mode, onSaved }: ManagerAccountSidebarProps) {
    const [name, setName] = useState("");
    const [role, setRole] = useState<ManagerAccountRole>("manager");
    const [loginId, setLoginId] = useState("");
    const createAccount = useCreateManagerAccountMutation();
    const updateAccount = useUpdateManagerAccountMutation();
    const deleteAccount = useDeleteManagerAccountMutation();
    const [confirm, setConfirm] = useState<"create" | "delete" | null>(null);
    const [pendingForm, setPendingForm] = useState<HTMLFormElement | null>(null);
    const isCreateMode = mode === "create";
    const isEditMode = mode === "edit" && account;
    const isPending = createAccount.isPending || updateAccount.isPending;

    useEffect(() => {
        setName(account?.name ?? "");
        setRole(account?.role ?? "manager");
        setLoginId(account?.login_id ?? "");
    }, [account]);

    async function saveAccount(form: HTMLFormElement) {
        const formData = new FormData(form);
        const payload = {
            id: account?.id,
            name,
            role,
            login_id: loginId,
            password: String(formData.get("password") ?? ""),
            password_confirm: String(formData.get("passwordConfirm") ?? ""),
        };
        const response = isCreateMode
            ? await createAccount.mutateAsync(payload)
            : await updateAccount.mutateAsync(payload);

        form.reset();
        onSaved(response.result);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isCreateMode) {
            setPendingForm(event.currentTarget);
            setConfirm("create");
            return;
        }

        await saveAccount(event.currentTarget);
    }

    if (mode === "empty") {
        return (
            <aside className="p-12 text-2xl font-black text-[var(--adaptiveGrey500)]">
                계정을 선택하거나 담당자 계정 생성을 눌러 등록을 시작하세요.
            </aside>
        );
    }

    return (
        <aside className="sticky top-0 max-h-screen overflow-auto p-12">
            <h2 className="mt-0 mb-12 text-4xl font-black text-black">{isCreateMode ? "관리자 계정 만들기" : "관리자 계정 편집"}</h2>
            <form
                className="grid gap-10"
                onSubmit={(event) => {
                    void handleSubmit(event);
                }}
            >
                <label className="grid gap-3 text-xl font-black text-black">
                    이름
                    <input
                        className="h-14 border border-black px-4 text-lg font-semibold"
                        onChange={(event) => setName(event.target.value)}
                        placeholder="담당자 이름"
                        required
                        type="text"
                        value={name}
                    />
                </label>
                <label className="grid gap-3 text-xl font-black text-black">
                    권한
                    <select
                        className="h-14 border border-black px-4 text-lg font-semibold"
                        onChange={(event) => setRole(event.target.value as ManagerAccountRole)}
                        value={role}
                    >
                        {roles.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="grid gap-3 text-xl font-black text-black">
                    아이디
                    <input
                        className="h-14 border border-black px-4 text-lg font-semibold"
                        onChange={(event) => setLoginId(event.target.value)}
                        placeholder="login-id"
                        required
                        type="text"
                        value={loginId}
                    />
                </label>
                <label className="grid gap-3 text-xl font-black text-black">
                    비밀번호
                    <input
                        className="h-14 border border-black px-4 text-lg font-semibold"
                        name="password"
                        placeholder={isEditMode ? "변경 시에만 입력" : "비밀번호"}
                        required={isCreateMode}
                        type="password"
                    />
                </label>
                <label className="grid gap-3 text-xl font-black text-black">
                    비밀번호 재입력
                    <input
                        className="h-14 border border-black px-4 text-lg font-semibold"
                        name="passwordConfirm"
                        placeholder={isEditMode ? "변경 시에만 입력" : "비밀번호 재입력"}
                        required={isCreateMode}
                        type="password"
                    />
                </label>
                <button
                    className="fixed right-0 bottom-0 min-h-16 w-[calc((100vw-24rem)*0.42)] bg-black px-4 text-xl font-black text-white disabled:bg-[var(--adaptiveGrey400)] max-[120rem]:static max-[120rem]:w-full"
                    disabled={isPending}
                    type="submit"
                >
                    {isPending ? "저장 중" : "등록하기"}
                </button>
                {isEditMode ? (
                    <button
                        className="min-h-14 border border-[var(--adaptiveRed500)] text-lg font-black text-[var(--adaptiveRed500)]"
                        onClick={() => setConfirm("delete")}
                        type="button"
                    >
                        삭제하기
                    </button>
                ) : null}
            </form>
            <ConfirmDialog
                open={confirm === "create"}
                title="입력하신 계정으로 생성할까요?"
                description="입력하신 계정으로 계정을 생성할게요."
                targetLabel={loginId}
                confirmLabel="생성하기"
                tone="create"
                onCancel={() => setConfirm(null)}
                onConfirm={() => {
                    if (pendingForm) {
                        void saveAccount(pendingForm);
                    }
                    setConfirm(null);
                }}
            />
            <ConfirmDialog
                open={confirm === "delete"}
                title="선택한 계정을 삭제 할까요?"
                description="선택하신 계정을 삭제합니다. 신중하게 선택해주세요."
                targetLabel={account?.login_id}
                confirmLabel="삭제하기"
                tone="delete"
                onCancel={() => setConfirm(null)}
                onConfirm={() => {
                    if (account) {
                        deleteAccount.mutate({ id: account.id });
                    }
                    setConfirm(null);
                }}
            />
        </aside>
    );
}
