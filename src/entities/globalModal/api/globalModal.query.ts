import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createGlobalModalFetch,
    deleteGlobalModalFetch,
    getAdminGlobalModalsFetch,
    getVisibleGlobalModalsFetch,
    toggleGlobalModalFetch,
    updateGlobalModalFetch,
} from "@/entities/globalModal/api/globalModal.api";
import type { CreateGlobalModalPayload, DeleteGlobalModalPayload, GlobalModal, ToggleGlobalModalPayload, UpdateGlobalModalPayload } from "@/entities/globalModal/model/globalModal.type";
import { useToastStore } from "@/shared/model/stores/useToastStore";

export const GlobalModalRoutes = {
    ADMIN_GLOBAL_MODALS: "admin:globalModals",
    PUBLIC_GLOBAL_MODALS: "public:globalModals",
} as const;

export const useVisibleGlobalModalsQuery = (enabled = true) => {
    const MUTATION_KEY = GlobalModalRoutes.PUBLIC_GLOBAL_MODALS;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useVisibleGlobalModalsQuery"],
        queryFn: () => getVisibleGlobalModalsFetch(),
        enabled,
    });

    const response: GlobalModal[] = data?.result ?? [];
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useAdminGlobalModalsQuery = () => {
    const MUTATION_KEY = GlobalModalRoutes.ADMIN_GLOBAL_MODALS;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useAdminGlobalModalsQuery"],
        queryFn: () => getAdminGlobalModalsFetch(),
        staleTime: 0,
    });

    const response: GlobalModal[] = data?.result ?? [];
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useCreateGlobalModalMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = GlobalModalRoutes.ADMIN_GLOBAL_MODALS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useCreateGlobalModalMutation"],
        mutationFn: (payload: CreateGlobalModalPayload) => createGlobalModalFetch(payload),
        onSuccess: () => {
            setToast({ msg: "모달을 저장했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useToggleGlobalModalMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = GlobalModalRoutes.ADMIN_GLOBAL_MODALS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useToggleGlobalModalMutation"],
        mutationFn: (payload: ToggleGlobalModalPayload) => toggleGlobalModalFetch(payload),
        onSuccess: () => {
            setToast({ msg: "모달 상태를 변경했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useUpdateGlobalModalMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = GlobalModalRoutes.ADMIN_GLOBAL_MODALS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useUpdateGlobalModalMutation"],
        mutationFn: (payload: UpdateGlobalModalPayload) => updateGlobalModalFetch(payload),
        onSuccess: () => {
            setToast({ msg: "모달을 수정했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useDeleteGlobalModalMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = GlobalModalRoutes.ADMIN_GLOBAL_MODALS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useDeleteGlobalModalMutation"],
        mutationFn: (payload: DeleteGlobalModalPayload) => deleteGlobalModalFetch(payload),
        onSuccess: () => {
            setToast({ msg: "모달을 삭제했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
