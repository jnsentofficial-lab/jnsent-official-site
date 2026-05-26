"use client";

import { Fragment, useEffect, useState } from "react";
import { useAdminGlobalModalsQuery, useDeleteGlobalModalMutation, useToggleGlobalModalMutation } from "@/entities/globalModal/api/globalModal.query";
import type { GlobalModal } from "@/entities/globalModal/model/globalModal.type";
import { GlobalModalEditor } from "@/features/manageGlobalModal/GlobalModalEditor";
import UI from "@/shared/ui/UIComponent";
import { AdminPagination, AdminSidePanel, AdminTwoPanel, AdminWorkspace, ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";
import { useAdminSidePanelStore } from "@/widgets/admin/shared/model/useAdminSidePanelStore";
import Image from "next/image";
import { Text } from "@/shared/ui/kit/Text";

const PANEL_KEY = "/admin/modals";

export function Analysis() {
    const { data: modals = [] } = useAdminGlobalModalsQuery();
    const [selectedModal, setSelectedModal] = useState<GlobalModal | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<GlobalModal | null>(null);
    const [previewTarget, setPreviewTarget] = useState<GlobalModal | null>(null);
    const [page, setPage] = useState(1);
    const toggleModal = useToggleGlobalModalMutation();
    const deleteModal = useDeleteGlobalModalMutation();
    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(modals.length / pageSize));
    const visibleModals = modals.slice((page - 1) * pageSize, page * pageSize);
    const openPanel = useAdminSidePanelStore((state) => state.openPanel);
    const closePanel = useAdminSidePanelStore((state) => state.closePanel);

    useEffect(() => {
        closePanel(PANEL_KEY);
    }, [closePanel]);

    return (
        <AdminWorkspace>
            <AdminTwoPanel
                panelKey={PANEL_KEY}
                current="팝업 관리"
                title="팝업 관리"
                action={
                    <UI.Button
                        onClick={() => {
                            setSelectedModal(null);
                            openPanel(PANEL_KEY);
                        }}
                        type="button"
                    >
                        + 생성하기
                    </UI.Button>
                }
                left={
                    <>
                        {modals.length ? (
                            visibleModals.map((modal, mappedIdx) => {
                                const SELECTED = selectedModal?.id === modal.id;

                                return (
                                    <Fragment key={modal.id}>
                                        <section className="flex items-center justify-between h-[9.2rem]">
                                            <UI.Button
                                                // className="flex items-center gap-[1.2rem] flex-1"
                                                className={`${SELECTED ? "text-[var(--adaptive-red500)]" : ""} flex justify-start items-center gap-[1.2rem] transition hover:bg-white h-full flex-1`}
                                                onClick={() => {
                                                    setSelectedModal(modal);
                                                    openPanel(PANEL_KEY);
                                                }}
                                                type="button"
                                            >
                                                {modal.image_url ? (
                                                    <img
                                                        alt={modal.title}
                                                        className="h-[5.2rem] w-[5.2rem] rounded-[1.2rem] object-cover"
                                                        src={modal.image_url}
                                                    />
                                                ) : (
                                                    <span className="flex h-[5.2rem] w-[5.2rem] items-center justify-center rounded-[1.2rem] bg-[var(--adaptive-grey200)] text-xs font-bold text-[var(--adaptive-grey500)]">
                                                        No
                                                    </span>
                                                )}

                                                <div className="flex flex-col justify-center items-start gap-[0.8rem]">
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
                                                        <h6 className={`${SELECTED ? "text-[var(--adaptive-red500)]" : ""} truncate text-[2.0rem]`}>{modal.title}</h6>
                                                    )}

                                                    <p className="text-[1.4rem] text-[var(--adaptive-black500)]">
                                                        김주석 주임 <span className="mx-3">|</span>
                                                        {modal.starts_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(modal.starts_at)) : "시작일 없음"} ~{" "}
                                                        {modal.ends_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(modal.ends_at)) : "종료일 없음"}
                                                        <span className="mx-3">|</span>
                                                        <span className={modal.is_visible ? "text-[var(--adaptiveRed400)]" : ""}>{modal.is_visible ? "진행중" : "종료"}</span>
                                                    </p>
                                                </div>
                                            </UI.Button>

                                            <section className="flex h-full">
                                                <UI.Button
                                                    className="h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                                    onClick={() => setDeleteTarget(modal)}
                                                    type="button"
                                                >
                                                    <Image
                                                        src={"/images/icon/outlined/ico-outlined-trash.svg"}
                                                        alt=""
                                                        width={32}
                                                        height={32}
                                                    />

                                                    <p>삭제</p>
                                                </UI.Button>
                                                <UI.Button
                                                    className="h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                                    onClick={() => setPreviewTarget(modal)}
                                                    type="button"
                                                >
                                                    <Image
                                                        src={"/images/icon/outlined/ico-outlined-eye.svg"}
                                                        alt=""
                                                        width={32}
                                                        height={32}
                                                    />

                                                    <p>미리보기</p>
                                                </UI.Button>
                                                <UI.Button
                                                    className="h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                                    onClick={() => toggleModal.mutate({ id: modal.id, is_visible: !modal.is_visible })}
                                                    type="button"
                                                >
                                                    <Image
                                                        src={"/images/icon/outlined/ico-outlined-eye.svg"}
                                                        alt=""
                                                        width={32}
                                                        height={32}
                                                    />

                                                    {modal.is_visible ? "숨김" : "표시"}
                                                </UI.Button>
                                            </section>
                                        </section>

                                        {mappedIdx + 1 !== modals.length ? <div className="w-full h-[0.1rem] bg-[var(--adaptive-grey200)]" /> : null}
                                    </Fragment>
                                );
                            })
                        ) : (
                            <p className="py-16 text-2xl font-[700] text-[var(--adaptiveGrey500)]">등록된 팝업이 없습니다.</p>
                        )}
                        <AdminPagination
                            page={page}
                            totalPages={totalPages}
                            onChange={setPage}
                        />
                    </>
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
            {previewTarget ? (
                <div className="fixed inset-0 z-[90] bg-black/30 p-10">
                    <div className="grid h-full grid-cols-3 grid-rows-3 gap-4">
                        <div
                            className="rounded-[2.4rem] bg-black p-8 text-white shadow-[0_2rem_6rem_rgba(0,0,0,0.3)]"
                            style={{ gridColumn: previewTarget.col, gridRow: previewTarget.row }}
                        >
                            <button
                                className="mb-4 text-white/70"
                                onClick={() => setPreviewTarget(null)}
                                type="button"
                            >
                                닫기
                            </button>
                            {previewTarget.image_url ? (
                                <img
                                    alt=""
                                    className="mb-5 max-h-48 w-full rounded-xl object-cover"
                                    src={previewTarget.image_url}
                                />
                            ) : null}
                            <h3 className="mt-0 mb-4 text-3xl font-[700]">{previewTarget.title}</h3>
                            <p className="m-0 text-lg font-semibold leading-[1.5] text-white/80">{previewTarget.content}</p>
                        </div>
                    </div>
                </div>
            ) : null}
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
