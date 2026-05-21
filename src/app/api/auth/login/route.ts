import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/shared/api/SupabaseServer";
import { isAdminUser } from "@/shared/lib/AdminAccess";
import { apiError, apiOk } from "@/shared/lib/api/server";

function normalizeLoginEmail(value: string) {
    const loginId = value.trim();

    return loginId === "admin" ? "admin@example.com" : loginId;
}

export async function POST(request: Request) {
    const body = await request.json();
    const email = normalizeLoginEmail(String(body.email ?? ""));
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: String(body.password ?? ""),
    });

    if (error || !isAdminUser(data.user)) {
        return apiError("로그인 정보를 확인해주세요.", 401);
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    return apiOk({ isAdmin: true });
}
