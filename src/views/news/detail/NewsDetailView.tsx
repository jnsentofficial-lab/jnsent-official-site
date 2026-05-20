"use client";

import Link from "next/link";
import { usePublishedNewsDetailQuery } from "@/entities/news/api/news.query";
import { RichTextRenderer } from "@/shared/ui/richText/RichTextRenderer";
import Skeleton from "@/shared/ui/kit/Skeleton";
import UI from "@/shared/ui/UIComponent";

type NewsDetailViewProps = {
    slug: string;
};

export function NewsDetailView({ slug }: NewsDetailViewProps) {
    const { data: news, isLoading } = usePublishedNewsDetailQuery(slug);

    return (
        <main className="bg-white">
            <Skeleton.Article
                target={!isLoading}
                className={{ element: "pt-[8.4rem] pb-[11rem]" }}
            >
                <div className="mx-auto w-[min(92rem,calc(100%_-_3.2rem))]">
                    <UI.Link
                        className="mb-12 inline-flex font-bold text-teal-700"
                        href="/news"
                    >
                        NEWS 목록
                    </UI.Link>
                    <p className="text-sm font-bold text-teal-700">{news?.published_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(news.published_at)) : "날짜 미정"}</p>
                    <h1 className="mt-3 mb-9 max-w-[82rem] text-[4.4rem] leading-[1.18] max-[86rem]:text-[3.4rem]">{news?.title ?? "공개 NEWS를 찾을 수 없습니다"}</h1>
                    {news?.thumbnail_url ? (
                        <img
                            alt={news.title}
                            className="mb-10 h-auto max-h-[48rem] w-full rounded-lg object-cover"
                            src={news.thumbnail_url}
                        />
                    ) : null}
                    {news ? (
                        <RichTextRenderer
                            className="border-t border-slate-200 pt-8 text-lg"
                            content={news.body}
                            fallback={news.summary ?? "등록된 본문이 없습니다."}
                        />
                    ) : (
                        <p className="border-t border-slate-200 pt-8 text-lg leading-[1.8] text-slate-700">공개 상태의 NEWS가 없거나 주소가 올바르지 않습니다.</p>
                    )}
                </div>
            </Skeleton.Article>
        </main>
    );
}
