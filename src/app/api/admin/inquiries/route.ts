import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function GET() {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}
