import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminNewsFetch, getPublishedNewsBySlugFetch, getPublishedNewsFetch, toggleNewsFetch, upsertNewsFetch } from "@/entities/news/api/news.api";
import type { News, ToggleNewsPayload, UpsertNewsPayload } from "@/entities/news/model/news.type";
import { useToastStore } from "@/shared/model/stores/useToastStore";

export const NewsRoutes = {
    ADMIN_NEWS: "admin:news",
    PUBLIC_NEWS: "public:news",
    PUBLIC_NEWS_DETAIL: "public:newsDetail",
} as const;

export const usePublishedNewsQuery = (limit?: number) => {
    const MUTATION_KEY = NewsRoutes.PUBLIC_NEWS;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, limit ?? "all", "usePublishedNewsQuery"],
        queryFn: () => getPublishedNewsFetch(limit),
    });

    const response: News[] = data?.result ?? [];
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const usePublishedNewsDetailQuery = (slug: string) => {
    const MUTATION_KEY = NewsRoutes.PUBLIC_NEWS_DETAIL;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, slug, "usePublishedNewsDetailQuery"],
        queryFn: () => getPublishedNewsBySlugFetch(slug),
        enabled: Boolean(slug),
    });

    const response: News | null = data?.result ?? null;
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useAdminNewsQuery = () => {
    const MUTATION_KEY = NewsRoutes.ADMIN_NEWS;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useAdminNewsQuery"],
        queryFn: () => getAdminNewsFetch(),
        staleTime: 0,
    });

    const response: News[] = data?.result ?? [];
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useUpsertNewsMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = NewsRoutes.ADMIN_NEWS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useUpsertNewsMutation"],
        mutationFn: (payload: UpsertNewsPayload) => upsertNewsFetch(payload),
        onSuccess: () => {
            setToast({ msg: "NEWS를 저장했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useToggleNewsMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = NewsRoutes.ADMIN_NEWS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useToggleNewsMutation"],
        mutationFn: (payload: ToggleNewsPayload) => toggleNewsFetch(payload),
        onSuccess: () => {
            setToast({ msg: "NEWS 상태를 변경했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
