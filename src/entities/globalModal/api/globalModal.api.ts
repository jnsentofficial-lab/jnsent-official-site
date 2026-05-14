import { clientApi, type ApiResponse } from "@/shared/lib/api/client";
import { serverApi } from "@/shared/lib/api/server";
import type { CreateGlobalModalPayload, DeleteGlobalModalPayload, GlobalModal, ToggleGlobalModalPayload } from "@/entities/globalModal/model/globalModal.type";

export async function getVisibleGlobalModalsFetch() {
    return clientApi.get<ApiResponse<GlobalModal[]>>("/api/global-modals");
}

export async function getAdminGlobalModalsFetch() {
    return clientApi.get<ApiResponse<GlobalModal[]>>("/api/admin/global-modals");
}

export async function createGlobalModalFetch(payload: CreateGlobalModalPayload) {
    return clientApi.post<ApiResponse<GlobalModal>>("/api/admin/global-modals", payload);
}

export async function toggleGlobalModalFetch(payload: ToggleGlobalModalPayload) {
    return clientApi.patch<ApiResponse<GlobalModal>>(`/api/admin/global-modals/${payload.id}`, {
        is_visible: payload.is_visible,
    });
}

export async function deleteGlobalModalFetch(payload: DeleteGlobalModalPayload) {
    return clientApi.delete<ApiResponse<GlobalModal>>(`/api/admin/global-modals/${payload.id}`);
}
