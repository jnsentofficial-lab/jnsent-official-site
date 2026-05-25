"use client";

import { usePublishedNewsDetailQuery, usePublishedNewsQuery } from "@/entities/news/api/news.query";
import { RichTextRenderer } from "@/shared/ui/richText/RichTextRenderer";
import Skeleton from "@/shared/ui/kit/Skeleton";
import UI from "@/shared/ui/UIComponent";

type AnalysisProps = {
    slug: string;
};

function formatViewCount(value?: number) {
    return new Intl.NumberFormat("ko-KR").format(value ?? 0);
}

export function Analysis({ slug }: AnalysisProps) {
    const { data: news, isLoading } = usePublishedNewsDetailQuery(slug);
    const { data: newsList } = usePublishedNewsQuery();
    const currentIndex = newsList.findIndex((item) => item.slug === slug);
    const prevNews = currentIndex > 0 ? newsList[currentIndex - 1] : null;
    const nextNews = currentIndex >= 0 && currentIndex < newsList.length - 1 ? newsList[currentIndex + 1] : null;

    return (
        <>
            <Skeleton.Article
                target={!isLoading}
                className={{ element: "pt-[12rem] pb-[14rem]" }}
            >
                <div className="mx-auto w-[min(68rem,calc(100%_-_3.2rem))]">
                    <h1 className="mt-0 mb-6 text-5xl font-black leading-[1.35] text-black max-[86rem]:text-4xl">{news?.title ?? "뉴스를 찾을 수 없습니다"}</h1>
                    <p className="mb-12 text-lg font-black text-[var(--adaptiveGrey500)]">
                        {news?.published_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(news.published_at)) : "날짜 미정"}
                        <span className="mx-3">|</span>
                        조회 {formatViewCount(news?.view_count)}
                    </p>
                    {news?.thumbnail_url ? (
                        <img
                            alt={news.title}
                            className="mb-14 aspect-square w-full rounded-[3rem] object-cover"
                            src={news.thumbnail_url}
                        />
                    ) : null}
                    {news ? (
                        <RichTextRenderer
                            className="text-lg font-semibold leading-[1.9] text-black"
                            content={news.body}
                            fallback={news.summary ?? "등록된 본문이 없습니다."}
                        />
                    ) : (
                        <p className="text-lg font-semibold leading-[1.8] text-black">공개 상태의 뉴스가 없거나 주소가 올바르지 않습니다.</p>
                    )}
                    <div className="mt-16 text-center">
                        <UI.Linker
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--adaptiveGrey100)] px-7 text-lg font-black text-[var(--adaptiveGrey700)]"
                            href="/news"
                        >
                            목록으로
                        </UI.Linker>
                    </div>
                    <div className="mt-16 grid gap-8 border-t border-[var(--adaptiveGrey200)] pt-10">
                        <div>
                            <p className="mb-3 text-lg font-black text-[var(--adaptiveGrey500)]">이전글</p>
                            {prevNews ? (
                                <UI.Linker
                                    className="text-2xl font-black text-black"
                                    href={`/news/${prevNews.slug}`}
                                >
                                    {prevNews.title}
                                </UI.Linker>
                            ) : (
                                <span className="text-2xl font-black text-[var(--adaptiveGrey400)]">이전글이 없습니다.</span>
                            )}
                        </div>
                        <div>
                            <p className="mb-3 text-lg font-black text-[var(--adaptiveGrey500)]">다음글</p>
                            {nextNews ? (
                                <UI.Linker
                                    className="text-2xl font-black text-black"
                                    href={`/news/${nextNews.slug}`}
                                >
                                    {nextNews.title}
                                </UI.Linker>
                            ) : (
                                <span className="text-2xl font-black text-[var(--adaptiveGrey400)]">다음글이 없습니다.</span>
                            )}
                        </div>
                    </div>
                </div>
            </Skeleton.Article>
        </>
    );
}
