import { createHash, randomBytes } from "crypto";
import type { User } from "@supabase/supabase-js";
import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import type { Database } from "@/shared/types/Database";

export const managerAccountRoles = ["manager", "admin", "viewer"] as const;
export type ManagerAccountRole = (typeof managerAccountRoles)[number];
export type ManagerAccountRow = Database["public"]["Tables"]["manager_accounts"]["Row"];
export const managerAccountRoleLabels: Record<ManagerAccountRole, string> = {
    admin: "관리자",
    manager: "부관리자",
    viewer: "직원",
};

const fallbackAdminEmails = ["to_before@naver.com"];
const localAuthDomain = "jns-admin.local";

export function toManagerRole(value: unknown): ManagerAccountRole {
    return managerAccountRoles.includes(value as ManagerAccountRole) ? (value as ManagerAccountRole) : "manager";
}

export function getManagerAccountRoleLabel(value: unknown) {
    return managerAccountRoleLabels[toManagerRole(value)];
}

export function canAccessManagerAccountPage(role: unknown) {
    const normalizedRole = managerAccountRoles.includes(role as ManagerAccountRole) ? (role as ManagerAccountRole) : null;

    return normalizedRole === "admin" || normalizedRole === "manager";
}

export function canCreateManagerAccount(actorRole: unknown, targetRole: unknown) {
    const normalizedActorRole = managerAccountRoles.includes(actorRole as ManagerAccountRole) ? (actorRole as ManagerAccountRole) : null;
    const normalizedTargetRole = managerAccountRoles.includes(targetRole as ManagerAccountRole) ? (targetRole as ManagerAccountRole) : null;

    if (!normalizedActorRole || !normalizedTargetRole) {
        return false;
    }

    if (normalizedActorRole === "admin") {
        return true;
    }

    return normalizedActorRole === "manager" && normalizedTargetRole === "viewer";
}

export function canEditManagerAccount(actorRole: unknown, targetRole: unknown) {
    const normalizedActorRole = managerAccountRoles.includes(actorRole as ManagerAccountRole) ? (actorRole as ManagerAccountRole) : null;
    const normalizedTargetRole = managerAccountRoles.includes(targetRole as ManagerAccountRole) ? (targetRole as ManagerAccountRole) : null;

    if (!normalizedActorRole || !normalizedTargetRole) {
        return false;
    }

    if (normalizedActorRole === "admin") {
        return true;
    }

    return normalizedActorRole === "manager" && normalizedTargetRole === "viewer";
}

export function isReservedMasterLoginId(loginId: string) {
    return loginId.trim().toLowerCase() === "admin";
}

export function toAuthEmail(loginId: string) {
    const value = loginId.trim();

    if (value === "admin") {
        return "admin@example.com";
    }

    return value.includes("@") ? value : `${value}@${localAuthDomain}`;
}

export function toPasswordHash(password: string) {
    const salt = randomBytes(16).toString("hex");
    const hash = createHash("sha256").update(`${salt}:${password}`).digest("hex");

    return `${salt}:${hash}`;
}

export function verifyPasswordHash(password: string, passwordHash?: string | null) {
    const [salt, hash] = String(passwordHash ?? "").split(":");

    if (!salt || !hash) {
        return false;
    }

    return createHash("sha256").update(`${salt}:${password}`).digest("hex") === hash;
}

function getConfiguredAdminEmails() {
    return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
}

export function resolveAdminIdentity(user?: User | null) {
    const email = user?.email?.toLowerCase();
    const metadataRole = user?.app_metadata?.role;
    const role = managerAccountRoles.includes(metadataRole as ManagerAccountRole) ? (metadataRole as ManagerAccountRole) : null;
    const adminEmails = getConfiguredAdminEmails();
    const isFallbackAdmin = Boolean(email && [...adminEmails, ...fallbackAdminEmails, "admin@example.com"].includes(email));

    if (!user || (!role && !isFallbackAdmin)) {
        return { isAdmin: false, role: null, name: null };
    }

    return {
        isAdmin: true,
        role: role ?? "admin",
        name: String(user.user_metadata?.name ?? user.email ?? "관리자"),
    };
}

export function sanitizeAccount<T extends { password_hash?: string }>(account: T) {
    const { password_hash: _passwordHash, ...safeAccount } = account;

    return safeAccount;
}

export async function createAuthManagerUser(account: { loginId: string; password: string; name: string; role: ManagerAccountRole }) {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase.auth.admin.createUser({
        email: toAuthEmail(account.loginId),
        password: account.password,
        email_confirm: true,
        app_metadata: {
            role: account.role,
            login_id: account.loginId,
        },
        user_metadata: {
            name: account.name,
        },
    });

    if (error || !data.user) {
        throw new Error(error?.message ?? "AUTH_CREATE_FAILED");
    }

    return data.user;
}

export async function updateAuthManagerUser(authUserId: string, account: { loginId: string; password?: string; name: string; role: ManagerAccountRole }) {
    const supabase = createSupabaseServiceClient();
    const { error } = await supabase.auth.admin.updateUserById(authUserId, {
        email: toAuthEmail(account.loginId),
        password: account.password || undefined,
        email_confirm: true,
        app_metadata: {
            role: account.role,
            login_id: account.loginId,
        },
        user_metadata: {
            name: account.name,
        },
    });

    if (error) {
        throw new Error(error.message);
    }
}
