import { clientApi, type ApiResponse } from "@/shared/lib/api/client";
import { serverApi } from "@/shared/lib/api/server";
import type { PageContent, TogglePageContentPayload, UpsertPageContentPayload } from "@/entities/pageContent/model/pageContent.type";

export async function getPublishedPageContentFetch(slug: string) {
    return clientApi.get<ApiResponse<PageContent | null>>(`/api/page-contents/${slug}`);
}

export async function getAdminPageContentsFetch() {
    return clientApi.get<ApiResponse<PageContent[]>>("/api/admin/page-contents");
}

export async function upsertPageContentFetch(payload: UpsertPageContentPayload) {
    return clientApi.post<ApiResponse<PageContent>>("/api/admin/page-contents", payload);
}

export async function togglePageContentFetch(payload: TogglePageContentPayload) {
    return clientApi.patch<ApiResponse<PageContent>>(`/api/admin/page-contents/${payload.id}`, {
        is_published: payload.is_published,
    });
}
