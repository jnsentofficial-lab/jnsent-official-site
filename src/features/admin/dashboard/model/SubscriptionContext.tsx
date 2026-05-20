"use client";

import { createContext, ReactNode, useContext } from "react";

type AdminDashboardPageProviderValue = { routeName: string };
const AdminDashboardPageContext = createContext<AdminDashboardPageProviderValue | null>(null);

export function AdminDashboardPageProvider({ children }: { children: ReactNode }) {
    return <AdminDashboardPageContext.Provider value={{ routeName: "admin/dashboard" }}>{children}</AdminDashboardPageContext.Provider>;
}

export function useAdminDashboardProvider() {
    const context = useContext(AdminDashboardPageContext);
    if (!context) throw new Error("useAdminDashboardProvider must be used within AdminDashboardPageProvider");
    return context;
}
