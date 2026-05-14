import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function GET() {
    const supabase = createSupabaseServiceClient();
    const [pages, banners, news, inquiries] = await Promise.all([
        supabase.from("page_contents").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("banners").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("news").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
    ]);
    const error = pages.error ?? banners.error ?? news.error ?? inquiries.error;
    if (error) return apiError(error.message, 500);
    return apiOk({
        pages: pages.count ?? 0,
        banners: banners.count ?? 0,
        news: news.count ?? 0,
        newInquiries: inquiries.count ?? 0,
    });
}
