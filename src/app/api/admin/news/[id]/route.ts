import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

type RouteProps = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteProps) {
    const { id } = await params;
    const body = await request.json();
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase.from("news").update(body).eq("id", id).select("*").single();
    return error ? apiError(error.message, 400) : apiOk(data);
}

export async function DELETE(_request: Request, { params }: RouteProps) {
    const { id } = await params;
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase.from("news").delete().eq("id", id).select("*").single();
    return error ? apiError(error.message, 400) : apiOk(data);
}
