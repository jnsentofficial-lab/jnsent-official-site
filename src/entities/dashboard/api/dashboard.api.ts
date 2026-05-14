import { clientApi, type ApiResponse } from "@/shared/lib/api/client";
import type { DashboardSummary } from "@/entities/dashboard/model/dashboard.type";

export async function getDashboardSummaryFetch() {
    return clientApi.get<ApiResponse<DashboardSummary>>("/api/admin/dashboard");
}
