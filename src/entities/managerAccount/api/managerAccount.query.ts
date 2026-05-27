import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkManagerAccountLoginIdFetch, createManagerAccountFetch, deleteManagerAccountFetch, getManagerAccountsFetch, updateManagerAccountFetch } from "@/entities/managerAccount/api/managerAccount.api";
import type { DeleteManagerAccountPayload, ManagerAccount, UpsertManagerAccountPayload } from "@/entities/managerAccount/model/managerAccount.type";
import { useToastStore } from "@/shared/model/stores/useToastStore";

export const ManagerAccountRoutes = {
    ADMIN_MANAGER_ACCOUNTS: "admin:managerAccounts",
    ADMIN_MANAGER_ACCOUNTS_LOGIN_ID: "admin:managerAccounts:loginId",
} as const;

export const useManagerAccountsQuery = () => {
    const MUTATION_KEY = ManagerAccountRoutes.ADMIN_MANAGER_ACCOUNTS;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useManagerAccountsQuery"],
        queryFn: () => getManagerAccountsFetch(),
        staleTime: 0,
    });

    const response: ManagerAccount[] = data?.result ?? [];
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useCreateManagerAccountMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = ManagerAccountRoutes.ADMIN_MANAGER_ACCOUNTS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useCreateManagerAccountMutation"],
        mutationFn: (payload: UpsertManagerAccountPayload) => createManagerAccountFetch(payload),
        onSuccess: () => {
            setToast({ msg: "담당자 계정을 등록했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useCheckManagerAccountLoginIdMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = ManagerAccountRoutes.ADMIN_MANAGER_ACCOUNTS_LOGIN_ID;
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useCheckManagerAccountLoginIdMutation"],
        mutationFn: (loginId: string) => checkManagerAccountLoginIdFetch(loginId),
        onSuccess: (response) => {
            setToast({ msg: response.result.available ? "사용 가능한 아이디입니다." : "이미 사용 중인 아이디입니다.", time: 2, type: response.result.available ? "success" : "warning" });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useUpdateManagerAccountMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = ManagerAccountRoutes.ADMIN_MANAGER_ACCOUNTS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useUpdateManagerAccountMutation"],
        mutationFn: (payload: UpsertManagerAccountPayload) => updateManagerAccountFetch(payload),
        onSuccess: () => {
            setToast({ msg: "담당자 계정을 수정했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useDeleteManagerAccountMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = ManagerAccountRoutes.ADMIN_MANAGER_ACCOUNTS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useDeleteManagerAccountMutation"],
        mutationFn: (payload: DeleteManagerAccountPayload) => deleteManagerAccountFetch(payload),
        onSuccess: () => {
            setToast({ msg: "담당자 계정을 삭제했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
