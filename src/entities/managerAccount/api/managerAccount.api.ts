import { clientApi, type ApiResponse } from "@/shared/lib/api/client";
import type { DeleteManagerAccountPayload, ManagerAccount, UpsertManagerAccountPayload } from "@/entities/managerAccount/model/managerAccount.type";

export async function getManagerAccountsFetch() {
    return clientApi.get<ApiResponse<ManagerAccount[]>>("/api/admin/account/manager");
}

export async function createManagerAccountFetch(payload: UpsertManagerAccountPayload) {
    return clientApi.post<ApiResponse<ManagerAccount>>("/api/admin/account/manager", payload);
}

export async function updateManagerAccountFetch(payload: UpsertManagerAccountPayload) {
    return clientApi.patch<ApiResponse<ManagerAccount>>(`/api/admin/account/manager/${payload.id}`, payload);
}

export async function deleteManagerAccountFetch(payload: DeleteManagerAccountPayload) {
    return clientApi.delete<ApiResponse<ManagerAccount>>(`/api/admin/account/manager/${payload.id}`);
}
