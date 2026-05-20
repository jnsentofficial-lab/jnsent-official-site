"use client";

import { FormEvent, useEffect, useState } from "react";
import { useCreateManagerAccountMutation, useUpdateManagerAccountMutation } from "@/entities/managerAccount/api/managerAccount.query";
import type { ManagerAccount, ManagerAccountRole } from "@/entities/managerAccount/model/managerAccount.type";

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
    const isCreateMode = mode === "create";
    const isEditMode = mode === "edit" && account;
    const isPending = createAccount.isPending || updateAccount.isPending;

    useEffect(() => {
        setName(account?.name ?? "");
        setRole(account?.role ?? "manager");
        setLoginId(account?.login_id ?? "");
    }, [account]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
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

        event.currentTarget.reset();
        onSaved(response.result);
    }

    if (mode === "empty") {
        return (
            <aside className="rounded-lg border border-slate-200 bg-white p-6 text-slate-500">
                계정을 선택하거나 담당자 계정 생성을 눌러 등록을 시작하세요.
            </aside>
        );
    }

    return (
        <aside className="sticky top-6 rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-5">
                <p className="m-0 text-sm font-bold text-blue-700">{isCreateMode ? "계정 생성" : "계정 편집"}</p>
                <h2 className="mt-1 mb-0 text-xl text-slate-900">{isCreateMode ? "새 담당자 계정" : account?.name}</h2>
            </div>
            <form
                className="grid gap-3.5"
                onSubmit={(event) => {
                    void handleSubmit(event);
                }}
            >
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                    이름
                    <input
                        className="min-h-11 rounded-lg border border-slate-300 px-3"
                        onChange={(event) => setName(event.target.value)}
                        placeholder="담당자 이름"
                        required
                        type="text"
                        value={name}
                    />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                    권한
                    <select
                        className="min-h-11 rounded-lg border border-slate-300 px-3"
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
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                    아이디
                    <input
                        className="min-h-11 rounded-lg border border-slate-300 px-3"
                        onChange={(event) => setLoginId(event.target.value)}
                        placeholder="login-id"
                        required
                        type="text"
                        value={loginId}
                    />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                    비밀번호
                    <input
                        className="min-h-11 rounded-lg border border-slate-300 px-3"
                        name="password"
                        placeholder={isEditMode ? "변경 시에만 입력" : "비밀번호"}
                        required={isCreateMode}
                        type="password"
                    />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                    비밀번호 재입력
                    <input
                        className="min-h-11 rounded-lg border border-slate-300 px-3"
                        name="passwordConfirm"
                        placeholder={isEditMode ? "변경 시에만 입력" : "비밀번호 재입력"}
                        required={isCreateMode}
                        type="password"
                    />
                </label>
                <button
                    className="mt-2 min-h-11 rounded-lg bg-blue-600 px-4 font-bold text-white disabled:bg-slate-300"
                    disabled={isPending}
                    type="submit"
                >
                    {isPending ? "저장 중" : "등록하기"}
                </button>
            </form>
        </aside>
    );
}
