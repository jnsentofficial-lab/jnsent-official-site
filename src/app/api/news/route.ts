import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function GET(request: NextRequest) {
    const limit = Number(request.nextUrl.searchParams.get("limit") ?? 0);
    const supabase = createSupabaseServerClient();
    let query = supabase.from("news").select("*").eq("is_published", true).neq("title", "NEWS 준비 중입니다").order("published_at", { ascending: false, nullsFirst: false });

    if (limit > 0) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}
