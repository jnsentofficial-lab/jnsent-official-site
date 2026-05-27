"use client";

import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { useAdminSessionQuery } from "@/entities/auth/api/auth.query";
import {
    useCheckManagerAccountLoginIdMutation,
    useCreateManagerAccountMutation,
    useDeleteManagerAccountMutation,
    useUpdateManagerAccountMutation,
} from "@/entities/managerAccount/api/managerAccount.query";
import type { ManagerAccount, ManagerAccountRole } from "@/entities/managerAccount/model/managerAccount.type";
import { useToastStore } from "@/shared/model/stores/useToastStore";
import { canCreateManagerAccount, canEditManagerAccount, getManagerAccountRoleLabel, isReservedMasterLoginId } from "@/shared/lib/AdminAccountAuth";
import { ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";
import UI from "@/shared/ui/UIComponent";

type ManagerAccountSidebarProps = {
    account: ManagerAccount | null;
    mode: "create" | "edit" | "empty";
    onSaved: (account: ManagerAccount) => void;
};

const inputClassName = "h-[5.2rem] border border-[var(--adaptive-grey200)] hover:border-[var(--adaptive-grey700)] px-4 text-lg font-semibold";
const labelClassName = "flex flex-col gap-[0.8rem] font-[NanumSquare]";

export function ManagerAccountSidebar({ account, mode, onSaved }: ManagerAccountSidebarProps) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const { data: session } = useAdminSessionQuery();
    const { setToast } = useToastStore();
    const [name, setName] = useState("");
    const [role, setRole] = useState<ManagerAccountRole>("manager");
    const [isActive, setIsActive] = useState(true);
    const [loginId, setLoginId] = useState("");
    const [isLoginIdChecked, setIsLoginIdChecked] = useState(false);
    const [checkedLoginId, setCheckedLoginId] = useState("");
    const createAccount = useCreateManagerAccountMutation();
    const updateAccount = useUpdateManagerAccountMutation();
    const deleteAccount = useDeleteManagerAccountMutation();
    const checkLoginId = useCheckManagerAccountLoginIdMutation();
    const [confirm, setConfirm] = useState<"create" | "delete" | null>(null);
    const [pendingForm, setPendingForm] = useState<HTMLFormElement | null>(null);
    const isCreateMode = mode === "create";
    const isEditMode = mode === "edit" && account;
    const isPending = createAccount.isPending || updateAccount.isPending;
    const editableRoles = (["admin", "manager", "viewer"] as ManagerAccountRole[]).filter((item) => canCreateManagerAccount(session?.role, item));
    const roleOptions = editableRoles.length > 0 ? editableRoles : [role];
    const canEditCurrentAccount = isCreateMode ? true : canEditManagerAccount(session?.role, account?.role);
    const isMasterAccount = Boolean(account?.login_id && isReservedMasterLoginId(account.login_id));
    const canSubmit = Boolean(session?.role) && canEditCurrentAccount;

    useEffect(() => {
        setName(account?.name ?? "");
        setRole(account?.role ?? "manager");
        setIsActive(account?.is_active ?? true);
        setLoginId(account?.login_id ?? "");
        setIsLoginIdChecked(false);
        setCheckedLoginId(account?.login_id ?? "");
    }, [account]);

    useEffect(() => {
        if (!isCreateMode || editableRoles.includes(role) || editableRoles.length < 1) {
            return;
        }

        setRole(editableRoles[0]);
    }, [editableRoles, isCreateMode, role]);

    async function saveAccount(form: HTMLFormElement) {
        const formData = new FormData(form);
        const payload = {
            id: account?.id,
            name,
            role,
            is_active: isActive,
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

        if (isCreateMode && (!isLoginIdChecked || checkedLoginId !== loginId.trim())) {
            setToast({ msg: "아이디 중복검사를 완료해주세요.", time: 2, type: "warning" });
            return;
        }

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
            <section className="flex flex-col flex-1 gap-[5.2rem]">
                <h1 className="text-[3.2rem] mobile:px-[1.6rem] pc:px-[5.2rem] pt-[5.2rem]">계정 편집</h1>

                <form
                    className="flex flex-col mobile:px-[1.6rem] pc:px-[5.2rem] flex-1"
                    onSubmit={(event) => {
                        void handleSubmit(event);
                    }}
                    ref={formRef}
                >
                    <label className={labelClassName}>
                        이름
                        <input
                            className={inputClassName}
                            disabled={!canEditCurrentAccount || isMasterAccount}
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
                            disabled={!canEditCurrentAccount || isMasterAccount}
                            onChange={(event) => setRole(event.target.value as ManagerAccountRole)}
                            value={role}
                        >
                            {roleOptions.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {getManagerAccountRoleLabel(item)}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className={labelClassName}>
                        상태
                        <select
                            className={inputClassName}
                            disabled={!canEditCurrentAccount}
                            onChange={(event) => setIsActive(event.target.value === "active")}
                            value={isActive ? "active" : "inactive"}
                        >
                            <option value="active">활성</option>
                            <option value="inactive">비활성</option>
                        </select>
                    </label>
                    <label className={labelClassName}>
                        아이디
                        <div className="grid grid-cols-[1fr_auto] gap-[0.8rem]">
                            <input
                                className={inputClassName}
                                disabled={!canEditCurrentAccount || isMasterAccount}
                                onChange={(event) => {
                                    setLoginId(event.target.value);
                                    setIsLoginIdChecked(false);
                                }}
                                placeholder="login-id"
                                required
                                type="text"
                                value={loginId}
                            />
                            {isCreateMode ? (
                                <UI.Button
                                    className="px-[1.6rem] bg-[var(--adaptive-grey900)] text-white hover:bg-[var(--adaptive-blue500)]"
                                    disabled={!loginId.trim() || checkLoginId.isPending || !canSubmit}
                                    onClick={async () => {
                                        const response = await checkLoginId.mutateAsync(loginId.trim());
                                        setIsLoginIdChecked(response.result.available);
                                        setCheckedLoginId(loginId.trim());
                                    }}
                                    type="button"
                                >
                                    {checkLoginId.isPending ? "검사중" : "중복검사"}
                                </UI.Button>
                            ) : null}
                        </div>
                        {isCreateMode ? (
                            <p className={`text-[1.3rem] ${isLoginIdChecked && checkedLoginId === loginId.trim() ? "text-[var(--adaptive-blue500)]" : "text-[var(--adaptive-grey500)]"}`}>
                                {isLoginIdChecked && checkedLoginId === loginId.trim() ? "중복검사를 통과한 아이디입니다." : "아이디 입력 후 중복검사를 완료해야 등록할 수 있습니다."}
                            </p>
                        ) : null}
                    </label>
                    <label className={labelClassName}>
                        비밀번호
                        <input
                            className={inputClassName}
                            name="password"
                            disabled={!canEditCurrentAccount}
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
                            disabled={!canEditCurrentAccount}
                            placeholder={isEditMode ? "변경 시에만 입력" : "비밀번호 재입력"}
                            required={isCreateMode}
                            type="password"
                        />
                    </label>
                </form>
            </section>

            <section className="flex w-full">
                <UI.Button
                    className="bg-black hover:bg-[var(--adaptive-blue500)] text-white w-full"
                    disabled={isPending || !canSubmit}
                    onClick={() => formRef.current?.requestSubmit()}
                    type="button"
                    tooltip={
                        canSubmit
                            ? []
                            : [
                                  {
                                      type: "disabled",
                                      msg: "이 작업을 진행할 권한이 없습니다.",
                                  },
                              ]
                    }
                >
                    {isPending ? "저장 중" : isCreateMode ? "등록하기" : "저장하기"}
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
                targetTitle="생성 아이디"
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
