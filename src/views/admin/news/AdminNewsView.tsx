"use client";

import { useAdminNewsQuery, useToggleNewsMutation } from "@/entities/news/api/news.query";
import { NewsEditor } from "@/features/manageNews/NewsEditor";
import UI from "@/shared/ui/UIComponent";
import { AdminHeader } from "@/widgets/adminHeader/AdminHeader";
import { AdminSidebar } from "@/widgets/adminSidebar/AdminSidebar";

export function AdminNewsView() {
    const { data: newsItems = [] } = useAdminNewsQuery();
    const toggleNews = useToggleNewsMutation();

    return (
        <main className="grid min-h-screen grid-cols-[24rem_minmax(0,1fr)] bg-slate-100 max-[86rem]:grid-cols-1">
            <AdminSidebar />
            <section className="p-8 max-[86rem]:px-4 max-[86rem]:py-6">
                <AdminHeader
                    description="NEWS 목록과 상세 콘텐츠를 slug 기준으로 작성하고 관리합니다."
                    title="NEWS 관리"
                />
                <div className="grid grid-cols-[minmax(32rem,0.8fr)_minmax(0,1fr)] gap-[1.8rem] max-[86rem]:grid-cols-1">
                    <section className="rounded-lg border border-slate-200 bg-white p-6">
                        <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">NEWS 편집</h2>
                        <NewsEditor />
                    </section>
                    <section className="rounded-lg border border-slate-200 bg-white p-6">
                        <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">등록된 NEWS</h2>
                        <div className="grid gap-3">
                            {newsItems.length ? (
                                newsItems.map((item) => (
                                    <article
                                        className="flex min-h-28 items-center justify-between gap-[1.8rem] rounded-lg border border-slate-200 bg-slate-50 p-[1.8rem] max-[86rem]:flex-col max-[86rem]:items-start"
                                        key={item.slug}
                                    >
                                        <div className="grid gap-2">
                                            <strong className="text-slate-900">{item.title}</strong>
                                            <span className="leading-[1.6] text-slate-700">{item.slug}</span>
                                        </div>
                                        <UI.Button
                                            className="min-h-11 shrink-0 rounded-lg bg-green-100 px-3.5 font-bold text-green-700"
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
                </div>
            </section>
        </main>
    );
}
