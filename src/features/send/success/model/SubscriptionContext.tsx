"use client";

import { createContext, ReactNode, useContext } from "react";

type SendSuccessPageProviderValue = { routeName: string };
const SendSuccessPageContext = createContext<SendSuccessPageProviderValue | null>(null);

export function SendSuccessPageProvider({ children }: { children: ReactNode }) {
    return <SendSuccessPageContext.Provider value={{ routeName: "send/success" }}>{children}</SendSuccessPageContext.Provider>;
}

export function useSendSuccessProvider() {
    const context = useContext(SendSuccessPageContext);
    if (!context) throw new Error("useSendSuccessProvider must be used within SendSuccessPageProvider");
    return context;
}
