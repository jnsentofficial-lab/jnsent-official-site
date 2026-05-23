import type { Database } from "@/shared/types/Database";

export type ManagerAccountRole = Database["public"]["Tables"]["manager_accounts"]["Row"]["role"];
export type ManagerAccount = Omit<Database["public"]["Tables"]["manager_accounts"]["Row"], "password_hash">;

export type UpsertManagerAccountPayload = {
    id?: string;
    name: string;
    role: ManagerAccountRole;
    login_id: string;
    password?: string;
    password_confirm?: string;
};
export type DeleteManagerAccountPayload = Pick<ManagerAccount, "id">;
