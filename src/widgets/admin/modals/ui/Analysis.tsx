"use client";

import { useAdminGlobalModalsQuery, useDeleteGlobalModalMutation, useToggleGlobalModalMutation } from "@/entities/globalModal/api/globalModal.query";
import { GlobalModalEditor } from "@/features/manageGlobalModal/GlobalModalEditor";
import UI from "@/shared/ui/UIComponent";

export function Analysis() {
    const { data: modals = [] } = useAdminGlobalModalsQuery();
    const toggleModal = useToggleGlobalModalMutation();
    const deleteModal = useDeleteGlobalModalMutation();

    return (
        <div className="grid grid-cols-[minmax(32rem,0.8fr)_minmax(0,1fr)] gap-[1.8rem] max-[86rem]:grid-cols-1">
            <section className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">모달 편집</h2>
                <GlobalModalEditor />
            </section>
            <section className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">등록된 모달</h2>
                <div className="grid gap-3">
                    {modals.length ? (
                        modals.map((modal) => (
                            <article
                                className="flex min-h-28 items-center justify-between gap-[1.8rem] rounded-lg border border-slate-200 bg-slate-50 p-[1.8rem] max-[86rem]:flex-col max-[86rem]:items-start"
                                key={modal.id}
                            >
                                <div className="grid gap-2">
                                    <strong className="text-slate-900">{modal.title}</strong>
                                    <span className="leading-[1.6] text-slate-700">
                                        위치 {modal.col},{modal.row} / stack {modal.stack_order} / {modal.dismiss_type}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <UI.Button
                                        className="min-h-11 shrink-0 rounded-lg bg-green-100 px-3.5 font-bold text-green-700"
                                        onClick={() => toggleModal.mutate({ id: modal.id, is_visible: !modal.is_visible })}
                                        type="button"
                                    >
                                        {modal.is_visible ? "표시" : "숨김"}
                                    </UI.Button>
                                    <UI.Button
                                        className="min-h-11 shrink-0 rounded-lg bg-green-100 px-3.5 font-bold text-green-700"
                                        onClick={() => deleteModal.mutate({ id: modal.id })}
                                        type="button"
                                    >
                                        삭제
                                    </UI.Button>
                                </div>
                            </article>
                        ))
                    ) : (
                        <p>등록된 모달이 없습니다.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
