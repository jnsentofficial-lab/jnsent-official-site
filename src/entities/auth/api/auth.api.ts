import { clientApi, type ApiResponse } from "@/shared/lib/api/client";
import type { AuthSessionResponse, LoginPayload } from "@/entities/auth/model/auth.type";

export async function loginAdminFetch(payload: LoginPayload) {
    return clientApi.post<ApiResponse<AuthSessionResponse>>("/api/auth/login", payload);
}

export async function getAdminSessionFetch() {
    return clientApi.get<ApiResponse<AuthSessionResponse>>("/api/auth/session");
}

export async function logoutAdminFetch() {
    return clientApi.post<ApiResponse<AuthSessionResponse>>("/api/auth/logout");
}
