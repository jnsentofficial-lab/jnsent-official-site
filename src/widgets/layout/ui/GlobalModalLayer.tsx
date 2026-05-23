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
                    onClose={() => closeModal(modal)}
                    className="max-w-[min(42rem,calc(100vw-3.2rem))]"
                    actions={[
                        ...(modal.dismiss_type === "today" ? [{ title: "오늘 하루 닫기", type: "action" as const, onClick: () => closeModal(modal) }] : []),
                        ...(modal.dismiss_type === "days" ? [{ title: `${modal.dismiss_days ?? 1}일 동안 닫기`, type: "action" as const, onClick: () => closeModal(modal) }] : []),
                        { title: "닫기", type: "close" },
                    ]}
                >
                    {modal.image_url ? (
                        <Modal.Container>
                            <Modal.Item>
                                <img
                                    className="block max-h-[22rem] w-full object-cover"
                                    alt=""
                                    src={modal.image_url}
                                />
                            </Modal.Item>
                        </Modal.Container>
                    ) : null}
                </Modal>
            ))}
        </>
    );
}
