import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { hasAdminApiSession } from "@/shared/lib/adminApi";
import { deleteUnusedManagedAssets } from "@/shared/lib/asset.server";
import { apiError, apiOk } from "@/shared/lib/api/server";
import { extractRichTextImages, toRichTextContent } from "@/shared/lib/richText/richText";
import type { Json } from "@/shared/types/Database";

type RouteProps = { params: Promise<{ id: string }> };

function getNewsAssetUrls(item?: { body?: Json | null; thumbnail_url?: string | null } | null) {
    if (!item) {
        return [];
    }

    return Array.from(new Set([item.thumbnail_url, ...extractRichTextImages(toRichTextContent(item.body))].filter(Boolean)));
}

export async function PATCH(request: Request, { params }: RouteProps) {
    if (!(await hasAdminApiSession())) {
        return apiError("관리자 권한이 필요합니다.", 403);
    }

    const { id } = await params;
    const body = await request.json();
    const supabase = createSupabaseServiceClient();
    const { data: existing } = await supabase.from("news").select("*").eq("id", id).maybeSingle();
    const { data, error } = await supabase.from("news").update(body).eq("id", id).select("*").single();

    if (!error && existing && data) {
        const nextUrls = new Set(getNewsAssetUrls(data));
        await deleteUnusedManagedAssets(getNewsAssetUrls(existing).filter((url) => !nextUrls.has(url)));
    }

    return error ? apiError(error.message, 400) : apiOk(data);
}

export async function DELETE(_request: Request, { params }: RouteProps) {
    if (!(await hasAdminApiSession())) {
        return apiError("관리자 권한이 필요합니다.", 403);
    }

    const { id } = await params;
    const supabase = createSupabaseServiceClient();
    const { data: existing } = await supabase.from("news").select("*").eq("id", id).maybeSingle();
    const { data, error } = await supabase.from("news").delete().eq("id", id).select("*").single();

    if (!error) {
        await deleteUnusedManagedAssets(getNewsAssetUrls(existing));
    }

    return error ? apiError(error.message, 400) : apiOk(data);
}
