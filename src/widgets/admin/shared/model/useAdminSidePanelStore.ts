"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const adminPanelKeys = [
    "/admin/inquiries",
    "/admin/account/manager",
    "/admin/modals",
    "/admin/news",
] as const;

export type AdminPanelKey = (typeof adminPanelKeys)[number];

type AdminSidePanelStore = {
    openedPanels: Record<AdminPanelKey, boolean>;
    listPageSize: number;
    openPanel: (key: AdminPanelKey) => void;
    closePanel: (key: AdminPanelKey) => void;
    setListPageSize: (size: number) => void;
};

const initialOpenedPanels = adminPanelKeys.reduce(
    (acc, key) => ({
        ...acc,
        [key]: false,
    }),
    {} as Record<AdminPanelKey, boolean>,
);

export const useAdminSidePanelStore = create<AdminSidePanelStore>()(
    persist(
        (set) => ({
            openedPanels: initialOpenedPanels,
            listPageSize: 5,
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
            setListPageSize: (size) => set({ listPageSize: size }),
        }),
        {
            name: "admin-side-panel-store",
            partialize: (state) => ({
                listPageSize: state.listPageSize,
            }),
        },
    ),
);
