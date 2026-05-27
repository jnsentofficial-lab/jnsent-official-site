import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReportFetch, getReportsFetch } from "@/entities/report/api/report.api";
import type { CreateReportPayload, Report } from "@/entities/report/model/report.type";
import { useToastStore } from "@/shared/model/stores/useToastStore";

const EMPTY_REPORTS: Report[] = [];

export const ReportRoutes = {
    PUBLIC_REPORTS: "public:reports",
} as const;

export const useReportsQuery = (pathname: string, enabled = true) => {
    const MUTATION_KEY = ReportRoutes.PUBLIC_REPORTS;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, pathname, "useReportsQuery"],
        queryFn: () => getReportsFetch(pathname),
        enabled: enabled && Boolean(pathname),
    });

    const response: Report[] = data?.result ?? EMPTY_REPORTS;
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useCreateReportMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = ReportRoutes.PUBLIC_REPORTS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useCreateReportMutation"],
        mutationFn: (payload: CreateReportPayload) => createReportFetch(payload),
        onSuccess: (_response, payload) => {
            setToast({ msg: "리포트를 등록했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY, payload.pathname] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "리포트 등록 중 에러가 발생했어요", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
