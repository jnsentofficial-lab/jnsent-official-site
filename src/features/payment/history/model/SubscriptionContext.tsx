"use client";

import { createContext, ReactNode, useContext } from "react";

type PaymentHistoryPageProviderValue = {
    routeName: string;
    status: string;
};

const PaymentHistoryPageContext = createContext<PaymentHistoryPageProviderValue | null>(null);

export function PaymentHistoryPageProvider({ children }: { children: ReactNode }) {
    return <PaymentHistoryPageContext.Provider value={{ routeName: "payment/history", status: "ready" }}>{children}</PaymentHistoryPageContext.Provider>;
}

export function usePaymentHistoryProvider() {
    const context = useContext(PaymentHistoryPageContext);

    if (!context) {
        throw new Error("usePaymentHistoryProvider must be used within PaymentHistoryPageProvider");
    }

    return context;
}
