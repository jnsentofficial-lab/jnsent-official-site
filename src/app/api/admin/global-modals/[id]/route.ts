import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { hasAdminApiSession } from "@/shared/lib/adminApi";
import { deleteUnusedManagedAssets } from "@/shared/lib/asset.server";
import { apiError, apiOk } from "@/shared/lib/api/server";

type RouteProps = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteProps) {
    if (!(await hasAdminApiSession())) {
        return apiError("관리자 권한이 필요합니다.", 403);
    }

    const { id } = await params;
    const body = await request.json();
    const supabase = createSupabaseServiceClient();
    const { data: existing } = await supabase.from("global_modals").select("*").eq("id", id).maybeSingle();
    const { data, error } = await supabase.from("global_modals").update(body).eq("id", id).select("*").single();

    if (!error && existing?.image_url && existing.image_url !== data?.image_url) {
        await deleteUnusedManagedAssets([existing.image_url]);
    }

    return error ? apiError(error.message, 400) : apiOk(data);
}

export async function DELETE(_request: Request, { params }: RouteProps) {
    if (!(await hasAdminApiSession())) {
        return apiError("관리자 권한이 필요합니다.", 403);
    }

    const { id } = await params;
    const supabase = createSupabaseServiceClient();
    const { data: existing } = await supabase.from("global_modals").select("*").eq("id", id).maybeSingle();
    const { data, error } = await supabase.from("global_modals").delete().eq("id", id).select("*").single();

    if (!error && existing?.image_url) {
        await deleteUnusedManagedAssets([existing.image_url]);
    }

    return error ? apiError(error.message, 400) : apiOk(data);
}
