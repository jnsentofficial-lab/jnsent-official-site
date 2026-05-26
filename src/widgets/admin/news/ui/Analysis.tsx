"use client";

import { Fragment, useState } from "react";
import { useAdminNewsQuery, useDeleteNewsMutation, useToggleNewsMutation } from "@/entities/news/api/news.query";
import type { News } from "@/entities/news/model/news.type";
import { NewsEditor } from "@/features/manageNews/NewsEditor";
import UI from "@/shared/ui/UIComponent";
import { AdminPagination, AdminTwoPanel, AdminWorkspace, ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";

export function Analysis() {
    const { data: newsItems = [] } = useAdminNewsQuery();
    const [selectedNews, setSelectedNews] = useState<News | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<News | null>(null);
    const [page, setPage] = useState(1);
    const toggleNews = useToggleNewsMutation();
    const deleteNews = useDeleteNewsMutation();
    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(newsItems.length / pageSize));
    const visibleNewsItems = newsItems.slice((page - 1) * pageSize, page * pageSize);

    return (
        <AdminWorkspace
            current="뉴스 관리"
            title="뉴스 관리"
        >
            <AdminTwoPanel
                current="뉴스 관리"
                title="뉴스 관리"
                action={
                    <UI.Button
                        // className="mb-8 min-h-14 bg-black px-6 text-lg font-black text-white"
                        onClick={() => setSelectedNews(null)}
                        type="button"
                    >
                        + 뉴스 만들기
                    </UI.Button>
                }
                left={
                    <>
                        {newsItems.length ? (
                            <div className="grid gap-0">
                                {visibleNewsItems.map((item, mappedIdx) => (
                                    <Fragment key={item.slug}>
                                        <section
                                            className="flex justify-between py-[2.4rem]"
                                            // className={`grid grid-cols-[8rem_minmax(0,1fr)_8rem] items-center gap-6 border-b border-[var(--adaptiveGrey200)] py-8 max-[86rem]:grid-cols-1 ${selectedNews?.id === item.id ? "text-[var(--adaptiveRed300)]" : "text-black"}`}
                                        >
                                            <UI.Button
                                                className="flex items-center gap-[1.6rem] flex-1"
                                                onClick={() => setSelectedNews(item)}
                                                type="button"
                                            >
                                                {item.thumbnail_url ? (
                                                    <img
                                                        alt={item.title}
                                                        className="h-[7.2rem] w-[7.2rem] rounded-[2.0rem] object-cover"
                                                        src={item.thumbnail_url}
                                                    />
                                                ) : (
                                                    <span className="flex h-[3.2rem] w-20 items-center justify-center rounded-2xl bg-[var(--adaptiveGrey200)] text-xs font-bold text-[var(--adaptiveGrey500)]">
                                                        No
                                                    </span>
                                                )}

                                                <div className="flex flex-col items-start gap-[0.8rem]">
                                                    <h6 className="text-[2.0rem] leading-[1.5]">{item.title}</h6>

                                                    <p className="text-[1.4rem] text-[var(--adaptive-grey500)]">
                                                        홍길동 <span className="mx-3">|</span> {item.published_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(item.published_at)) : "날짜 미정"}
                                                    </p>
                                                </div>
                                            </UI.Button>

                                            <div className="flex">
                                                <UI.Button
                                                    className="text-2xl font-black"
                                                    onClick={() => setDeleteTarget(item)}
                                                    type="button"
                                                >
                                                    <span className="text-base font-black">삭제</span>
                                                </UI.Button>

                                                <UI.Button
                                                    className="mt-2 text-sm font-black text-[var(--adaptiveGrey600)]"
                                                    onClick={() => toggleNews.mutate({ id: item.id, is_published: !item.is_published })}
                                                    type="button"
                                                >
                                                    {item.is_published ? "공개" : "비공개"}
                                                </UI.Button>
                                            </div>
                                        </section>

                                        {mappedIdx + 1 !== visibleNewsItems.length ? <div className="h-[0.1rem] w-full bg-[var(--adaptive-black100)]" /> : null}
                                    </Fragment>
                                ))}
                            </div>
                        ) : (
                            <p className="py-16 text-2xl font-black text-[var(--adaptiveGrey500)]">등록된 NEWS가 없습니다.</p>
                        )}
                        <AdminPagination
                            page={page}
                            totalPages={totalPages}
                            onChange={setPage}
                        />
                    </>
                }
                right={
                    <div className="sticky top-0 max-h-screen overflow-auto p-12">
                        <h2 className="mt-0 mb-12 text-4xl font-black text-black">{selectedNews ? "선택한 뉴스" : "생성하기"}</h2>
                        <NewsEditor news={selectedNews} />
                    </div>
                }
            />
            <ConfirmDialog
                open={Boolean(deleteTarget)}
                title="선택한 뉴스를 삭제 할까요?"
                description="선택하신 뉴스를 삭제합니다. 신중하게 선택해주세요."
                targetLabel={deleteTarget?.title}
                confirmLabel="삭제하기"
                tone="delete"
                onCancel={() => setDeleteTarget(null)}
                onConfirm={() => {
                    if (deleteTarget) {
                        deleteNews.mutate({ id: deleteTarget.id });
                    }
                    setDeleteTarget(null);
                }}
            />
        </AdminWorkspace>
    );
}
