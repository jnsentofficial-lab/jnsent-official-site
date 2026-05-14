import { createSupabaseServerClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function GET() {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from("banners").select("*").eq("is_published", true).order("sort_order", { ascending: true });

    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}
