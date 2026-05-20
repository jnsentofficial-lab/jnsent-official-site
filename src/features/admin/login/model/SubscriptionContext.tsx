"use client";

import { createContext, ReactNode, useContext } from "react";

type AdminLoginPageProviderValue = { routeName: string };
const AdminLoginPageContext = createContext<AdminLoginPageProviderValue | null>(null);

export function AdminLoginPageProvider({ children }: { children: ReactNode }) {
    return <AdminLoginPageContext.Provider value={{ routeName: "admin/login" }}>{children}</AdminLoginPageContext.Provider>;
}

export function useAdminLoginProvider() {
    const context = useContext(AdminLoginPageContext);
    if (!context) throw new Error("useAdminLoginProvider must be used within AdminLoginPageProvider");
    return context;
}
