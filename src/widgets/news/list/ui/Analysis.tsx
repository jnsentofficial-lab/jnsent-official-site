"use client";

import { useState } from "react";
import { usePublishedNewsQuery } from "@/entities/news/api/news.query";
import Skeleton from "@/shared/ui/kit/Skeleton";
import UI from "@/shared/ui/UIComponent";
import { SubPageHero } from "@/widgets/layout/ui";

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

function formatViewCount(value?: number) {
    return new Intl.NumberFormat("ko-KR").format(value ?? 0);
}

export function Analysis() {
    const { data: news, isLoading } = usePublishedNewsQuery();
    const [page, setPage] = useState(1);
    const pageSize = 9;
    const totalPages = Math.max(1, Math.ceil(news.length / pageSize));
    const visibleNews = news.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <SubPageHero
                current="뉴스"
                title="뉴스"
                description="변화하는 엔터테인먼트 시장 속에서 제이엔에스가 나아가는 방향을 공유합니다."
            />
            <Skeleton.Section
                target={!isLoading}
                className={{ element: "pb-[14rem]" }}
            >
                <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                    {news.length ? (
                        <>
                            <div className="grid grid-cols-3 gap-x-12 gap-y-20 max-[86rem]:grid-cols-1">
                                {visibleNews.map((item) => (
                                    <UI.Link
                                        className="group block"
                                        href={`/news/${item.slug}`}
                                        key={item.slug}
                                    >
                                        {item.thumbnail_url ? (
                                            <img
                                                alt={item.title}
                                                className="aspect-square w-full rounded-[3rem] object-cover transition duration-300 group-hover:scale-[1.02]"
                                                src={item.thumbnail_url}
                                            />
                                        ) : (
                                            <span className="flex aspect-square w-full items-center justify-center rounded-[3rem] bg-[var(--adaptiveGrey100)] text-lg font-black text-[var(--adaptiveGrey500)]">이미지 없음</span>
                                        )}
                                        <span className="mt-6 block text-lg font-black text-[var(--adaptiveGrey500)]">
                                            {formatDate(item.published_at)}
                                            <span className="mx-3">|</span>
                                            조회 {formatViewCount(item.view_count)}
                                        </span>
                                        <strong className="mt-3 block text-3xl font-black leading-[1.35] text-black">{item.title}</strong>
                                    </UI.Link>
                                ))}
                            </div>
                            <div className="mt-24 flex items-center justify-center gap-4">
                                <button
                                    className="grid h-12 w-12 place-items-center rounded-full bg-[var(--adaptiveGrey100)] text-2xl font-black text-[var(--adaptiveGrey500)] disabled:opacity-40"
                                    disabled={page === 1}
                                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                                    type="button"
                                >
                                    ‹
                                </button>
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <button
                                        className={`h-12 w-12 text-2xl font-black ${page === index + 1 ? "text-black" : "text-[var(--adaptiveGrey500)]"}`}
                                        key={index}
                                        onClick={() => setPage(index + 1)}
                                        type="button"
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    className="grid h-12 w-12 place-items-center rounded-full bg-[var(--adaptiveGrey100)] text-2xl font-black text-[var(--adaptiveGrey500)] disabled:opacity-40"
                                    disabled={page === totalPages}
                                    onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                                    type="button"
                                >
                                    ›
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="rounded-[2.4rem] bg-[var(--adaptiveGrey100)] px-8 py-16 text-center text-2xl font-black text-[var(--adaptiveGrey600)]">현재 공개된 뉴스가 없습니다.</div>
                    )}
                </div>
            </Skeleton.Section>
        </>
    );
}
