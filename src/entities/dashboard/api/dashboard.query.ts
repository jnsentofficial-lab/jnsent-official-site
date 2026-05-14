import { useQuery } from "@tanstack/react-query";
import { getDashboardSummaryFetch } from "@/entities/dashboard/api/dashboard.api";
import type { DashboardSummary } from "@/entities/dashboard/model/dashboard.type";

export const DashboardRoutes = {
    ADMIN_DASHBOARD: "admin:dashboard",
} as const;

export const useDashboardSummaryQuery = () => {
    const MUTATION_KEY = DashboardRoutes.ADMIN_DASHBOARD;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useDashboardSummaryQuery"],
        queryFn: () => getDashboardSummaryFetch(),
        staleTime: 0,
    });

    const response: DashboardSummary | undefined = data?.result;
    return {
        data: response,
        isLoading,
        isError,
        error,
        isFetching,
        isFetched,
        refetch,
    };
};
