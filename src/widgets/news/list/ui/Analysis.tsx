"use client";

import Link from "next/link";
import { usePublishedNewsQuery } from "@/entities/news/api/news.query";
import Skeleton from "@/shared/ui/kit/Skeleton";
import UI from "@/shared/ui/UIComponent";

function formatDate(value: string | null) {
    if (!value) {
        return "날짜 미정";
    }

    return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(value));
}

export function Analysis() {
    const { data: news, isLoading } = usePublishedNewsQuery();

    return (
        <>
            <section className="border-b border-slate-200 bg-slate-50 py-24 max-[86rem]:py-18">
                <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                    <p className="mb-3 text-[1.3rem] font-bold text-teal-700">News</p>
                    <h1 className="m-0 max-w-[82rem] text-5xl leading-[1.14] max-[86rem]:text-4xl">운영 소식과 업데이트를 전합니다</h1>
                    <span className="mt-6 block max-w-[72rem] text-lg leading-[1.7] text-slate-600">서비스 안내, 운영 소식, 콘텐츠 제작 관련 업데이트를 확인하세요.</span>
                </div>
            </section>

            <Skeleton.Section
                target={!isLoading}
                className={{ element: "pt-[8.4rem] pb-24" }}
            >
                <div className="mx-auto grid w-[min(92rem,calc(100%_-_3.2rem))] gap-4">
                    {news.length ? (
                        news.map((item) => (
                            <UI.Link
                                className="grid grid-cols-[18rem_minmax(0,1fr)] gap-5 rounded-lg border border-slate-200 bg-white p-4 max-[86rem]:grid-cols-1"
                                href={`/news/${item.slug}`}
                                key={item.slug}
                            >
                                {item.thumbnail_url ? (
                                    <img
                                        alt={item.title}
                                        className="h-36 w-full rounded-md object-cover"
                                        src={item.thumbnail_url}
                                    />
                                ) : (
                                    <span className="flex h-36 items-center justify-center rounded-md bg-slate-100 text-sm font-bold text-slate-400">No image</span>
                                )}
                                <span className="grid content-center gap-3">
                                    <span className="text-sm font-bold text-teal-700">{formatDate(item.published_at)}</span>
                                    <strong className="text-2xl">{item.title}</strong>
                                    <span className="leading-[1.7] text-slate-600">{item.summary ?? "상세 내용을 확인하세요."}</span>
                                </span>
                            </UI.Link>
                        ))
                    ) : (
                        <p>등록된 공개 NEWS가 없습니다.</p>
                    )}
                </div>
            </Skeleton.Section>
        </>
    );
}
