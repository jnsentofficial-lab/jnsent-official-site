import { clientApi, type ApiResponse } from "@/shared/lib/api/client";
import type { UploadImageResponse } from "@/entities/asset/model/asset.type";

export async function uploadImageFetch(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return clientApi.post<ApiResponse<UploadImageResponse>>("/api/admin/uploads", formData);
}
