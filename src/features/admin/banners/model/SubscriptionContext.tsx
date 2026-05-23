"use client";

import { createContext, ReactNode, useContext } from "react";

type AdminBannersPageProviderValue = { routeName: string };
const AdminBannersPageContext = createContext<AdminBannersPageProviderValue | null>(null);

export function AdminBannersPageProvider({ children }: { children: ReactNode }) {
    return <AdminBannersPageContext.Provider value={{ routeName: "admin/banners" }}>{children}</AdminBannersPageContext.Provider>;
}

export function useAdminBannersProvider() {
    const context = useContext(AdminBannersPageContext);
    if (!context) throw new Error("useAdminBannersProvider must be used within AdminBannersPageProvider");
    return context;
}
