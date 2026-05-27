import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { canCreateManagerAccount, createAuthManagerUser, isReservedMasterLoginId, sanitizeAccount, toManagerRole, toPasswordHash } from "@/shared/lib/AdminAccountAuth";
import { apiError, apiOk } from "@/shared/lib/api/server";
import { getAdminApiRole } from "@/shared/lib/adminApi";
import { isMissingIsActiveColumnError, normalizeManagerAccount } from "@/shared/lib/managerAccountSchema";

async function hasDuplicateLoginId(loginId: string) {
    const supabase = createSupabaseServiceClient();
    const { data } = await supabase.from("manager_accounts").select("id").eq("login_id", loginId).maybeSingle();

    return Boolean(data);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const loginId = String(searchParams.get("loginId") ?? "").trim();

    if (loginId) {
        return apiOk({ available: !(await hasDuplicateLoginId(loginId)) && !isReservedMasterLoginId(loginId) });
    }

    const supabase = createSupabaseServiceClient();
    const primaryResponse = await supabase
        .from("manager_accounts")
        .select("id,name,role,is_active,login_id,auth_user_id,created_at,updated_at")
        .order("created_at", { ascending: false });
    let data: Record<string, unknown>[] | null = primaryResponse.data as Record<string, unknown>[] | null;
    let error = primaryResponse.error;

    if (isMissingIsActiveColumnError(error)) {
        const fallbackResponse = await supabase.from("manager_accounts").select("id,name,role,login_id,auth_user_id,created_at,updated_at").order("created_at", { ascending: false });
        data = fallbackResponse.data as Record<string, unknown>[] | null;
        error = fallbackResponse.error;
    }

    return error ? apiError(error.message, 500) : apiOk((data ?? []).map((account) => normalizeManagerAccount(account)));
}

export async function POST(request: Request) {
    const actorRole = await getAdminApiRole();
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const loginId = String(body.login_id ?? "").trim();
    const role = toManagerRole(body.role);
    const isActive = Boolean(body.is_active ?? true);
    const password = String(body.password ?? "");
    const passwordConfirm = String(body.password_confirm ?? "");

    if (!name || !loginId || !password) {
        return apiError("이름, 아이디, 비밀번호를 입력해주세요.", 400);
    }

    if (password !== passwordConfirm) {
        return apiError("비밀번호가 일치하지 않습니다.", 400);
    }

    if (!canCreateManagerAccount(actorRole, role)) {
        return apiError("해당 권한의 계정을 생성할 수 없습니다.", 403);
    }

    if (isReservedMasterLoginId(loginId)) {
        return apiError("admin 아이디는 마스터 계정으로 예약되어 있습니다.", 400);
    }

    if (await hasDuplicateLoginId(loginId)) {
        return apiError("이미 사용 중인 아이디입니다.", 400);
    }

    const supabase = createSupabaseServiceClient();
    let authUserId: string | null = null;

    try {
        const user = await createAuthManagerUser({ loginId, password, name, role });
        authUserId = user.id;
    } catch (error) {
        return apiError(error instanceof Error ? error.message : "Auth 사용자 생성에 실패했습니다.", 400);
    }

    const primaryResponse = await supabase
        .from("manager_accounts")
        .insert({
            name,
            role,
            is_active: isActive,
            login_id: loginId,
            auth_user_id: authUserId,
            password_hash: toPasswordHash(password),
        })
        .select("*")
        .single();
    let data: Record<string, unknown> | null = primaryResponse.data as Record<string, unknown> | null;
    let error = primaryResponse.error;

    if (isMissingIsActiveColumnError(error)) {
        const fallbackResponse = await supabase
            .from("manager_accounts")
            .insert({
                name,
                role,
                login_id: loginId,
                auth_user_id: authUserId,
                password_hash: toPasswordHash(password),
            })
            .select("*")
            .single();
        data = fallbackResponse.data as Record<string, unknown> | null;
        error = fallbackResponse.error;
    }

    if (error && authUserId) {
        await supabase.auth.admin.deleteUser(authUserId);
    }

    if (error || !data) {
        return apiError(error?.message ?? "계정 생성에 실패했습니다.", 400);
    }

    return apiOk(normalizeManagerAccount(sanitizeAccount(data)), { status: 201 });
}
