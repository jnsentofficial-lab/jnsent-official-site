import { clientApi, type ApiResponse } from "@/shared/lib/api/client";
import { serverApi } from "@/shared/lib/api/server";
import type { DeleteNewsPayload, News, ToggleNewsPayload, UpsertNewsPayload } from "@/entities/news/model/news.type";

export async function getPublishedNewsFetch(limit?: number) {
    const query = limit ? `?limit=${limit}` : "";
    return clientApi.get<ApiResponse<News[]>>(`/api/news${query}`);
}

export async function getPublishedNewsBySlugFetch(slug: string) {
    return clientApi.get<ApiResponse<News | null>>(`/api/news/${slug}`);
}

export async function getAdminNewsFetch() {
    return clientApi.get<ApiResponse<News[]>>("/api/admin/news");
}

export async function upsertNewsFetch(payload: UpsertNewsPayload) {
    return clientApi.post<ApiResponse<News>>("/api/admin/news", payload);
}

export async function toggleNewsFetch(payload: ToggleNewsPayload) {
    return clientApi.patch<ApiResponse<News>>(`/api/admin/news/${payload.id}`, {
        is_published: payload.is_published,
    });
}

export async function deleteNewsFetch(payload: DeleteNewsPayload) {
    return clientApi.delete<ApiResponse<News>>(`/api/admin/news/${payload.id}`);
}
