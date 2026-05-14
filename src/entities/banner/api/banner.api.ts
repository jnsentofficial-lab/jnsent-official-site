import { clientApi, type ApiResponse } from "@/shared/lib/api/client";
import { serverApi } from "@/shared/lib/api/server";
import type { Banner, CreateBannerPayload, ToggleBannerPayload } from "@/entities/banner/model/banner.type";

export async function getPublishedBannersFetch() {
    return clientApi.get<ApiResponse<Banner[]>>("/api/banners");
}

export async function getAdminBannersFetch() {
    return clientApi.get<ApiResponse<Banner[]>>("/api/admin/banners");
}

export async function createBannerFetch(payload: CreateBannerPayload) {
    return clientApi.post<ApiResponse<Banner>>("/api/admin/banners", payload);
}

export async function toggleBannerFetch(payload: ToggleBannerPayload) {
    return clientApi.patch<ApiResponse<Banner>>(`/api/admin/banners/${payload.id}`, {
        is_published: payload.is_published,
    });
}
