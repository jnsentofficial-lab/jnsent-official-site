"use client";

import { createContext, ReactNode, useContext } from "react";

type AdminNewsPageProviderValue = { routeName: string };
const AdminNewsPageContext = createContext<AdminNewsPageProviderValue | null>(null);

export function AdminNewsPageProvider({ children }: { children: ReactNode }) {
    return <AdminNewsPageContext.Provider value={{ routeName: "admin/news" }}>{children}</AdminNewsPageContext.Provider>;
}

export function useAdminNewsProvider() {
    const context = useContext(AdminNewsPageContext);
    if (!context) throw new Error("useAdminNewsProvider must be used within AdminNewsPageProvider");
    return context;
}
