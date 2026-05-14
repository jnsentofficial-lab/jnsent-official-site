import { cookies } from "next/headers";
import { apiOk } from "@/shared/lib/api/server";

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");

    return apiOk({ isAdmin: false });
}
