"use client";

import { Fragment, useState } from "react";
import { useAdminGlobalModalsQuery, useDeleteGlobalModalMutation, useToggleGlobalModalMutation } from "@/entities/globalModal/api/globalModal.query";
import type { GlobalModal } from "@/entities/globalModal/model/globalModal.type";
import { GlobalModalEditor } from "@/features/manageGlobalModal/GlobalModalEditor";
import UI from "@/shared/ui/UIComponent";
import { AdminPagination, AdminTwoPanel, AdminWorkspace, ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";
import Image from "next/image";

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

    return (
        <AdminWorkspace
            current="팝업 관리"
            title="팝업 관리"
        >
            <AdminTwoPanel
                current="팝업 관리"
                title="팝업 관리"
                action={
                    <UI.Button
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
                                {visibleModals.map((modal, mappedIdx) => (
                                    <Fragment key={modal.id}>
                                        <article className="grid grid-cols-[8rem_minmax(0,1fr)_8rem] items-center gap-6 py-[2.4rem] max-[86rem]:grid-cols-1">
                                            <UI.Button
                                                className="contents text-left"
                                                onClick={() => setSelectedModal(modal)}
                                                type="button"
                                            >
                                                {modal.image_url ? (
                                                    <img
                                                        alt={modal.title}
                                                        className="h-20 w-20 rounded-2xl object-cover"
                                                        src={modal.image_url}
                                                    />
                                                ) : (
                                                    <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--adaptive-grey200)] text-xs font-bold text-[var(--adaptive-grey500)]">
                                                        No
                                                    </span>
                                                )}
                                                <span className="grid min-w-0 gap-4">
                                                    <h6 className={`${selectedModal?.id === modal.id ? "text-[var(--adaptive-red500)]" : ""} truncate text-[2.0rem]`}>{modal.title}</h6>

                                                    <section className="truncate text-[1.4rem] text-[var(--adaptive-grey500)]">
                                                        김주석 주임 <span className="mx-3">|</span>
                                                        {modal.starts_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(modal.starts_at)) : "시작일 없음"} ~{" "}
                                                        {modal.ends_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(modal.ends_at)) : "종료일 없음"}
                                                        <span className="mx-3">|</span>
                                                        <span className={modal.is_visible ? "text-[var(--adaptiveRed400)]" : ""}>{modal.is_visible ? "진행중" : "종료"}</span>
                                                    </section>
                                                </span>
                                            </UI.Button>

                                            <section className="">
                                                <UI.Button
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
                                        </article>

                                        {mappedIdx + 1 !== modals.length ? <div className="w-full h-[0.1rem] bg-[var(--adaptive-grey200)]" /> : null}
                                    </Fragment>
                                ))}
                            </div>
                        ) : (
                            <p className="py-16 text-2xl font-black text-[var(--adaptiveGrey500)]">등록된 팝업이 없습니다.</p>
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
                        <h2 className="mt-0 mb-12 text-4xl font-black text-black">{selectedModal ? "수정하기" : "생성하기"}</h2>
                        <GlobalModalEditor
                            modal={selectedModal}
                            onSaved={() => setSelectedModal(null)}
                        />
                    </div>
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
