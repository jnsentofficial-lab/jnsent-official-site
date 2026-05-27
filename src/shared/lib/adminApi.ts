import { cookies } from "next/headers";

export async function hasAdminApiSession() {
    const cookieStore = await cookies();

    return cookieStore.get("admin_session")?.value === "1";
}
