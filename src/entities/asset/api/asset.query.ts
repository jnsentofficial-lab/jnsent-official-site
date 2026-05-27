import { useMutation } from "@tanstack/react-query";
import { uploadImageFetch, uploadPublicImageFetch } from "@/entities/asset/api/asset.api";
import { useToastStore } from "@/shared/model/stores/useToastStore";

export const AssetRoutes = {
    ADMIN_UPLOADS: "admin:uploads",
    PUBLIC_UPLOADS: "public:uploads",
} as const;

export const useUploadImageMutation = (scope: "admin" | "public" = "admin") => {
    const { setToast } = useToastStore();
    const MUTATION_KEY = scope === "admin" ? AssetRoutes.ADMIN_UPLOADS : AssetRoutes.PUBLIC_UPLOADS;
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useUploadImageMutation"],
        mutationFn: (payload: File) => (scope === "admin" ? uploadImageFetch(payload) : uploadPublicImageFetch(payload)),
        onError: (err: Error) => {
            setToast({ msg: err.message ?? "에러 발생", time: 2, type: "fail" });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
