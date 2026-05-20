"use client";

import { useState } from "react";
import { useAdminNewsQuery, useToggleNewsMutation } from "@/entities/news/api/news.query";
import type { News } from "@/entities/news/model/news.type";
import { NewsEditor } from "@/features/manageNews/NewsEditor";
import UI from "@/shared/ui/UIComponent";

export function Analysis() {
    const { data: newsItems = [] } = useAdminNewsQuery();
    const [selectedNews, setSelectedNews] = useState<News | null>(null);
    const toggleNews = useToggleNewsMutation();

    return (
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(38rem,0.72fr)] gap-[1.8rem] max-[86rem]:grid-cols-1">
            <section className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="mb-[1.8rem] flex items-center justify-between gap-3">
                    <h2 className="m-0 text-xl text-slate-900">등록된 NEWS</h2>
                    <UI.Button
                        className="min-h-10 rounded-lg bg-blue-600 px-3.5 text-sm font-bold text-white"
                        onClick={() => setSelectedNews(null)}
                        type="button"
                    >
                        새 NEWS
                    </UI.Button>
                </div>
                <div className="grid gap-3">
                    {newsItems.length ? (
                        newsItems.map((item) => (
                            <article
                                className={`grid grid-cols-[12rem_minmax(0,1fr)_8rem] items-center gap-4 rounded-lg border p-3 max-[86rem]:grid-cols-1 ${selectedNews?.id === item.id ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-slate-50"}`}
                                key={item.slug}
                            >
                                <button
                                    className="contents text-left"
                                    onClick={() => setSelectedNews(item)}
                                    type="button"
                                >
                                    {item.thumbnail_url ? (
                                        <img
                                            alt={item.title}
                                            className="h-24 w-full rounded-md object-cover"
                                            src={item.thumbnail_url}
                                        />
                                    ) : (
                                        <span className="flex h-24 items-center justify-center rounded-md bg-slate-200 text-xs font-bold text-slate-500">No image</span>
                                    )}
                                    <span className="grid min-w-0 gap-1">
                                        <strong className="truncate text-slate-900">{item.title}</strong>
                                        <span className="truncate text-sm leading-[1.6] text-slate-700">{item.slug}</span>
                                        <span className="truncate text-xs text-slate-500">{item.summary ?? "요약 없음"}</span>
                                    </span>
                                </button>
                                <UI.Button
                                    className="min-h-10 shrink-0 rounded-lg bg-green-100 px-3.5 text-sm font-bold text-green-700"
                                    onClick={() => toggleNews.mutate({ id: item.id, is_published: !item.is_published })}
                                    type="button"
                                >
                                    {item.is_published ? "공개" : "비공개"}
                                </UI.Button>
                            </article>
                        ))
                    ) : (
                        <p>등록된 NEWS가 없습니다.</p>
                    )}
                </div>
            </section>
            <aside className="sticky top-6 max-h-[calc(100vh-4.8rem)] overflow-auto rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">{selectedNews ? "NEWS 편집" : "NEWS 등록"}</h2>
                <NewsEditor news={selectedNews} />
            </aside>
        </div>
    );
}
