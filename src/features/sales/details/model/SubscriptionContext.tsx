"use client";

import { createContext, ReactNode, useContext } from "react";

type SalesDetailsPageProviderValue = {
    routeName: string;
    status: string;
};

const SalesDetailsPageContext = createContext<SalesDetailsPageProviderValue | null>(null);

export function SalesDetailsPageProvider({ children }: { children: ReactNode }) {
    return <SalesDetailsPageContext.Provider value={{ routeName: "sales/details", status: "ready" }}>{children}</SalesDetailsPageContext.Provider>;
}

export function useSalesDetailsProvider() {
    const context = useContext(SalesDetailsPageContext);

    if (!context) {
        throw new Error("useSalesDetailsProvider must be used within SalesDetailsPageProvider");
    }

    return context;
}
