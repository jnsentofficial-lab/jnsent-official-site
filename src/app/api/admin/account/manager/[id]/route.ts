import { createHash, randomBytes } from "crypto";
import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";
import type { Database } from "@/shared/types/Database";

type RouteProps = { params: Promise<{ id: string }> };
const roles = ["manager", "admin", "viewer"] as const;

function toPasswordHash(password: string) {
    const salt = randomBytes(16).toString("hex");
    const hash = createHash("sha256").update(`${salt}:${password}`).digest("hex");

    return `${salt}:${hash}`;
}

function sanitizeAccount<T extends { password_hash?: string }>(account: T) {
    const { password_hash: _passwordHash, ...safeAccount } = account;

    return safeAccount;
}

export async function PATCH(request: Request, { params }: RouteProps) {
    const { id } = await params;
    const body = await request.json();
    const password = String(body.password ?? "");
    const passwordConfirm = String(body.password_confirm ?? "");
    const update: Database["public"]["Tables"]["manager_accounts"]["Update"] = {
        name: String(body.name ?? "").trim(),
        role: roles.includes(body.role) ? body.role : "manager",
        login_id: String(body.login_id ?? "").trim(),
    };

    if (!update.name || !update.login_id) {
        return apiError("이름과 아이디를 입력해주세요.", 400);
    }

    if (password || passwordConfirm) {
        if (password !== passwordConfirm) {
            return apiError("비밀번호가 일치하지 않습니다.", 400);
        }

        update.password_hash = toPasswordHash(password);
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("manager_accounts")
        .update(update)
        .eq("id", id)
        .select("*")
        .single();

    return error ? apiError(error.message, 400) : apiOk(sanitizeAccount(data));
}
