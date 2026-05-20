"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useUploadImageMutation } from "@/entities/asset/api/asset.query";
import { useUpsertNewsMutation } from "@/entities/news/api/news.query";
import type { News } from "@/entities/news/model/news.type";
import { emptyRichTextContent, extractRichTextImages, toJsonContent, toRichTextContent } from "@/shared/lib/richText/richText";
import type { RichTextContent } from "@/shared/lib/richText/richText";
import { RichTextEditor } from "@/shared/ui/richText/RichTextEditor";
import UI from "@/shared/ui/UIComponent";

type NewsEditorProps = {
    news?: News | null;
};

const formClassName = "grid gap-3.5";
const labelClassName = "grid gap-2 font-bold text-slate-800";
const inputClassName = "min-h-11 rounded-lg border border-slate-300 px-3.5";
const statusClassName = "m-0 text-sm font-bold text-green-700";
const buttonClassName = "min-h-11 rounded-lg bg-blue-500 font-bold text-white";

export function NewsEditor({ news }: NewsEditorProps) {
    const [statusMessage, setStatusMessage] = useState("");
    const [slug, setSlug] = useState("");
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    const [body, setBody] = useState<RichTextContent>(emptyRichTextContent);
    const [selectedThumbnailUrl, setSelectedThumbnailUrl] = useState<string | null>(null);
    const uploadImage = useUploadImageMutation();
    const upsertNews = useUpsertNewsMutation();
    const imageUrls = useMemo(() => extractRichTextImages(body), [body]);
    const effectiveThumbnailUrl = selectedThumbnailUrl && imageUrls.includes(selectedThumbnailUrl) ? selectedThumbnailUrl : imageUrls[0] ?? null;

    useEffect(() => {
        setStatusMessage("");
        setSlug(news?.slug ?? "");
        setTitle(news?.title ?? "");
        setSummary(news?.summary ?? "");
        setSeoTitle(news?.seo_title ?? "");
        setSeoDescription(news?.seo_description ?? "");
        setBody(news ? toRichTextContent(news.body) : emptyRichTextContent);
        setSelectedThumbnailUrl(news?.thumbnail_url ?? null);
    }, [news]);

    async function handleImageUpload(file: File) {
        const response = await uploadImage.mutateAsync(file);

        return response.result.url;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatusMessage("저장 중입니다.");

        try {
            await upsertNews.mutateAsync({
                slug: slug.trim(),
                title: title.trim(),
                summary: summary.trim() || null,
                body: toJsonContent(body),
                thumbnail_url: effectiveThumbnailUrl,
                seo_title: seoTitle.trim() || null,
                seo_description: seoDescription.trim() || null,
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
                    onChange={(event) => setSlug(event.target.value)}
                    placeholder="notice"
                    required
                    type="text"
                    value={slug}
                />
            </label>
            <label className={labelClassName}>
                제목
                <input
                    className={inputClassName}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="NEWS 제목"
                    required
                    type="text"
                    value={title}
                />
            </label>
            <label className={labelClassName}>
                요약
                <input
                    className={inputClassName}
                    onChange={(event) => setSummary(event.target.value)}
                    placeholder="목록에 표시할 요약"
                    type="text"
                    value={summary}
                />
            </label>
            <label className={labelClassName}>
                본문
                <RichTextEditor
                    value={body}
                    onChange={setBody}
                    onImageUpload={handleImageUpload}
                    placeholder="NEWS 본문을 입력하세요."
                />
            </label>
            <section className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                    <strong className="text-sm text-slate-800">첨부 이미지</strong>
                    <span className="text-xs font-bold text-slate-500">{effectiveThumbnailUrl ? "선택 썸네일 적용" : "썸네일 없음"}</span>
                </div>
                {imageUrls.length ? (
                    <div className="grid grid-cols-2 gap-3 max-[86rem]:grid-cols-1">
                        {imageUrls.map((imageUrl, index) => (
                            <button
                                className={`grid gap-2 rounded-lg border p-2 text-left ${effectiveThumbnailUrl === imageUrl ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white"}`}
                                key={imageUrl}
                                onClick={() => setSelectedThumbnailUrl(imageUrl)}
                                type="button"
                            >
                                <img
                                    alt={`첨부 이미지 ${index + 1}`}
                                    className="h-24 w-full rounded-md object-cover"
                                    src={imageUrl}
                                />
                                <span className="text-xs font-bold text-slate-700">{index + 1}번째 이미지{effectiveThumbnailUrl === imageUrl ? " / 썸네일" : ""}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="m-0 text-sm text-slate-500">본문에 업로드한 이미지가 없습니다.</p>
                )}
            </section>
            <label className={labelClassName}>
                SEO 제목
                <input
                    className={inputClassName}
                    onChange={(event) => setSeoTitle(event.target.value)}
                    placeholder="metadata title"
                    type="text"
                    value={seoTitle}
                />
            </label>
            <label className={labelClassName}>
                SEO 설명
                <input
                    className={inputClassName}
                    onChange={(event) => setSeoDescription(event.target.value)}
                    placeholder="metadata description"
                    type="text"
                    value={seoDescription}
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
                disabled={upsertNews.isPending}
                type="submit"
            >
                {upsertNews.isPending ? "저장 중" : news ? "NEWS 수정" : "NEWS 저장"}
            </UI.Button>
        </form>
    );
}
