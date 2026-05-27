"use client";

import { Fragment, useEffect, useState } from "react";
import { useAdminGlobalModalsQuery, useDeleteGlobalModalMutation, useToggleGlobalModalMutation } from "@/entities/globalModal/api/globalModal.query";
import { useGlobalModalPreviewStore } from "@/entities/globalModal/model/useGlobalModalPreviewStore";
import type { GlobalModal } from "@/entities/globalModal/model/globalModal.type";
import { GlobalModalEditor } from "@/features/manageGlobalModal/GlobalModalEditor";
import UI from "@/shared/ui/UIComponent";
import { AdminListRow, AdminListSection, AdminPagination, AdminSidePanel, AdminTwoPanel, AdminWorkspace, ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";
import { useAdminSidePanelStore } from "@/widgets/admin/shared/model/useAdminSidePanelStore";
import Image from "next/image";
import { Text } from "@/shared/ui/kit/Text";
import { useToastStore } from "@/shared/model/stores/useToastStore";

const PANEL_KEY = "/admin/modals";

export function Analysis() {
    const { setToast } = useToastStore();
    const { data: modals = [], isLoading } = useAdminGlobalModalsQuery();
    const [selectedModal, setSelectedModal] = useState<GlobalModal | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<GlobalModal | null>(null);
    const [pendingToggleId, setPendingToggleId] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [currentTime] = useState(() => Date.now());
    const toggleModal = useToggleGlobalModalMutation();
    const deleteModal = useDeleteGlobalModalMutation();
    const openPreviewModal = useGlobalModalPreviewStore((state) => state.openPreviewModal);
    const closePreviewModal = useGlobalModalPreviewStore((state) => state.closePreviewModal);
    const pageSize = useAdminSidePanelStore((state) => state.listPageSize);
    const totalPages = Math.max(1, Math.ceil(modals.length / pageSize));
    const visibleModals = modals.slice((page - 1) * pageSize, page * pageSize);
    const openPanel = useAdminSidePanelStore((state) => state.openPanel);
    const closePanel = useAdminSidePanelStore((state) => state.closePanel);

    useEffect(() => {
        closePanel(PANEL_KEY);
    }, [closePanel]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => closePreviewModal, [closePreviewModal]);

    return (
        <AdminWorkspace>
            <AdminTwoPanel
                panelKey={PANEL_KEY}
                current="팝업 관리"
                title="팝업 관리"
                action={
                    <button
                        className="absolute bottom-[1.6rem] right-[1.6rem] bg-black hover:bg-[var(--adaptive-blue500)] cursor-pointer flex flex-col justify-center items-center gap-[1.2rem] h-[5.8rem] w-[5.8rem] rounded-full z-100 shadow-[0_0_50px_0_var(--adaptive-black500)]"
                        onClick={() => {
                            setSelectedModal(null);
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
                        empty={<p className="py-16 text-2xl font-[700] text-[var(--adaptiveGrey500)]">등록된 팝업이 없습니다.</p>}
                        hasItems={modals.length > 0}
                        isLoading={isLoading}
                        pagination={
                            <AdminPagination
                                page={page}
                                totalPages={totalPages}
                                onChange={setPage}
                            />
                        }
                    >
                        {visibleModals.map((modal, mappedIdx) => {
                            const SELECTED = selectedModal?.id === modal.id;
                            const hasEnded = modal.ends_at ? new Date(modal.ends_at).getTime() < currentTime : false;
                            const statusLabel = hasEnded ? "종료" : modal.is_visible ? "진행중" : "숨김";
                            const statusClassName = statusLabel === "진행중"
                                ? "bg-[var(--adaptive-blue100)] text-[var(--adaptive-blue500)]"
                                : "bg-[var(--adaptive-grey200)] text-[var(--adaptive-grey600)]";

                            return (
                                <Fragment key={modal.id}>
                                    <AdminListRow
                                        actions={
                                            <>
                                                <UI.Button
                                                    className="flex items-center gap-[1.6rem] h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                                    onClick={() => setDeleteTarget(modal)}
                                                    type="button"
                                                >
                                                    <Image
                                                        src={"/images/icon/outlined/ico-outlined-trash.svg"}
                                                        alt=""
                                                        width={24}
                                                        height={24}
                                                    />
                                                    <p>삭제</p>
                                                </UI.Button>
                                                <UI.Button
                                                    className="flex items-center gap-[1.6rem] h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                                    onClick={() => {
                                                        openPreviewModal(modal);
                                                        setToast({ msg: "메인에 실제로 노출될 위치/이미지 입니다.", time: 3, type: "success" });
                                                    }}
                                                    type="button"
                                                >
                                                    <Image
                                                        src={"/images/icon/outlined/ico-outlined-eye.svg"}
                                                        alt=""
                                                        width={24}
                                                        height={24}
                                                    />
                                                    <p>미리보기</p>
                                                </UI.Button>
                                                <UI.Button
                                                    className="flex items-center gap-[1.6rem] h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                                    onClick={() => {
                                                        setPendingToggleId(modal.id);
                                                        toggleModal.mutate(
                                                            { id: modal.id, is_visible: !modal.is_visible },
                                                            {
                                                                onSettled: () => setPendingToggleId(null),
                                                            },
                                                        );
                                                    }}
                                                    type="button"
                                                >
                                                    <Image
                                                        src={"/images/icon/outlined/ico-outlined-eye.svg"}
                                                        alt=""
                                                        width={24}
                                                        height={24}
                                                    />
                                                    {pendingToggleId === modal.id ? "변경중입니다.." : modal.is_visible ? "숨김" : "표시"}
                                                </UI.Button>
                                            </>
                                        }
                                        description={
                                            <Fragment>
                                                <div className="flex items-center gap-[0.8rem] text-[1.4rem]">
                                                    <p className="text-[var(--adaptive-grey500)] text-left">김주석 주임</p>
                                                </div>
                                                <p className="text-[1.4rem] text-[var(--adaptive-grey500)] text-left">
                                                    {modal.starts_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(modal.starts_at)) : "시작일 없음"} ~{" "}
                                                    {modal.ends_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(modal.ends_at)) : "종료일 없음"}
                                                </p>
                                            </Fragment>
                                        }
                                        onClick={() => {
                                            setSelectedModal(modal);
                                            openPanel(PANEL_KEY);
                                        }}
                                        selected={SELECTED}
                                        thumbnail={
                                            modal.image_url ? (
                                                <img
                                                    alt={modal.title}
                                                    className="h-[5.2rem] w-[5.2rem] rounded-[1.2rem] object-cover"
                                                    src={modal.image_url}
                                                />
                                            ) : (
                                                <span className="flex h-[5.2rem] w-[5.2rem] items-center justify-center rounded-[1.2rem] bg-[var(--adaptive-grey200)] text-xs font-bold text-[var(--adaptive-grey500)]">
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
                                                        {modal.title}
                                                    </Text.Shimmer>
                                                ) : (
                                                    <h6 className="truncate text-[2.0rem]">{modal.title}</h6>
                                                )}
                                                <span className={`rounded-full px-[1.0rem] py-[0.4rem] text-[1.2rem] font-[700] leading-none ${statusClassName}`}>{statusLabel}</span>
                                            </div>
                                        }
                                    />

                                    {mappedIdx + 1 !== visibleModals.length ? <div className="w-full h-[0.1rem] bg-[var(--adaptive-grey200)]" /> : null}
                                </Fragment>
                            );
                        })}
                    </AdminListSection>
                }
                right={
                    <AdminSidePanel title={selectedModal ? "수정하기" : "생성하기"}>
                        <GlobalModalEditor
                            modal={selectedModal}
                            onSaved={() => {
                                setSelectedModal(null);
                                closePanel(PANEL_KEY);
                            }}
                        />
                    </AdminSidePanel>
                }
            />
            <ConfirmDialog
                open={Boolean(deleteTarget)}
                title="선택한 팝업을 삭제 할까요?"
                description="선택하신 팝업을 삭제합니다. 신중하게 선택해주세요."
                targetLabel={deleteTarget?.title}
                confirmLabel="삭제하기"
                tone="delete"
                onCancel={() => setDeleteTarget(null)}
                onConfirm={() => {
                    if (deleteTarget) {
                        deleteModal.mutate({ id: deleteTarget.id });
                    }
                    setDeleteTarget(null);
                }}
            />
        </AdminWorkspace>
    );
}
