import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { createAuthManagerUser, sanitizeAccount, toManagerRole, toPasswordHash, updateAuthManagerUser } from "@/shared/lib/AdminAccountAuth";
import { apiError, apiOk } from "@/shared/lib/api/server";
import type { Database } from "@/shared/types/Database";

type RouteProps = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteProps) {
    const { id } = await params;
    const body = await request.json();
    const password = String(body.password ?? "");
    const passwordConfirm = String(body.password_confirm ?? "");
    const name = String(body.name ?? "").trim();
    const loginId = String(body.login_id ?? "").trim();
    const role = toManagerRole(body.role);
    const update: Database["public"]["Tables"]["manager_accounts"]["Update"] = {
        name,
        role,
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

    const { data, error } = await supabase
        .from("manager_accounts")
        .update(update)
        .eq("id", id)
        .select("*")
        .single();

    return error ? apiError(error.message, 400) : apiOk(sanitizeAccount(data));
}

export async function DELETE(_request: Request, { params }: RouteProps) {
    const { id } = await params;
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("manager_accounts")
        .delete()
        .eq("id", id)
        .select("*")
        .single();

    if (!error && data.auth_user_id) {
        await supabase.auth.admin.deleteUser(data.auth_user_id);
    }

    return error ? apiError(error.message, 400) : apiOk(sanitizeAccount(data));
}
