"use client";

import { createContext, ReactNode, useContext } from "react";

type BjSupportPageProviderValue = { routeName: string };
const BjSupportPageContext = createContext<BjSupportPageProviderValue | null>(null);

export function BjSupportPageProvider({ children }: { children: ReactNode }) {
    return <BjSupportPageContext.Provider value={{ routeName: "bjSupport" }}>{children}</BjSupportPageContext.Provider>;
}

export function useBjSupportProvider() {
    const context = useContext(BjSupportPageContext);
    if (!context) throw new Error("useBjSupportProvider must be used within BjSupportPageProvider");
    return context;
}
