import type { PostgrestError } from "@supabase/supabase-js";
import type { ManagerAccount } from "@/entities/managerAccount/model/managerAccount.type";

export function isMissingIsActiveColumnError(error?: PostgrestError | Error | null) {
    return String(error?.message ?? "").includes("'is_active' column");
}

export function normalizeManagerAccount<T extends Partial<ManagerAccount>>(account: T): ManagerAccount {
    return {
        ...account,
        is_active: account.is_active ?? true,
    } as ManagerAccount;
}
