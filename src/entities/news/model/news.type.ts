import type { Database, Json } from "@/shared/types/Database";

export type News = Database["public"]["Tables"]["news"]["Row"];
export type UpsertNewsPayload = {
    slug: string;
    title: string;
    summary: string | null;
    body: Json;
    thumbnail_url: string | null;
    seo_title: string | null;
    seo_description: string | null;
    is_published: boolean;
    published_at: string | null;
};
export type ToggleNewsPayload = Pick<News, "id" | "is_published">;
export type DeleteNewsPayload = Pick<News, "id">;
