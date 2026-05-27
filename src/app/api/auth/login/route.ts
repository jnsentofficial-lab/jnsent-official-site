import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/shared/api/SupabaseServer";
import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { createAuthManagerUser, resolveAdminIdentity, toAuthEmail, toManagerRole, verifyPasswordHash } from "@/shared/lib/AdminAccountAuth";
import { apiError, apiOk } from "@/shared/lib/api/server";
import { isMissingIsActiveColumnError } from "@/shared/lib/managerAccountSchema";

async function migrateLegacyManagerAccount(loginId: string, password: string) {
    const supabase = createSupabaseServiceClient();
    const { data: account } = await supabase.from("manager_accounts").select("*").eq("login_id", loginId).maybeSingle();

    if (!account || !verifyPasswordHash(password, account.password_hash)) {
        return null;
    }

    const user = await createAuthManagerUser({
        loginId: account.login_id,
        password,
        name: account.name,
        role: toManagerRole(account.role),
    });

    await supabase.from("manager_accounts").update({ auth_user_id: user.id }).eq("id", account.id);

    return user;
}

export async function POST(request: Request) {
    const body = await request.json();
    const loginId = String(body.email ?? "").trim();
    const password = String(body.password ?? "");
    const supabase = createSupabaseServerClient();
    let { data, error } = await supabase.auth.signInWithPassword({
        email: toAuthEmail(loginId),
        password,
    });

    if (error && loginId.includes("@")) {
        const legacyUser = await migrateLegacyManagerAccount(loginId, password);
        if (legacyUser) {
            ({ data, error } = await supabase.auth.signInWithPassword({ email: toAuthEmail(loginId), password }));
        }
    }

    if (error && !loginId.includes("@")) {
        const legacyUser = await migrateLegacyManagerAccount(loginId, password);
        if (legacyUser) {
            ({ data, error } = await supabase.auth.signInWithPassword({ email: toAuthEmail(loginId), password }));
        }
    }

    const identity = resolveAdminIdentity(data.user);

    if (error || !identity.isAdmin) {
        return apiError("로그인 정보를 확인해주세요.", 401);
    }

    if (data.user?.id) {
        const serviceSupabase = createSupabaseServiceClient();
        let { data: account, error: accountError } = await serviceSupabase.from("manager_accounts").select("is_active").eq("auth_user_id", data.user.id).maybeSingle();

        if (isMissingIsActiveColumnError(accountError)) {
            account = null;
            accountError = null;
        }

        if (account && !account.is_active) {
            await supabase.auth.signOut();
            return apiError("비활성화된 계정입니다.", 403);
        }
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });
    cookieStore.set("admin_role", identity.role ?? "viewer", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });
    cookieStore.set("admin_name", encodeURIComponent(identity.name ?? "관리자"), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    return apiOk({ isAdmin: true, role: identity.role, name: identity.name });
}
