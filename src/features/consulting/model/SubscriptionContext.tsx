"use client";

import { createContext, ReactNode, useContext } from "react";

type ConsultingPageProviderValue = { routeName: string };
const ConsultingPageContext = createContext<ConsultingPageProviderValue | null>(null);

export function ConsultingPageProvider({ children }: { children: ReactNode }) {
    return <ConsultingPageContext.Provider value={{ routeName: "consulting" }}>{children}</ConsultingPageContext.Provider>;
}

export function useConsultingProvider() {
    const context = useContext(ConsultingPageContext);
    if (!context) throw new Error("useConsultingProvider must be used within ConsultingPageProvider");
    return context;
}
