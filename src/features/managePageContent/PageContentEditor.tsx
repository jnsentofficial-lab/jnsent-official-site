"use client";

import { FormEvent, useState } from "react";
import { useUpsertPageContentMutation } from "@/entities/pageContent/api/pageContent.query";
import type { Json } from "@/shared/types/Database";
import UI from "@/shared/ui/UIComponent";

const formClassName = "grid gap-3.5";
const labelClassName = "grid gap-2 font-bold text-slate-800";
const inputClassName = "min-h-11 rounded-lg border border-slate-300 px-3.5";
const textareaClassName = "min-h-[13.2rem] resize-y rounded-lg border border-slate-300 px-3.5 py-3";
const statusClassName = "m-0 text-sm font-bold text-green-700";
const buttonClassName = "min-h-11 rounded-lg bg-blue-500 font-bold text-white";

export function PageContentEditor() {
    const [statusMessage, setStatusMessage] = useState("");
    const upsertPageContent = useUpsertPageContentMutation();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatusMessage("저장 중입니다.");

        const formData = new FormData(event.currentTarget);
        const slug = String(formData.get("slug") ?? "").trim();
        const bodyText = String(formData.get("body") ?? "{}").trim() || "{}";
        let body: Json;

        try {
            body = JSON.parse(bodyText) as Json;
        } catch {
            setStatusMessage("본문 JSON 형식이 올바르지 않습니다.");
            return;
        }

        try {
            await upsertPageContent.mutateAsync({
                slug,
                title: String(formData.get("title") ?? "").trim(),
                description: String(formData.get("description") ?? "").trim() || null,
                body,
                seo_title: String(formData.get("seoTitle") ?? "").trim() || null,
                seo_description: String(formData.get("seoDescription") ?? "").trim() || null,
            });
            setStatusMessage("콘텐츠가 저장되었습니다.");
        } catch {
            setStatusMessage("콘텐츠 저장에 실패했습니다.");
        }
    }

    return (
        <form
            className={formClassName}
            onSubmit={handleSubmit}
        >
            <label className={labelClassName}>
                페이지 slug
                <input
                    className={inputClassName}
                    name="slug"
                    placeholder="about"
                    required
                    type="text"
                />
            </label>
            <label className={labelClassName}>
                제목
                <input
                    className={inputClassName}
                    name="title"
                    placeholder="페이지 제목"
                    required
                    type="text"
                />
            </label>
            <label className={labelClassName}>
                설명
                <input
                    className={inputClassName}
                    name="description"
                    placeholder="페이지 설명"
                    type="text"
                />
            </label>
            <label className={labelClassName}>
                본문 JSON
                <textarea
                    className={textareaClassName}
                    name="body"
                    placeholder='{"sections":[]}'
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
                콘텐츠 저장
            </UI.Button>
        </form>
    );
}
