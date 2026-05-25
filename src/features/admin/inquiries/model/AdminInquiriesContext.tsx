"use client";

import { createContext, ReactNode, useContext } from "react";

type AdminInquiriesPageProviderValue = { routeName: string };
const AdminInquiriesPageContext = createContext<AdminInquiriesPageProviderValue | null>(null);

export function AdminInquiriesPageProvider({ children }: { children: ReactNode }) {
    return <AdminInquiriesPageContext.Provider value={{ routeName: "admin/inquiries" }}>{children}</AdminInquiriesPageContext.Provider>;
}

export function useAdminInquiriesProvider() {
    const context = useContext(AdminInquiriesPageContext);
    if (!context) throw new Error("useAdminInquiriesProvider must be used within AdminInquiriesPageProvider");
    return context;
}
