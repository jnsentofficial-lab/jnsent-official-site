"use client";

import { createContext, ReactNode, useContext } from "react";

type AdminUploadsPageProviderValue = { routeName: string };
const AdminUploadsPageContext = createContext<AdminUploadsPageProviderValue | null>(null);

export function AdminUploadsPageProvider({ children }: { children: ReactNode }) {
    return <AdminUploadsPageContext.Provider value={{ routeName: "admin/uploads" }}>{children}</AdminUploadsPageContext.Provider>;
}

export function useAdminUploadsProvider() {
    const context = useContext(AdminUploadsPageContext);
    if (!context) throw new Error("useAdminUploadsProvider must be used within AdminUploadsPageProvider");
    return context;
}
