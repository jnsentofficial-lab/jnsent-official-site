import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdminSessionFetch, loginAdminFetch, logoutAdminFetch } from "@/entities/auth/api/auth.api";
import type { AuthSessionResponse, LoginPayload } from "@/entities/auth/model/auth.type";
import { useToastStore } from "@/shared/model/stores/useToastStore";

export const AuthRoutes = {
    ADMIN_SESSION: "auth:adminSession",
    ADMIN_LOGIN: "auth:adminLogin",
    ADMIN_LOGOUT: "auth:adminLogout",
} as const;

export const useAdminSessionQuery = () => {
    const MUTATION_KEY = AuthRoutes.ADMIN_SESSION;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useAdminSessionQuery"],
        queryFn: () => getAdminSessionFetch(),
        staleTime: 0,
        retry: false,
    });

    const response: AuthSessionResponse | undefined = data?.result;
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useLoginAdminMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = AuthRoutes.ADMIN_LOGIN;
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useLoginAdminMutation"],
        mutationFn: (payload: LoginPayload) => loginAdminFetch(payload),
        onSuccess: () => {
            setToast({ msg: "로그인되었습니다.", time: 3, type: "success" });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useLogoutAdminMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = AuthRoutes.ADMIN_LOGOUT;
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useLogoutAdminMutation"],
        mutationFn: () => logoutAdminFetch(),
        onSuccess: () => {
            setToast({ msg: "로그아웃되었습니다.", time: 3, type: "success" });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
