"use client";

import { createContext, ReactNode, useContext } from "react";

type HomePageProviderValue = { routeName: string };
const HomePageContext = createContext<HomePageProviderValue | null>(null);

export function HomePageProvider({ children }: { children: ReactNode }) {
    return <HomePageContext.Provider value={{ routeName: "home" }}>{children}</HomePageContext.Provider>;
}

export function useHomeProvider() {
    const context = useContext(HomePageContext);
    if (!context) throw new Error("useHomeProvider must be used within HomePageProvider");
    return context;
}
