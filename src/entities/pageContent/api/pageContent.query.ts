import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminPageContentsFetch, getPublishedPageContentFetch, togglePageContentFetch, upsertPageContentFetch } from "@/entities/pageContent/api/pageContent.api";
import type { PageContent, TogglePageContentPayload, UpsertPageContentPayload } from "@/entities/pageContent/model/pageContent.type";
import { useToastStore } from "@/shared/model/stores/useToastStore";

export const PageContentRoutes = {
    ADMIN_PAGE_CONTENTS: "admin:pageContents",
    PUBLIC_PAGE_CONTENT: "public:pageContent",
} as const;

export const usePublishedPageContentQuery = (slug: string) => {
    const MUTATION_KEY = PageContentRoutes.PUBLIC_PAGE_CONTENT;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, slug, "usePublishedPageContentQuery"],
        queryFn: () => getPublishedPageContentFetch(slug),
    });

    const response: PageContent | null = data?.result ?? null;
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useAdminPageContentsQuery = () => {
    const MUTATION_KEY = PageContentRoutes.ADMIN_PAGE_CONTENTS;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useAdminPageContentsQuery"],
        queryFn: () => getAdminPageContentsFetch(),
        staleTime: 0,
    });

    const response: PageContent[] = data?.result ?? [];
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useUpsertPageContentMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = PageContentRoutes.ADMIN_PAGE_CONTENTS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useUpsertPageContentMutation"],
        mutationFn: (payload: UpsertPageContentPayload) => upsertPageContentFetch(payload),
        onSuccess: () => {
            setToast({ msg: "페이지 콘텐츠를 저장했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useTogglePageContentMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = PageContentRoutes.ADMIN_PAGE_CONTENTS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useTogglePageContentMutation"],
        mutationFn: (payload: TogglePageContentPayload) => togglePageContentFetch(payload),
        onSuccess: () => {
            setToast({ msg: "페이지 콘텐츠 상태를 변경했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
