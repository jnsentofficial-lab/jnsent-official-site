import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { canEditManagerAccount, createAuthManagerUser, isReservedMasterLoginId, sanitizeAccount, toManagerRole, toPasswordHash, updateAuthManagerUser } from "@/shared/lib/AdminAccountAuth";
import { apiError, apiOk } from "@/shared/lib/api/server";
import { getAdminApiRole } from "@/shared/lib/adminApi";
import { isMissingIsActiveColumnError, normalizeManagerAccount } from "@/shared/lib/managerAccountSchema";
import type { Database } from "@/shared/types/Database";

type RouteProps = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteProps) {
    const actorRole = await getAdminApiRole();
    const { id } = await params;
    const body = await request.json();
    const password = String(body.password ?? "");
    const passwordConfirm = String(body.password_confirm ?? "");
    const name = String(body.name ?? "").trim();
    const loginId = String(body.login_id ?? "").trim();
    const role = toManagerRole(body.role);
    const isActive = Boolean(body.is_active ?? true);
    const update: Database["public"]["Tables"]["manager_accounts"]["Update"] = {
        name,
        role,
        is_active: isActive,
        login_id: loginId,
    };

    if (!name || !loginId) {
        return apiError("이름과 아이디를 입력해주세요.", 400);
    }

    if (password || passwordConfirm) {
        if (password !== passwordConfirm) {
            return apiError("비밀번호가 일치하지 않습니다.", 400);
        }

        update.password_hash = toPasswordHash(password);
    }

    const supabase = createSupabaseServiceClient();
    const { data: currentAccount, error: currentError } = await supabase.from("manager_accounts").select("*").eq("id", id).single();

    if (currentError) {
        return apiError(currentError.message, 400);
    }

    if (!canEditManagerAccount(actorRole, currentAccount.role) || !canEditManagerAccount(actorRole, role)) {
        return apiError("해당 계정을 수정할 권한이 없습니다.", 403);
    }

    if (isReservedMasterLoginId(currentAccount.login_id) && (!isActive || role !== currentAccount.role || loginId !== currentAccount.login_id)) {
        return apiError("마스터 계정의 상태, 권한, 아이디는 변경할 수 없습니다.", 400);
    }

    if (isReservedMasterLoginId(loginId) && currentAccount.login_id !== loginId) {
        return apiError("admin 아이디는 마스터 계정으로 예약되어 있습니다.", 400);
    }

    const { data: duplicatedAccount } = await supabase.from("manager_accounts").select("id").eq("login_id", loginId).neq("id", id).maybeSingle();

    if (duplicatedAccount) {
        return apiError("이미 사용 중인 아이디입니다.", 400);
    }

    try {
        if (currentAccount.auth_user_id) {
            await updateAuthManagerUser(currentAccount.auth_user_id, {
                loginId,
                password: password || undefined,
                name,
                role,
            });
        } else if (password) {
            const user = await createAuthManagerUser({
                loginId,
                password,
                name,
                role,
            });
            update.auth_user_id = user.id;
        }
    } catch (error) {
        return apiError(error instanceof Error ? error.message : "Auth 사용자 수정에 실패했습니다.", 400);
    }

    let { data, error } = await supabase
        .from("manager_accounts")
        .update(update)
        .eq("id", id)
        .select("*")
        .single();

    if (isMissingIsActiveColumnError(error)) {
        const { is_active: _isActive, ...fallbackUpdate } = update;

        ({ data, error } = await supabase.from("manager_accounts").update(fallbackUpdate).eq("id", id).select("*").single());
    }

    if (error || !data) {
        return apiError(error?.message ?? "계정 수정에 실패했습니다.", 400);
    }

    return apiOk(normalizeManagerAccount(sanitizeAccount(data)));
}

export async function DELETE(_request: Request, { params }: RouteProps) {
    const actorRole = await getAdminApiRole();
    const { id } = await params;
    const supabase = createSupabaseServiceClient();
    const { data: currentAccount, error: currentError } = await supabase.from("manager_accounts").select("*").eq("id", id).single();

    if (currentError) {
        return apiError(currentError.message, 400);
    }

    if (!canEditManagerAccount(actorRole, currentAccount.role)) {
        return apiError("해당 계정을 삭제할 권한이 없습니다.", 403);
    }

    if (isReservedMasterLoginId(currentAccount.login_id)) {
        return apiError("마스터 계정은 삭제할 수 없습니다.", 400);
    }

    const { data, error } = await supabase
        .from("manager_accounts")
        .delete()
        .eq("id", id)
        .select("*")
        .single();

    if (!error && data.auth_user_id) {
        await supabase.auth.admin.deleteUser(data.auth_user_id);
    }

    if (error || !data) {
        return apiError(error?.message ?? "계정 삭제에 실패했습니다.", 400);
    }

    return apiOk(normalizeManagerAccount(sanitizeAccount(data)));
}
