import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBannerFetch, getAdminBannersFetch, getPublishedBannersFetch, toggleBannerFetch } from "@/entities/banner/api/banner.api";
import type { Banner, CreateBannerPayload, ToggleBannerPayload } from "@/entities/banner/model/banner.type";
import { useToastStore } from "@/shared/model/stores/useToastStore";

export const BannerRoutes = {
    ADMIN_BANNERS: "admin:banners",
    PUBLIC_BANNERS: "public:banners",
} as const;

export const usePublishedBannersQuery = () => {
    const MUTATION_KEY = BannerRoutes.PUBLIC_BANNERS;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "usePublishedBannersQuery"],
        queryFn: () => getPublishedBannersFetch(),
    });

    const response: Banner[] = data?.result ?? [];
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useAdminBannersQuery = () => {
    const MUTATION_KEY = BannerRoutes.ADMIN_BANNERS;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useAdminBannersQuery"],
        queryFn: () => getAdminBannersFetch(),
        staleTime: 0,
    });

    const response: Banner[] = data?.result ?? [];
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useCreateBannerMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = BannerRoutes.ADMIN_BANNERS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useCreateBannerMutation"],
        mutationFn: (payload: CreateBannerPayload) => createBannerFetch(payload),
        onSuccess: () => {
            setToast({ msg: "배너를 저장했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useToggleBannerMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = BannerRoutes.ADMIN_BANNERS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useToggleBannerMutation"],
        mutationFn: (payload: ToggleBannerPayload) => toggleBannerFetch(payload),
        onSuccess: () => {
            setToast({ msg: "배너 상태를 변경했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
