"use client";

import { useState } from "react";
import { useAdminGlobalModalsQuery, useDeleteGlobalModalMutation, useToggleGlobalModalMutation } from "@/entities/globalModal/api/globalModal.query";
import type { GlobalModal } from "@/entities/globalModal/model/globalModal.type";
import { GlobalModalEditor } from "@/features/manageGlobalModal/GlobalModalEditor";
import UI from "@/shared/ui/UIComponent";
import { AdminEmptyState, AdminPagination, AdminSidePanel, AdminTwoPanel, AdminWorkspace, ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";

export function ModalManagement() {
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

    return (
        <AdminWorkspace>
            <AdminTwoPanel
                current="팝업 관리"
                title="팝업 관리"
                action={
                    <UI.Button
                        className="min-h-14 bg-black px-6 text-lg font-black text-white"
                        onClick={() => setSelectedModal(null)}
                        type="button"
                    >
                        + 팝업 만들기
                    </UI.Button>
                }
                left={
                    <>
                        {modals.length ? (
                            <div className="grid gap-0">
                                {visibleModals.map((modal) => (
                                    <article
                                        className={`grid grid-cols-[minmax(0,1fr)_8rem] items-center gap-6 border-b border-[var(--adaptive-grey200)] py-8 ${selectedModal?.id === modal.id ? "text-[var(--adaptive-red300)]" : "text-black"}`}
                                        key={modal.id}
                                    >
                                        <button
                                            className="grid gap-5 text-left"
                                            onClick={() => setSelectedModal(modal)}
                                            type="button"
                                        >
                                            <strong className="truncate text-2xl font-black">{modal.title}</strong>
                                            <span className="text-lg font-semibold text-black">
                                                김주석 주임 <span className="mx-3">|</span>
                                                {modal.starts_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(modal.starts_at)) : "시작일 없음"} ~{" "}
                                                {modal.ends_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(modal.ends_at)) : "종료일 없음"}
                                                <span className="mx-3">|</span>
                                                <span className={modal.is_visible ? "text-[var(--adaptive-red400)]" : ""}>{modal.is_visible ? "진행중" : "종료"}</span>
                                            </span>
                                        </button>

                                        <div className="grid justify-items-center gap-2">
                                            <UI.Button
                                                className="text-2xl font-black"
                                                onClick={() => setDeleteTarget(modal)}
                                                type="button"
                                            >
                                                ▱<span className="text-base font-black">삭제</span>
                                            </UI.Button>

                                            <UI.Button
                                                className="text-sm font-black text-[var(--adaptive-grey600)]"
                                                onClick={() => setPreviewTarget(modal)}
                                                type="button"
                                            >
                                                미리보기
                                            </UI.Button>
                                            <UI.Button
                                                className="text-sm font-black text-[var(--adaptive-grey600)]"
                                                onClick={() => toggleModal.mutate({ id: modal.id, is_visible: !modal.is_visible })}
                                                type="button"
                                            >
                                                {modal.is_visible ? "숨김" : "표시"}
                                            </UI.Button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <AdminEmptyState message="등록된 팝업이 없습니다." />
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
                        title={selectedModal ? "팝업 수정" : "팝업 생성"}
                        description={selectedModal ? "선택한 팝업의 노출 상태와 내용을 수정합니다." : "새 전역 팝업을 만들어 사용자에게 노출할 수 있습니다."}
                    >
                        <GlobalModalEditor
                            modal={selectedModal}
                            onSaved={() => setSelectedModal(null)}
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
                            <h3 className="mt-0 mb-4 text-3xl font-black">{previewTarget.title}</h3>
                            <p className="m-0 text-lg font-semibold leading-[1.7] text-white/80">{previewTarget.content}</p>
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
