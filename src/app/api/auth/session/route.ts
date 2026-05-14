import { cookies } from "next/headers";
import { apiOk } from "@/shared/lib/api/server";

export async function GET() {
    const cookieStore = await cookies();

    return apiOk({ isAdmin: cookieStore.get("admin_session")?.value === "1" });
}
