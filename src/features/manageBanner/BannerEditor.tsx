"use client";

import { FormEvent, useState } from "react";
import { useCreateBannerMutation } from "@/entities/banner/api/banner.query";
import UI from "@/shared/ui/UIComponent";

const formClassName = "grid gap-3.5";
const labelClassName = "grid gap-2 font-bold text-slate-800";
const inputClassName = "min-h-11 rounded-lg border border-slate-300 px-3.5";
const statusClassName = "m-0 text-sm font-bold text-green-700";
const buttonClassName = "min-h-11 rounded-lg bg-blue-500 font-bold text-white";

export function BannerEditor() {
    const [statusMessage, setStatusMessage] = useState("");
    const createBanner = useCreateBannerMutation();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatusMessage("저장 중입니다.");

        const formData = new FormData(event.currentTarget);
        try {
            await createBanner.mutateAsync({
                title: String(formData.get("title") ?? "").trim(),
                subtitle: String(formData.get("subtitle") ?? "").trim() || null,
                image_url: String(formData.get("imageUrl") ?? "").trim(),
                link_url: String(formData.get("linkUrl") ?? "").trim() || null,
            });
            setStatusMessage("배너가 저장되었습니다.");
        } catch {
            setStatusMessage("배너 저장에 실패했습니다.");
        }
    }

    return (
        <form
            className={formClassName}
            onSubmit={handleSubmit}
        >
            <label className={labelClassName}>
                제목
                <input
                    className={inputClassName}
                    name="title"
                    placeholder="배너 제목"
                    required
                    type="text"
                />
            </label>
            <label className={labelClassName}>
                설명
                <input
                    className={inputClassName}
                    name="subtitle"
                    placeholder="배너 설명"
                    type="text"
                />
            </label>
            <label className={labelClassName}>
                이미지 URL
                <input
                    className={inputClassName}
                    name="imageUrl"
                    placeholder="/images/banner.webp"
                    required
                    type="text"
                />
            </label>
            <label className={labelClassName}>
                연결 URL
                <input
                    className={inputClassName}
                    name="linkUrl"
                    placeholder="/bjSupport"
                    type="text"
                />
            </label>
            {statusMessage ? (
                <p
                    className={statusClassName}
                    role="status"
                >
                    {statusMessage}
                </p>
            ) : null}
            <UI.Button
                className={buttonClassName}
                type="submit"
            >
                배너 저장
            </UI.Button>
        </form>
    );
}
