"use client";

import { Fragment, useEffect, useState } from "react";
import { useAdminNewsQuery, useDeleteNewsMutation, useToggleNewsMutation } from "@/entities/news/api/news.query";
import type { News } from "@/entities/news/model/news.type";
import { NewsEditor } from "@/features/manageNews/NewsEditor";
import UI from "@/shared/ui/UIComponent";
import { AdminListRow, AdminListSection, AdminPagination, AdminSidePanel, AdminTwoPanel, AdminWorkspace, ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";
import { useAdminSidePanelStore } from "@/widgets/admin/shared/model/useAdminSidePanelStore";
import Image from "next/image";
import { Text } from "@/shared/ui/kit/Text";

const PANEL_KEY = "/admin/news";

export function Analysis() {
    const { data: newsItems = [], isLoading } = useAdminNewsQuery();
    const [selectedNews, setSelectedNews] = useState<News | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<News | null>(null);
    const [publishedTarget, setPublishedTarget] = useState<News | null>(null);
    const [page, setPage] = useState(1);
    const toggleNews = useToggleNewsMutation();
    const deleteNews = useDeleteNewsMutation();
    const pageSize = useAdminSidePanelStore((state) => state.listPageSize);
    const totalPages = Math.max(1, Math.ceil(newsItems.length / pageSize));
    const visibleNewsItems = newsItems.slice((page - 1) * pageSize, page * pageSize);
    const openPanel = useAdminSidePanelStore((state) => state.openPanel);
    const closePanel = useAdminSidePanelStore((state) => state.closePanel);

    useEffect(() => {
        closePanel(PANEL_KEY);
    }, [closePanel]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    return (
        <AdminWorkspace>
            <AdminTwoPanel
                panelKey={PANEL_KEY}
                current="뉴스 관리"
                title="뉴스 관리"
                action={
                    <button
                        className="absolute bottom-[1.6rem] right-[1.6rem] bg-black hover:bg-[var(--adaptive-blue500)] cursor-pointer flex flex-col justify-center items-center gap-[1.2rem] h-[5.8rem] w-[5.8rem] rounded-full z-100 shadow-[0_0_50px_0_var(--adaptive-black500)]"
                        onClick={() => {
                            setSelectedNews(null);
                            openPanel(PANEL_KEY);
                        }}
                        type="button"
                    >
                        <Image
                            src={"/images/icon/outlined/ico-outlined-edit.svg"}
                            alt=""
                            width={32}
                            height={32}
                            className="invert"
                        />
                    </button>
                }
                left={
                    <AdminListSection
                        empty={
                            <div className="bg-[var(--adaptive-grey100)] flex flex-col justify-center items-center gap-[1.2rem] p-[5.2rem]">
                                <h5 className="text-[2.0rem]">현재 생성된 뉴스가 없습니다</h5>
                                <p className="text-[var(--adaptive-grey500)] font-[400] text-center leading-[1.5]">오른쪽 하단의 작성하기 버튼을 통해 뉴스를 생성 할 수 있어요</p>
                            </div>
                        }
                        hasItems={newsItems.length > 0}
                        isLoading={isLoading}
                        pagination={
                            <AdminPagination
                                page={page}
                                totalPages={totalPages}
                                onChange={setPage}
                            />
                        }
                    >
                        {visibleNewsItems.map((item, mappedIdx) => {
                            const SELECTED = selectedNews?.id === item.id;
                            const publishStatusLabel = item.is_published ? "공개" : "비공개";
                            const publishStatusClassName = item.is_published
                                ? "bg-[var(--adaptive-blue100)] text-[var(--adaptive-blue500)]"
                                : "bg-[var(--adaptive-grey200)] text-[var(--adaptive-grey600)]";

                            return (
                                <Fragment key={item.slug}>
                                    <AdminListRow
                                        actions={
                                            <>
                                                <UI.Button
                                                    className="flex items-center gap-[1.6rem] h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                                    onClick={() => setDeleteTarget(item)}
                                                    type="button"
                                                >
                                                    <Image
                                                        src={"/images/icon/outlined/ico-outlined-trash.svg"}
                                                        alt=""
                                                        width={24}
                                                        height={24}
                                                    />
                                                    <span className="text-base font-[700]">삭제</span>
                                                </UI.Button>

                                                <UI.Button
                                                    className="flex items-center gap-[1.6rem] h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                                    onClick={() => toggleNews.mutate({ id: item.id, is_published: !item.is_published })}
                                                    type="button"
                                                >
                                                    <Image
                                                        src={"/images/icon/outlined/ico-outlined-trash.svg"}
                                                        alt=""
                                                        width={24}
                                                        height={24}
                                                    />
                                                    {item.is_published ? "비공개" : "공개"}
                                                </UI.Button>
                                            </>
                                        }
                                        description={
                                            <section className="flex items-center gap-[0.8rem] text-[1.4rem]">
                                                <p className="text-[1.4rem] text-[var(--adaptive-grey500)]">홍길동</p>
                                                <div className="h-[1.2rem] w-[0.1rem] bg-[var(--adaptive-black200)]" />
                                                <p className="text-[1.4rem] text-[var(--adaptive-grey500)] text-left">
                                                    {item.published_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(item.published_at)) : "날짜 미정"}
                                                </p>
                                            </section>
                                        }
                                        onClick={() => {
                                            setSelectedNews(item);
                                            openPanel(PANEL_KEY);
                                        }}
                                        selected={SELECTED}
                                        thumbnail={
                                            item.thumbnail_url ? (
                                                <img
                                                    alt={item.title}
                                                    className="h-[5.2rem] w-[5.2rem] rounded-[1.2rem] object-cover"
                                                    src={item.thumbnail_url}
                                                />
                                            ) : (
                                                <span className="flex h-[5.2rem] w-[5.2rem] items-center justify-center rounded-[1.2rem] bg-[var(--adaptiveGrey200)] text-xs font-bold text-[var(--adaptiveGrey500)]">
                                                    No
                                                </span>
                                            )
                                        }
                                        title={
                                            <div className="flex items-center gap-[0.8rem]">
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
                                                <span className={`rounded-full px-[1.0rem] py-[0.4rem] text-[1.2rem] font-[700] leading-none ${publishStatusClassName}`}>{publishStatusLabel}</span>
                                            </div>
                                        }
                                    />

                                    {mappedIdx + 1 !== visibleNewsItems.length ? <div className="h-[0.1rem] w-full bg-[var(--adaptive-black100)]" /> : null}
                                </Fragment>
                            );
                        })}
                    </AdminListSection>
                }
                right={
                    <AdminSidePanel title={selectedNews ? "선택한 뉴스" : "생성하기"}>
                        <NewsEditor
                            news={selectedNews}
                            onSaved={(savedNews) => {
                                setSelectedNews(null);
                                closePanel(PANEL_KEY);
                                if (savedNews.is_published) {
                                    setPublishedTarget(savedNews);
                                }
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
            <ConfirmDialog
                open={Boolean(publishedTarget)}
                title="게시물 발행 완료"
                description={publishedTarget ? `${publishedTarget.title}\n\n해당 게시물로 이동할까요?` : ""}
                cancelLabel="유지하기"
                confirmLabel="이동하기"
                onCancel={() => setPublishedTarget(null)}
                onConfirm={() => {
                    if (publishedTarget) {
                        window.open(`/news/${publishedTarget.slug}`, "_blank", "noopener,noreferrer");
                    }
                    setPublishedTarget(null);
                }}
            />
        </AdminWorkspace>
    );
}
