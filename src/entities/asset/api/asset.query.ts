import { useMutation } from "@tanstack/react-query";
import { uploadImageFetch } from "@/entities/asset/api/asset.api";
import { useToastStore } from "@/shared/model/stores/useToastStore";

export const AssetRoutes = {
    ADMIN_UPLOADS: "admin:uploads",
} as const;

export const useUploadImageMutation = () => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = AssetRoutes.ADMIN_UPLOADS;
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useUploadImageMutation"],
        mutationFn: (payload: File) => uploadImageFetch(payload),
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
