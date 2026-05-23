import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { createAuthManagerUser, sanitizeAccount, toManagerRole, toPasswordHash } from "@/shared/lib/AdminAccountAuth";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function GET() {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("manager_accounts")
        .select("id,name,role,login_id,auth_user_id,created_at,updated_at")
        .order("created_at", { ascending: false });

    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}

export async function POST(request: Request) {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const loginId = String(body.login_id ?? "").trim();
    const role = toManagerRole(body.role);
    const password = String(body.password ?? "");
    const passwordConfirm = String(body.password_confirm ?? "");

    if (!name || !loginId || !password) {
        return apiError("이름, 아이디, 비밀번호를 입력해주세요.", 400);
    }

    if (password !== passwordConfirm) {
        return apiError("비밀번호가 일치하지 않습니다.", 400);
    }

    const supabase = createSupabaseServiceClient();
    let authUserId: string | null = null;

    try {
        const user = await createAuthManagerUser({ loginId, password, name, role });
        authUserId = user.id;
    } catch (error) {
        return apiError(error instanceof Error ? error.message : "Auth 사용자 생성에 실패했습니다.", 400);
    }

    const { data, error } = await supabase
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

    if (error && authUserId) {
        await supabase.auth.admin.deleteUser(authUserId);
    }

    return error ? apiError(error.message, 400) : apiOk(sanitizeAccount(data), { status: 201 });
}
