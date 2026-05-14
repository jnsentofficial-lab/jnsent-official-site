import { NextRequest } from "next/server";
import sharp from "sharp";
import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export const runtime = "nodejs";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxSizeBytes = 5 * 1024 * 1024;
const bucketName = "public-images";

const errorMessages: Record<string, string> = {
    ASSET_SAVE_FAILED: "이미지 정보를 저장하지 못했습니다.",
    FORBIDDEN: "관리자 권한이 필요합니다.",
    INVALID_SIZE: "5MB 이하 이미지만 업로드할 수 있습니다.",
    INVALID_TYPE: "JPG, PNG, WEBP 파일만 업로드할 수 있습니다.",
    UPLOAD_FAILED: "이미지 업로드에 실패했습니다.",
};

async function uploadOptimizedImage(file: File) {
    if (!allowedTypes.includes(file.type)) {
        throw new Error("INVALID_TYPE");
    }

    if (file.size > maxSizeBytes) {
        throw new Error("INVALID_SIZE");
    }

    const supabase = createSupabaseServiceClient();
    const sourceBuffer = Buffer.from(await file.arrayBuffer());
    const optimizedBuffer = await sharp(sourceBuffer).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
    const filePath = `admin/${crypto.randomUUID()}.webp`;
    const { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, optimizedBuffer, {
        contentType: "image/webp",
        upsert: false,
    });

    if (uploadError) {
        throw new Error("UPLOAD_FAILED");
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    const { error: assetError } = await supabase.from("assets").insert({
        bucket: bucketName,
        path: filePath,
        url: data.publicUrl,
        mime_type: "image/webp",
        size_bytes: optimizedBuffer.byteLength,
        alt: file.name,
    });

    if (assetError) {
        throw new Error("ASSET_SAVE_FAILED");
    }

    return {
        url: data.publicUrl,
    };
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
        return apiError("이미지를 선택해주세요.", 400);
    }

    try {
        const result = await uploadOptimizedImage(file);

        return apiOk(result);
    } catch (error) {
        const code = error instanceof Error ? error.message : "UPLOAD_FAILED";
        const status = code === "FORBIDDEN" ? 403 : 400;

        return apiError(errorMessages[code] ?? errorMessages.UPLOAD_FAILED, status);
    }
}
