import { cookies } from "next/headers";
import { apiOk } from "@/shared/lib/api/server";

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    cookieStore.delete("admin_role");
    cookieStore.delete("admin_name");

    return apiOk({ isAdmin: false, role: null, name: null });
}
