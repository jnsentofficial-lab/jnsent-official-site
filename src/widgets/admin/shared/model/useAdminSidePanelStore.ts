"use client";

import { create } from "zustand";

export const adminPanelKeys = [
    "/admin/inquiries",
    "/admin/account/manager",
    "/admin/modals",
    "/admin/news",
] as const;

export type AdminPanelKey = (typeof adminPanelKeys)[number];

type AdminSidePanelStore = {
    openedPanels: Record<AdminPanelKey, boolean>;
    openPanel: (key: AdminPanelKey) => void;
    closePanel: (key: AdminPanelKey) => void;
};

const initialOpenedPanels = adminPanelKeys.reduce(
    (acc, key) => ({
        ...acc,
        [key]: false,
    }),
    {} as Record<AdminPanelKey, boolean>,
);

export const useAdminSidePanelStore = create<AdminSidePanelStore>()((set) => ({
    openedPanels: initialOpenedPanels,
    openPanel: (key) =>
        set((state) => ({
            openedPanels: {
                ...state.openedPanels,
                [key]: true,
            },
        })),
    closePanel: (key) =>
        set((state) => ({
            openedPanels: {
                ...state.openedPanels,
                [key]: false,
            },
        })),
}));
