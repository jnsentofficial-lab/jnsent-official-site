import type { Database, Json } from "@/shared/types/Database";

export type PageContent = Database["public"]["Tables"]["page_contents"]["Row"];
export type UpsertPageContentPayload = {
    slug: string;
    title: string;
    description: string | null;
    body: Json;
    seo_title: string | null;
    seo_description: string | null;
};
export type TogglePageContentPayload = Pick<PageContent, "id" | "is_published">;
