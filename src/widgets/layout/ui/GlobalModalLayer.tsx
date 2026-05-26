"use client";

import { useMemo, useState } from "react";
import { useVisibleGlobalModalsQuery } from "@/entities/globalModal/api/globalModal.query";
import type { GlobalModal } from "@/entities/globalModal/model/globalModal.type";
import Modal from "@/shared/ui/composed/Modal";

type ActiveByPosition = Record<string, number>;

function getPositionKey(modal: GlobalModal) {
    return `${modal.col}-${modal.row}`;
}

function getUntil(modal: GlobalModal) {
    const now = new Date();

    if (modal.dismiss_type === "today") {
        const end = new Date(now);
        end.setHours(23, 59, 59, 999);
        return end.getTime();
    }

    if (modal.dismiss_type === "days") {
        const end = new Date(now);
        end.setDate(end.getDate() + (modal.dismiss_days ?? 1));
        return end.getTime();
    }

    return 0;
}

function isDismissed(modal: GlobalModal) {
    if (typeof window === "undefined") {
        return false;
    }

    const value = window.localStorage.getItem(`globalModal:${modal.id}`);

    return value ? Number(value) > Date.now() : false;
}

export function GlobalModalLayer() {
    const { data: modals } = useVisibleGlobalModalsQuery();
    const [activeByPosition, setActiveByPosition] = useState<ActiveByPosition>({});
    const [closedIds, setClosedIds] = useState<string[]>([]);
    const grouped = useMemo(() => {
        return modals.reduce<Record<string, GlobalModal[]>>((acc, modal) => {
            if (closedIds.includes(modal.id) || isDismissed(modal)) {
                return acc;
            }

            const key = getPositionKey(modal);
            acc[key] = [...(acc[key] ?? []), modal];
            return acc;
        }, {});
    }, [closedIds, modals]);
    const visibleModals = Object.entries(grouped)
        .map(([key, items]) => items[activeByPosition[key] ?? 0])
        .filter(Boolean);

    function closeModal(modal: GlobalModal) {
        const until = getUntil(modal);

        if (until) {
            window.localStorage.setItem(`globalModal:${modal.id}`, String(until));
        }

        const key = getPositionKey(modal);
        const items = grouped[key] ?? [];
        const current = activeByPosition[key] ?? 0;

        if (current + 1 < items.length) {
            setActiveByPosition((previous) => ({
                ...previous,
                [key]: current + 1,
            }));
            return;
        }

        setClosedIds((previous) => [...previous, modal.id]);
    }

    if (!visibleModals.length) {
        return null;
    }

    return (
        <>
            {visibleModals.map((modal) => (
                <Modal
                    key={modal.id}
                    title={modal.title}
                    description={modal.content}
                    open
                    placement={{ col: modal.col, row: modal.row }}
                    onClose={() => closeModal(modal)}
                    className="w-fit max-w-[calc(100vw-3.2rem)] bg-transparent shadow-none"
                    // className="w-fit max-w-[calc(100vw-3.2rem)] bg-transparent shadow-none"
                    actions={[
                        ...(modal.dismiss_type === "today" ? [{ title: "오늘 하루 닫기", type: "action" as const, onClick: () => closeModal(modal) }] : []),
                        ...(modal.dismiss_type === "days" ? [{ title: `${modal.dismiss_days ?? 1}일 동안 닫기`, type: "action" as const, onClick: () => closeModal(modal) }] : []),
                        { title: "닫기", type: "close" },
                    ]}
                >
                    <section>
                        {modal.image_url ? (
                            <img
                                // className="block h-auto max-h-[calc(100dvh-3.2rem)] w-auto max-w-full object-contain"
                                className="block h-auto min-h-[51.2rem] max-h-[50dvh] w-auto max-w-full object-contain"
                                alt=""
                                src={modal.image_url}
                            />
                        ) : null}
                    </section>
                    {/* // <Modal.Container>
                    //     <Modal.Item>
                    //     </Modal.Item>
                    // </Modal.Container> */}
                </Modal>
            ))}
        </>
    );
}
