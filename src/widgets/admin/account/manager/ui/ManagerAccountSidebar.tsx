"use client";

import { FormEvent, Fragment, useEffect, useState } from "react";
import { useCreateManagerAccountMutation, useDeleteManagerAccountMutation, useUpdateManagerAccountMutation } from "@/entities/managerAccount/api/managerAccount.query";
import type { ManagerAccount, ManagerAccountRole } from "@/entities/managerAccount/model/managerAccount.type";
import { ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";
import UI from "@/shared/ui/UIComponent";

type ManagerAccountSidebarProps = {
    account: ManagerAccount | null;
    mode: "create" | "edit" | "empty";
    onSaved: (account: ManagerAccount) => void;
};

const roles: ManagerAccountRole[] = ["manager", "admin", "viewer"];
const inputClassName = "h-[5.2rem] border border-[var(--adaptive-grey200)] hover:border-[var(--adaptive-grey700)] px-4 text-lg font-semibold";
const labelClassName = "flex flex-col gap-[0.8rem] font-[NanumSquare]";

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
        const response = isCreateMode ? await createAccount.mutateAsync(payload) : await updateAccount.mutateAsync(payload);

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
            <div className="flex justify-center items-center h-full">
                <p className="whitespace-break-spaces leading-[1.5] text-center text-[var(--adaptive-grey500)] font-[500] select-none">{`계정을 선택하거나 담당자 계정 생성을 눌러\n등록을 시작하세요`}</p>
            </div>
        );
    }

    return (
        <Fragment>
            <aside>
                <form
                    className="grid gap-10"
                    onSubmit={(event) => {
                        void handleSubmit(event);
                    }}
                >
                    <label className={labelClassName}>
                        이름
                        <input
                            className={inputClassName}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="담당자 이름"
                            required
                            type="text"
                            value={name}
                        />
                    </label>
                    <label className={labelClassName}>
                        권한
                        <select
                            className={inputClassName}
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
                    <label className={labelClassName}>
                        아이디
                        <input
                            className={inputClassName}
                            onChange={(event) => setLoginId(event.target.value)}
                            placeholder="login-id"
                            required
                            type="text"
                            value={loginId}
                        />
                    </label>
                    <label className={labelClassName}>
                        비밀번호
                        <input
                            className={inputClassName}
                            name="password"
                            placeholder={isEditMode ? "변경 시에만 입력" : "비밀번호"}
                            required={isCreateMode}
                            type="password"
                        />
                    </label>
                    <label className={labelClassName}>
                        비밀번호 재입력
                        <input
                            className={inputClassName}
                            name="passwordConfirm"
                            placeholder={isEditMode ? "변경 시에만 입력" : "비밀번호 재입력"}
                            required={isCreateMode}
                            type="password"
                        />
                    </label>
                </form>
            </aside>

            <section className="flex absolute bottom-0 left-0 w-full">
                <UI.Button
                    className="bg-black hover:bg-[var(--adaptive-blue500)] text-white w-full"
                    disabled={isPending}
                    type="submit"
                >
                    {isPending ? "저장 중" : "등록하기"}
                </UI.Button>

                {/* {isEditMode ? (
                    <button
                        className="min-h-14 border border-[var(--adaptiveRed500)] text-lg font-[700] text-[var(--adaptiveRed500)]"
                        onClick={() => setConfirm("delete")}
                        type="button"
                    >
                        삭제하기
                    </button>
                ) : null} */}
            </section>

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
        </Fragment>
    );
}
