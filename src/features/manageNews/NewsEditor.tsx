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

const formClassName = "grid gap-8";
const labelClassName = "flex flex-col gap-[0.8rem] font-[NanumSquare]";
const inputClassName = "h-[5.2rem] border border-[var(--adaptive-grey200)] hover:border-[var(--adaptive-grey700)] px-4 text-lg font-semibold";
// const inputClassName = "h-14 border border-black px-4 text-lg font-semibold";
const statusClassName = "m-0 text-base font-bold text-[var(--adaptiveGreen700)]";
const buttonClassName = "fixed right-0 bottom-0 min-h-16 w-[calc((100vw-24rem)*0.42)] bg-black text-xl font-black text-white max-[120rem]:static max-[120rem]:w-full";
const thumbnailButtonClassName = "grid gap-3 border p-3 text-left transition hover:border-black";

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
    const effectiveThumbnailUrl = selectedThumbnailUrl && imageUrls.includes(selectedThumbnailUrl) ? selectedThumbnailUrl : (imageUrls[0] ?? null);

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
                제목 <span className="text-[var(--adaptiveRed500)]">*</span>
                <input
                    className={inputClassName}
                    onChange={(event) => {
                        setTitle(event.target.value);
                        if (!news) {
                            setSlug(event.target.value.trim().toLowerCase().replace(/\s+/g, "-") || `news-${Date.now()}`);
                        }
                    }}
                    placeholder="제목을 입력해주세요"
                    required
                    type="text"
                    value={title}
                />
            </label>
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
                요약
                <input
                    className={inputClassName}
                    onChange={(event) => setSummary(event.target.value)}
                    placeholder="목록에 표시할 요약"
                    type="text"
                    value={summary}
                />
            </label>
            <section className="grid gap-4 border border-[var(--adaptiveGrey200)] bg-[var(--adaptiveGrey50)] p-5">
                <div className="flex items-center justify-between gap-3">
                    <strong className="text-xl font-black text-black">첨부된 이미지</strong>
                    <span className="text-sm font-black text-[var(--adaptiveGrey600)]">
                        {effectiveThumbnailUrl ? "선택한 이미지가 썸네일로 저장됩니다" : "본문 이미지가 없으면 썸네일 없이 저장됩니다"}
                    </span>
                </div>
                {imageUrls.length ? (
                    <div className="grid grid-cols-2 gap-3 max-[86rem]:grid-cols-1">
                        {imageUrls.map((imageUrl, index) => (
                            <UI.Button
                                className={`${thumbnailButtonClassName} ${effectiveThumbnailUrl === imageUrl ? "border-black bg-white" : "border-[var(--adaptiveGrey200)] bg-white"}`}
                                key={imageUrl}
                                onClick={() => setSelectedThumbnailUrl(imageUrl)}
                                type="button"
                            >
                                <img
                                    alt={`첨부 이미지 ${index + 1}`}
                                    className="h-28 w-full object-cover"
                                    src={imageUrl}
                                />
                                <span className="text-base font-black text-black">
                                    {index + 1}번째 이미지{effectiveThumbnailUrl === imageUrl ? " / 현재 썸네일" : ""}
                                </span>
                            </UI.Button>
                        ))}
                    </div>
                ) : (
                    <p className="m-0 text-base font-semibold text-[var(--adaptiveGrey600)]">본문 에디터에서 이미지를 업로드하면 이 영역에 썸네일 후보로 표시됩니다.</p>
                )}
            </section>

            <label className={labelClassName}>
                본문
                <RichTextEditor
                    value={body}
                    onChange={setBody}
                    onImageUpload={handleImageUpload}
                    placeholder="NEWS 본문을 입력하세요."
                />
            </label>

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
                {upsertNews.isPending ? "저장 중" : news ? "수정하기" : "답변 등록하기"}
            </UI.Button>
        </form>
    );
}
