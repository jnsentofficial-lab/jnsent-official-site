import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { hasAdminApiSession } from "@/shared/lib/adminApi";
import { deleteUnusedManagedAssets } from "@/shared/lib/asset.server";
import { apiError, apiOk } from "@/shared/lib/api/server";
import { extractRichTextImages, toRichTextContent } from "@/shared/lib/richText/richText";
import type { Json } from "@/shared/types/Database";

function getNewsAssetUrls(item?: { body?: Json | null; thumbnail_url?: string | null } | null) {
    if (!item) {
        return [];
    }

    return Array.from(new Set([item.thumbnail_url, ...extractRichTextImages(toRichTextContent(item.body))].filter(Boolean)));
}

export async function GET() {
    if (!(await hasAdminApiSession())) {
        return apiError("관리자 권한이 필요합니다.", 403);
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase.from("news").select("*").order("published_at", { ascending: false });
    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}

export async function POST(request: Request) {
    const body = await request.json();

    if (!(await hasAdminApiSession())) {
        return apiError("관리자 권한이 필요합니다.", 403);
    }

    const supabase = createSupabaseServiceClient();
    const now = new Date().toISOString();
    const { data: existing } = await supabase.from("news").select("*").eq("slug", String(body.slug ?? "").trim()).maybeSingle();
    const isPublished = Boolean(body.is_published);
    const publishedAt = body.published_at ? String(body.published_at) : null;
    const nextPayload = {
        ...body,
        slug: String(body.slug ?? "").trim(),
        is_published: isPublished,
        published_at: isPublished ? (publishedAt ?? existing?.published_at ?? now) : publishedAt,
    };
    const query = existing
        ? supabase.from("news").update(nextPayload).eq("id", existing.id)
        : supabase.from("news").insert(nextPayload);
    const { data, error } = await query.select("*").single();

    if (!error && existing && data) {
        const nextUrls = new Set(getNewsAssetUrls(data));
        await deleteUnusedManagedAssets(getNewsAssetUrls(existing).filter((url) => !nextUrls.has(url)));
    }

    return error ? apiError(error.message, 400) : apiOk(data);
}
