"use client";

import { createContext, ReactNode, useContext } from "react";

type SetupGuidePageProviderValue = { routeName: string };
const SetupGuidePageContext = createContext<SetupGuidePageProviderValue | null>(null);

export function SetupGuidePageProvider({ children }: { children: ReactNode }) {
    return <SetupGuidePageContext.Provider value={{ routeName: "setupGuide" }}>{children}</SetupGuidePageContext.Provider>;
}

export function useSetupGuideProvider() {
    const context = useContext(SetupGuidePageContext);
    if (!context) throw new Error("useSetupGuideProvider must be used within SetupGuidePageProvider");
    return context;
}
