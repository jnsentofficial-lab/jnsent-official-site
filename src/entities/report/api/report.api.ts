import { clientApi, type ApiResponse } from "@/shared/lib/api/client";
import type { CreateReportPayload, Report } from "@/entities/report/model/report.type";

export async function getReportsFetch(pathname: string) {
    const query = pathname ? `?pathname=${encodeURIComponent(pathname)}` : "";
    return clientApi.get<ApiResponse<Report[]>>(`/api/reports${query}`);
}

export async function createReportFetch(payload: CreateReportPayload) {
    return clientApi.post<ApiResponse<Report>>("/api/reports", payload);
}
