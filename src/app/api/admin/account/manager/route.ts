import { createHash, randomBytes } from "crypto";
import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

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

export async function GET() {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("manager_accounts")
        .select("id,name,role,login_id,created_at,updated_at")
        .order("created_at", { ascending: false });

    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}

export async function POST(request: Request) {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const loginId = String(body.login_id ?? "").trim();
    const role = roles.includes(body.role) ? body.role : "manager";
    const password = String(body.password ?? "");
    const passwordConfirm = String(body.password_confirm ?? "");

    if (!name || !loginId || !password) {
        return apiError("이름, 아이디, 비밀번호를 입력해주세요.", 400);
    }

    if (password !== passwordConfirm) {
        return apiError("비밀번호가 일치하지 않습니다.", 400);
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("manager_accounts")
        .insert({
            name,
            role,
            login_id: loginId,
            password_hash: toPasswordHash(password),
        })
        .select("*")
        .single();

    return error ? apiError(error.message, 400) : apiOk(sanitizeAccount(data), { status: 201 });
}
