"use client";

import { createContext, ReactNode, useContext } from "react";

type SendFailedPageProviderValue = { routeName: string };
const SendFailedPageContext = createContext<SendFailedPageProviderValue | null>(null);

export function SendFailedPageProvider({ children }: { children: ReactNode }) {
    return <SendFailedPageContext.Provider value={{ routeName: "send/failed" }}>{children}</SendFailedPageContext.Provider>;
}

export function useSendFailedProvider() {
    const context = useContext(SendFailedPageContext);
    if (!context) throw new Error("useSendFailedProvider must be used within SendFailedPageProvider");
    return context;
}
