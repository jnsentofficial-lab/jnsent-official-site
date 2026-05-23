import { NextRequest } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

type RouteProps = {
    params: Promise<{ slug: string }>;
};

function getClientIp(request: NextRequest) {
    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const realIp = request.headers.get("x-real-ip")?.trim();
    const cloudflareIp = request.headers.get("cf-connecting-ip")?.trim();

    return forwardedFor || realIp || cloudflareIp || "127.0.0.1";
}

export async function GET(request: NextRequest, { params }: RouteProps) {
    const { slug } = await params;
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from("news").select("*").eq("slug", slug).eq("is_published", true).neq("title", "NEWS 준비 중입니다").maybeSingle();

    if (error) {
        return apiError(error.message, 500);
    }

    if (!data) {
        return apiError("뉴스를 찾을 수 없습니다.", 404);
    }

    const serviceSupabase = createSupabaseServiceClient();
    const { data: viewCount } = await serviceSupabase.rpc("increment_news_view_once", {
        target_news_id: data.id,
        viewer_ip: getClientIp(request),
    });

    return apiOk({
        ...data,
        view_count: viewCount ?? data.view_count,
    });
}
