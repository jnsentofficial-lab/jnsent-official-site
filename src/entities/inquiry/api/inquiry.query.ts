import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createInquiryCommentFetch, createInquiryFetch, getAdminInquiriesFetch, getInquiryCommentsFetch, updateInquiryStatusFetch } from "@/entities/inquiry/api/inquiry.api";
import type { CreateInquiryCommentPayload, CreateInquiryPayload, Inquiry, InquiryComment, UpdateInquiryStatusPayload } from "@/entities/inquiry/model/inquiry.type";
import { useToastStore } from "@/shared/model/stores/useToastStore";

export const InquiryRoutes = {
    ADMIN_INQUIRIES: "admin:inquiries",
    ADMIN_INQUIRY_COMMENTS: "admin:inquiryComments",
    PUBLIC_INQUIRIES: "public:inquiries",
} as const;

export const useCreateInquiryMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = InquiryRoutes.PUBLIC_INQUIRIES;
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useCreateInquiryMutation"],
        mutationFn: (payload: CreateInquiryPayload) => createInquiryFetch(payload),
        onSuccess: () => {
            setToast({ msg: "문의가 접수되었어요", time: 3, type: "success" });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useAdminInquiriesQuery = () => {
    const MUTATION_KEY = InquiryRoutes.ADMIN_INQUIRIES;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, "useAdminInquiriesQuery"],
        queryFn: () => getAdminInquiriesFetch(),
        staleTime: 0,
    });

    const response: Inquiry[] = data?.result ?? [];
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useUpdateInquiryStatusMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = InquiryRoutes.ADMIN_INQUIRIES;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useUpdateInquiryStatusMutation"],
        mutationFn: (payload: UpdateInquiryStatusPayload) => updateInquiryStatusFetch(payload),
        onSuccess: () => {
            setToast({ msg: "문의 상태를 변경했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};

export const useInquiryCommentsQuery = (inquiryId?: string) => {
    const MUTATION_KEY = InquiryRoutes.ADMIN_INQUIRY_COMMENTS;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, inquiryId, "useInquiryCommentsQuery"],
        queryFn: () => getInquiryCommentsFetch(inquiryId ?? ""),
        enabled: Boolean(inquiryId),
        staleTime: 0,
    });

    const response: InquiryComment[] = data?.result ?? [];
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useCreateInquiryCommentMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = InquiryRoutes.ADMIN_INQUIRY_COMMENTS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useCreateInquiryCommentMutation"],
        mutationFn: (payload: CreateInquiryCommentPayload) => createInquiryCommentFetch(payload),
        onSuccess: (_data, payload) => {
            setToast({ msg: "담당자 답변을 저장했어요", time: 3, type: "success" });
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY, payload.inquiry_id] });
        },
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
