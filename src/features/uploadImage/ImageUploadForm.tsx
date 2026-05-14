"use client";

import { ChangeEvent, useState } from "react";
import { useUploadImageMutation } from "@/entities/asset/api/asset.query";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxSizeBytes = 5 * 1024 * 1024;

export function ImageUploadForm() {
    const [message, setMessage] = useState("이미지를 선택해주세요.");
    const [imageUrl, setImageUrl] = useState("");
    const uploadImage = useUploadImageMutation();

    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        setImageUrl("");

        if (!file) {
            setMessage("이미지를 선택해주세요.");
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            setMessage("JPG, PNG, WEBP 파일만 업로드할 수 있습니다.");
            return;
        }

        if (file.size > maxSizeBytes) {
            setMessage("5MB 이하 이미지만 업로드할 수 있습니다.");
            return;
        }

        setMessage("이미지를 업로드하고 있습니다.");

        try {
            const result = await uploadImage.mutateAsync(file);
            setImageUrl(result.result.url);
            setMessage(`${file.name} 업로드 완료`);
        } catch {
            setMessage("이미지 업로드에 실패했습니다.");
            return;
        }
    }

    return (
        <div className="grid gap-3.5">
            <label className="grid gap-2 font-bold text-slate-800">
                이미지 파일
                <input
                    className="min-h-12 rounded-lg border border-dashed border-slate-400 bg-slate-50 p-3"
                    accept="image/jpeg,image/png,image/webp"
                    disabled={uploadImage.isPending}
                    onChange={handleChange}
                    type="file"
                />
            </label>
            <p
                className="m-0 font-bold text-slate-700"
                role="status"
            >
                {message}
            </p>
            {imageUrl ? (
                <a
                    className="font-bold text-blue-700"
                    href={imageUrl}
                    rel="noreferrer"
                    target="_blank"
                >
                    업로드 이미지 열기
                </a>
            ) : null}
        </div>
    );
}
