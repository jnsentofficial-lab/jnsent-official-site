"use client";

import { useAdminPageContentsQuery, useTogglePageContentMutation } from "@/entities/pageContent/api/pageContent.query";
import { PageContentEditor } from "@/features/managePageContent/PageContentEditor";
import UI from "@/shared/ui/UIComponent";
import { AdminHeader } from "@/widgets/adminHeader/AdminHeader";
import { AdminSidebar } from "@/widgets/adminSidebar/AdminSidebar";

export function AdminPagesView() {
    const { data: pages = [] } = useAdminPageContentsQuery();
    const togglePage = useTogglePageContentMutation();

    return (
        <main className="grid min-h-screen grid-cols-[24rem_minmax(0,1fr)] bg-slate-100 max-[86rem]:grid-cols-1">
            <AdminSidebar />
            <section className="p-8 max-[86rem]:px-4 max-[86rem]:py-6">
                <AdminHeader
                    description="공개 상세페이지의 문구와 본문 데이터를 slug 기준으로 관리합니다."
                    title="상세페이지 콘텐츠 관리"
                />
                <div className="grid grid-cols-[minmax(32rem,0.8fr)_minmax(0,1fr)] gap-[1.8rem] max-[86rem]:grid-cols-1">
                    <section className="rounded-lg border border-slate-200 bg-white p-6">
                        <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">콘텐츠 편집</h2>
                        <PageContentEditor />
                    </section>
                    <section className="rounded-lg border border-slate-200 bg-white p-6">
                        <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">관리 페이지</h2>
                        <div className="grid gap-3">
                            {pages.length ? (
                                pages.map((page) => (
                                    <article
                                        className="flex min-h-28 items-center justify-between gap-[1.8rem] rounded-lg border border-slate-200 bg-slate-50 p-[1.8rem] max-[86rem]:flex-col max-[86rem]:items-start"
                                        key={page.id}
                                    >
                                        <div className="grid gap-2">
                                            <strong className="text-slate-900">{page.title}</strong>
                                            <span className="leading-[1.6] text-slate-700">{page.slug}</span>
                                        </div>
                                        <UI.Button
                                            className="min-h-11 shrink-0 rounded-lg bg-green-100 px-3.5 font-bold text-green-700"
                                            onClick={() => togglePage.mutate({ id: page.id, is_published: !page.is_published })}
                                            type="button"
                                        >
                                            {page.is_published ? "공개" : "비공개"}
                                        </UI.Button>
                                    </article>
                                ))
                            ) : (
                                <p>등록된 페이지 콘텐츠가 없습니다.</p>
                            )}
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}
