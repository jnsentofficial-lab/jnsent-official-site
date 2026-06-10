import { cookies } from "next/headers";
import { apiOk } from "@/shared/lib/api/server";

export async function GET() {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("admin_session")?.value === "1";
    const name = cookieStore.get("admin_name")?.value;
    const loginId = cookieStore.get("admin_login_id")?.value;

    return apiOk({
        isAdmin,
        role: isAdmin ? (cookieStore.get("admin_role")?.value ?? "viewer") : null,
        name: isAdmin && name ? decodeURIComponent(name) : null,
        loginId: isAdmin && loginId ? decodeURIComponent(loginId) : null,
    });
}
