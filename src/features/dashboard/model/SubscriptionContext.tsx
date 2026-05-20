"use client";

import { createContext, ReactNode, useContext } from "react";

type DashboardPageProviderValue = {
    routeName: string;
    status: string;
};

const DashboardPageContext = createContext<DashboardPageProviderValue | null>(null);

export function DashboardPageProvider({ children }: { children: ReactNode }) {
    return <DashboardPageContext.Provider value={{ routeName: "dashboard", status: "ready" }}>{children}</DashboardPageContext.Provider>;
}

export function useDashboardProvider() {
    const context = useContext(DashboardPageContext);

    if (!context) {
        throw new Error("useDashboardProvider must be used within DashboardPageProvider");
    }

    return context;
}
