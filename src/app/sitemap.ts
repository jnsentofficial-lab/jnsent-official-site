import type { MetadataRoute } from "next";
import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const dynamic = "force-dynamic";

const routes = ["", "/about", "/setupGuide", "/equipmentRental", "/studioRental", "/bjSupport", "/news", "/consulting"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = createSupabaseServiceClient();
    const { data } = await supabase
        .from("news")
        .select("slug,updated_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
    const news = data ?? [];
    const routeItems = routes.map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.7,
    }));
    const newsItems = news.map((item) => ({
        url: `${siteUrl}/news/${item.slug}`,
        lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    return [...routeItems, ...newsItems];
}
