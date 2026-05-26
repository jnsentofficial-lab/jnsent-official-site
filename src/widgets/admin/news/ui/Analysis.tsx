"use client";

import { Fragment, useEffect, useState } from "react";
import { useAdminNewsQuery, useDeleteNewsMutation, useToggleNewsMutation } from "@/entities/news/api/news.query";
import type { News } from "@/entities/news/model/news.type";
import { NewsEditor } from "@/features/manageNews/NewsEditor";
import UI from "@/shared/ui/UIComponent";
import { AdminPagination, AdminSidePanel, AdminTwoPanel, AdminWorkspace, ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";
import { useAdminSidePanelStore } from "@/widgets/admin/shared/model/useAdminSidePanelStore";
import Image from "next/image";
import { Text } from "@/shared/ui/kit/Text";

const PANEL_KEY = "/admin/news";

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
    const openPanel = useAdminSidePanelStore((state) => state.openPanel);
    const closePanel = useAdminSidePanelStore((state) => state.closePanel);

    useEffect(() => {
        closePanel(PANEL_KEY);
    }, [closePanel]);

    return (
        <AdminWorkspace>
            <AdminTwoPanel
                panelKey={PANEL_KEY}
                current="뉴스 관리"
                title="뉴스 관리"
                action={
                    <UI.Button
                        // className="mb-8 min-h-14 bg-black px-6 text-lg font-[700] text-white"
                        onClick={() => {
                            setSelectedNews(null);
                            openPanel(PANEL_KEY);
                        }}
                        type="button"
                    >
                        + 작성하기
                    </UI.Button>
                }
                left={
                    <>
                        <div className="flex flex-col">
                            {newsItems.length ? (
                                visibleNewsItems.map((item, mappedIdx) => {
                                    const SELECTED = selectedNews?.id === item.id;

                                    return (
                                        <Fragment key={item.slug}>
                                            <section className="flex items-center justify-between h-[9.2rem]">
                                                <UI.Button
                                                    className={`${SELECTED ? "text-[var(--adaptive-red500)]" : ""} flex justify-start items-center gap-[1.2rem] transition hover:bg-white h-full flex-1 pl-[5.2rem]`}
                                                    onClick={() => {
                                                        setSelectedNews(item);
                                                        openPanel(PANEL_KEY);
                                                    }}
                                                    type="button"
                                                >
                                                    {item.thumbnail_url ? (
                                                        <img
                                                            alt={item.title}
                                                            className="h-[5.2rem] w-[5.2rem] rounded-[1.2rem] object-cover"
                                                            src={item.thumbnail_url}
                                                        />
                                                    ) : (
                                                        <span className="flex h-[5.2rem] w-[5.2rem] items-center justify-center rounded-[1.2rem] bg-[var(--adaptiveGrey200)] text-xs font-bold text-[var(--adaptiveGrey500)]">
                                                            No
                                                        </span>
                                                    )}

                                                    <div className="flex flex-col items-start gap-[0.8rem]">
                                                        {SELECTED ? (
                                                            <Text.Shimmer
                                                                color={{
                                                                    start: "#780B12",
                                                                    end: "#FF6B75",
                                                                }}
                                                                duration={4}
                                                                className="text-[2.0rem]"
                                                            >
                                                                {item.title}
                                                            </Text.Shimmer>
                                                        ) : (
                                                            <h6 className="text-[2.0rem] leading-[1.5]">{item.title}</h6>
                                                        )}

                                                        <p className="text-[1.4rem] text-[var(--adaptive-grey500)]">
                                                            홍길동 <span className="mx-3">|</span>{" "}
                                                            {item.published_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(item.published_at)) : "날짜 미정"}
                                                        </p>
                                                    </div>
                                                </UI.Button>

                                                <div className="flex h-full">
                                                    <UI.Button
                                                        className="h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                                        onClick={() => setDeleteTarget(item)}
                                                        type="button"
                                                    >
                                                        <Image
                                                            src={"/images/icon/outlined/ico-outlined-trash.svg"}
                                                            alt=""
                                                            width={32}
                                                            height={32}
                                                        />
                                                        <span className="text-base font-[700]">삭제</span>
                                                    </UI.Button>

                                                    <UI.Button
                                                        className="h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                                        onClick={() => toggleNews.mutate({ id: item.id, is_published: !item.is_published })}
                                                        type="button"
                                                    >
                                                        <Image
                                                            src={"/images/icon/outlined/ico-outlined-trash.svg"}
                                                            alt=""
                                                            width={32}
                                                            height={32}
                                                        />
                                                        {item.is_published ? "공개" : "비공개"}
                                                    </UI.Button>
                                                </div>
                                            </section>

                                            {mappedIdx + 1 !== visibleNewsItems.length ? <div className="h-[0.1rem] w-full bg-[var(--adaptive-black100)]" /> : null}
                                        </Fragment>
                                    );
                                })
                            ) : (
                                <p className="py-16 text-2xl font-[700] text-[var(--adaptiveGrey500)]">등록된 NEWS가 없습니다.</p>
                            )}

                            <AdminPagination
                                page={page}
                                totalPages={totalPages}
                                onChange={setPage}
                            />
                        </div>
                    </>
                }
                right={
                    <AdminSidePanel title={selectedNews ? "선택한 뉴스" : "생성하기"}>
                        <NewsEditor
                            news={selectedNews}
                            onSaved={() => {
                                setSelectedNews(null);
                                closePanel(PANEL_KEY);
                            }}
                        />
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
