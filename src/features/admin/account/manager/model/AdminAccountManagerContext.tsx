"use client";

import { createContext, ReactNode, useContext } from "react";

type AdminAccountManagerPageProviderValue = { routeName: string };
const AdminAccountManagerPageContext = createContext<AdminAccountManagerPageProviderValue | null>(null);

export function AdminAccountManagerPageProvider({ children }: { children: ReactNode }) {
    return <AdminAccountManagerPageContext.Provider value={{ routeName: "admin/account/manager" }}>{children}</AdminAccountManagerPageContext.Provider>;
}

export function useAdminAccountManagerProvider() {
    const context = useContext(AdminAccountManagerPageContext);
    if (!context) throw new Error("useAdminAccountManagerProvider must be used within AdminAccountManagerPageProvider");
    return context;
}
