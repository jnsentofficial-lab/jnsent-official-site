import { cookies } from "next/headers";
import type { ManagerAccountRole } from "@/shared/lib/AdminAccountAuth";

export async function hasAdminApiSession() {
    const cookieStore = await cookies();

    return cookieStore.get("admin_session")?.value === "1";
}

export async function getAdminApiRole() {
    const cookieStore = await cookies();
    const role = cookieStore.get("admin_role")?.value;

    return role === "admin" || role === "manager" || role === "viewer" ? (role as ManagerAccountRole) : null;
}
