import type { Database } from "@/shared/types/Database";

export type Banner = Database["public"]["Tables"]["banners"]["Row"];
export type CreateBannerPayload = Pick<Banner, "title" | "subtitle" | "image_url" | "link_url">;
export type ToggleBannerPayload = Pick<Banner, "id" | "is_published">;
