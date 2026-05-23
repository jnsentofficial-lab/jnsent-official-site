"use client";

import { createContext, ReactNode, useContext } from "react";

type AdminPagesPageProviderValue = { routeName: string };
const AdminPagesPageContext = createContext<AdminPagesPageProviderValue | null>(null);

export function AdminPagesPageProvider({ children }: { children: ReactNode }) {
    return <AdminPagesPageContext.Provider value={{ routeName: "admin/pages" }}>{children}</AdminPagesPageContext.Provider>;
}

export function useAdminPagesProvider() {
    const context = useContext(AdminPagesPageContext);
    if (!context) throw new Error("useAdminPagesProvider must be used within AdminPagesPageProvider");
    return context;
}
