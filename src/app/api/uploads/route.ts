import { NextRequest } from "next/server";
import { uploadOptimizedImage } from "@/shared/lib/asset.server";
import { apiError, apiOk } from "@/shared/lib/api/server";

export const runtime = "nodejs";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxSizeBytes = 5 * 1024 * 1024;

const errorMessages: Record<string, string> = {
    ASSET_SAVE_FAILED: "이미지 정보를 저장하지 못했습니다.",
    INVALID_SIZE: "5MB 이하 이미지만 업로드할 수 있습니다.",
    INVALID_TYPE: "JPG, PNG, WEBP 파일만 업로드할 수 있습니다.",
    UPLOAD_FAILED: "이미지 업로드에 실패했습니다.",
};

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
        return apiError("이미지를 선택해주세요.", 400);
    }

    try {
        if (!allowedTypes.includes(file.type)) {
            throw new Error("INVALID_TYPE");
        }

        if (file.size > maxSizeBytes) {
            throw new Error("INVALID_SIZE");
        }

        const result = await uploadOptimizedImage(file);

        return apiOk(result);
    } catch (error) {
        const code = error instanceof Error ? error.message : "UPLOAD_FAILED";

        return apiError(errorMessages[code] ?? errorMessages.UPLOAD_FAILED, 400);
    }
}
