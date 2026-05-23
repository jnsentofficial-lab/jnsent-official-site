"use client";

import { createContext, ReactNode, useContext } from "react";

type AdminModalsPageProviderValue = { routeName: string };
const AdminModalsPageContext = createContext<AdminModalsPageProviderValue | null>(null);

export function AdminModalsPageProvider({ children }: { children: ReactNode }) {
    return <AdminModalsPageContext.Provider value={{ routeName: "admin/modals" }}>{children}</AdminModalsPageContext.Provider>;
}

export function useAdminModalsProvider() {
    const context = useContext(AdminModalsPageContext);
    if (!context) throw new Error("useAdminModalsProvider must be used within AdminModalsPageProvider");
    return context;
}
