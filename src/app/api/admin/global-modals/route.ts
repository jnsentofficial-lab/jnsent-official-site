import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function GET() {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase.from("global_modals").select("*").order("row", { ascending: true }).order("col", { ascending: true }).order("stack_order", { ascending: true });
    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}

export async function POST(request: Request) {
    const body = await request.json();
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase.from("global_modals").insert(body).select("*").single();
    return error ? apiError(error.message, 400) : apiOk(data, { status: 201 });
}
