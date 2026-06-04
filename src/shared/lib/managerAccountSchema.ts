import type { PostgrestError } from "@supabase/supabase-js";
import type { ManagerAccount } from "@/entities/managerAccount/model/managerAccount.type";

export function isMissingIsActiveColumnError(error?: PostgrestError | Error | null) {
    const message = String(error?.message ?? "").toLowerCase();
    const code = typeof error === "object" && error !== null && "code" in error ? String(error.code ?? "") : "";

    return (
        message.includes("is_active") &&
        (code === "42703" || code.startsWith("PGRST") || message.includes("schema cache") || message.includes("could not find"))
    );
}

export function normalizeManagerAccount<T extends Partial<ManagerAccount>>(account: T): ManagerAccount {
    return {
        ...account,
        is_active: account.is_active ?? true,
    } as ManagerAccount;
}
