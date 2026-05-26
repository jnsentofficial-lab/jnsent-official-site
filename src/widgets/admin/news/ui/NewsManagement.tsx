"use client";

import { useState } from "react";
import { useAdminNewsQuery, useDeleteNewsMutation, useToggleNewsMutation } from "@/entities/news/api/news.query";
import type { News } from "@/entities/news/model/news.type";
import { NewsEditor } from "@/features/manageNews/NewsEditor";
import UI from "@/shared/ui/UIComponent";
import { AdminEmptyState, AdminPagination, AdminSidePanel, AdminTwoPanel, AdminWorkspace, ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";

export function NewsManagement() {
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
        <AdminWorkspace>
            <AdminTwoPanel
                current="뉴스 관리"
                title="뉴스 관리"
                left={
                    <>
                        {newsItems.length ? (
                            <div className="grid gap-0">
                                {visibleNewsItems.map((item) => (
                                    <article
                                        className={`grid grid-cols-[8rem_minmax(0,1fr)_8rem] items-center gap-6 border-b border-[var(--adaptive-grey200)] py-8 max-[86rem]:grid-cols-1 ${selectedNews?.id === item.id ? "text-[var(--adaptive-red300)]" : "text-black"}`}
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
                                                    className="h-20 w-20 rounded-2xl object-cover"
                                                    src={item.thumbnail_url}
                                                />
                                            ) : (
                                                <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--adaptive-grey200)] text-xs font-bold text-[var(--adaptive-grey500)]">
                                                    No
                                                </span>
                                            )}
                                            <span className="grid min-w-0 gap-4">
                                                <strong className="truncate text-2xl font-black">{item.title}</strong>
                                                <span className="truncate text-lg font-semibold text-black">
                                                    홍길동 <span className="mx-3">|</span> {item.published_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(item.published_at)) : "날짜 미정"}
                                                </span>
                                            </span>
                                        </button>
                                        <div className="grid justify-items-center gap-2">
                                            <UI.Button
                                                className="text-2xl font-black"
                                                onClick={() => setDeleteTarget(item)}
                                                type="button"
                                            >
                                                ▱
                                            </UI.Button>
                                            <span className="text-base font-black">삭제</span>
                                            <UI.Button
                                                className="mt-2 text-sm font-black text-[var(--adaptive-grey600)]"
                                                onClick={() => toggleNews.mutate({ id: item.id, is_published: !item.is_published })}
                                                type="button"
                                            >
                                                {item.is_published ? "공개" : "비공개"}
                                            </UI.Button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <AdminEmptyState message="등록된 NEWS가 없습니다." />
                        )}
                        <AdminPagination
                            page={page}
                            totalPages={totalPages}
                            onChange={setPage}
                        />
                    </>
                }
                right={
                    <AdminSidePanel
                        title={selectedNews ? "뉴스 편집" : "뉴스 생성"}
                        description={selectedNews ? "선택한 뉴스의 공개 상태와 콘텐츠를 수정합니다." : "새 뉴스 콘텐츠를 작성하고 게시할 수 있습니다."}
                    >
                        <NewsEditor news={selectedNews} />
                    </AdminSidePanel>
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
