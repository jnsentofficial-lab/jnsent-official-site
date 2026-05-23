"use client";

import { createContext, ReactNode, useContext } from "react";

type AboutPageProviderValue = { routeName: string };
const AboutPageContext = createContext<AboutPageProviderValue | null>(null);

export function AboutPageProvider({ children }: { children: ReactNode }) {
    return <AboutPageContext.Provider value={{ routeName: "about" }}>{children}</AboutPageContext.Provider>;
}

export function useAboutProvider() {
    const context = useContext(AboutPageContext);
    if (!context) throw new Error("useAboutProvider must be used within AboutPageProvider");
    return context;
}
