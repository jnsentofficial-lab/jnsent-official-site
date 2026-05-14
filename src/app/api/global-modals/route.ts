import { createSupabaseServerClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function GET() {
    const now = new Date().toISOString();
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from("global_modals")
        .select("*")
        .eq("is_visible", true)
        .or(`starts_at.is.null,starts_at.lte.${now}`)
        .or(`ends_at.is.null,ends_at.gte.${now}`)
        .order("row", { ascending: true })
        .order("col", { ascending: true })
        .order("stack_order", { ascending: true });

    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}
