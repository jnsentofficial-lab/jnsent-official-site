import { cookies } from "next/headers";
import { apiOk } from "@/shared/lib/api/server";

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    cookieStore.delete("admin_role");
    cookieStore.delete("admin_name");
    cookieStore.delete("admin_login_id");

    return apiOk({ isAdmin: false, role: null, name: null, loginId: null });
}
