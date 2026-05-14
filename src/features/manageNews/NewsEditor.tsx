"use client";

import { FormEvent, useState } from "react";
import { useUpsertNewsMutation } from "@/entities/news/api/news.query";
import type { Json } from "@/shared/types/Database";
import UI from "@/shared/ui/UIComponent";

const formClassName = "grid gap-3.5";
const labelClassName = "grid gap-2 font-bold text-slate-800";
const inputClassName = "min-h-11 rounded-lg border border-slate-300 px-3.5";
const textareaClassName = "min-h-[13.2rem] resize-y rounded-lg border border-slate-300 px-3.5 py-3";
const statusClassName = "m-0 text-sm font-bold text-green-700";
const buttonClassName = "min-h-11 rounded-lg bg-blue-500 font-bold text-white";

export function NewsEditor() {
    const [statusMessage, setStatusMessage] = useState("");
    const upsertNews = useUpsertNewsMutation();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatusMessage("저장 중입니다.");

        const formData = new FormData(event.currentTarget);
        const bodyText = String(formData.get("body") ?? "{}").trim() || "{}";
        let body: Json;

        try {
            body = JSON.parse(bodyText) as Json;
        } catch {
            setStatusMessage("본문 JSON 형식이 올바르지 않습니다.");
            return;
        }

        try {
            await upsertNews.mutateAsync({
                slug: String(formData.get("slug") ?? "").trim(),
                title: String(formData.get("title") ?? "").trim(),
                summary: String(formData.get("summary") ?? "").trim() || null,
                body,
                seo_title: String(formData.get("seoTitle") ?? "").trim() || null,
                seo_description: String(formData.get("seoDescription") ?? "").trim() || null,
            });
            setStatusMessage("NEWS가 저장되었습니다.");
        } catch {
            setStatusMessage("NEWS 저장에 실패했습니다.");
        }
    }

    return (
        <form
            className={formClassName}
            onSubmit={handleSubmit}
        >
            <label className={labelClassName}>
                slug
                <input
                    className={inputClassName}
                    name="slug"
                    placeholder="notice"
                    required
                    type="text"
                />
            </label>
            <label className={labelClassName}>
                제목
                <input
                    className={inputClassName}
                    name="title"
                    placeholder="NEWS 제목"
                    required
                    type="text"
                />
            </label>
            <label className={labelClassName}>
                요약
                <input
                    className={inputClassName}
                    name="summary"
                    placeholder="목록에 표시할 요약"
                    type="text"
                />
            </label>
            <label className={labelClassName}>
                본문 JSON
                <textarea
                    className={textareaClassName}
                    name="body"
                    placeholder='{"content":[]}'
                />
            </label>
            <label className={labelClassName}>
                SEO 제목
                <input
                    className={inputClassName}
                    name="seoTitle"
                    placeholder="metadata title"
                    type="text"
                />
            </label>
            <label className={labelClassName}>
                SEO 설명
                <input
                    className={inputClassName}
                    name="seoDescription"
                    placeholder="metadata description"
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
                NEWS 저장
            </UI.Button>
        </form>
    );
}
