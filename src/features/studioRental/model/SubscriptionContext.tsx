"use client";

import { createContext, ReactNode, useContext } from "react";

type StudioRentalPageProviderValue = { routeName: string };
const StudioRentalPageContext = createContext<StudioRentalPageProviderValue | null>(null);

export function StudioRentalPageProvider({ children }: { children: ReactNode }) {
    return <StudioRentalPageContext.Provider value={{ routeName: "studioRental" }}>{children}</StudioRentalPageContext.Provider>;
}

export function useStudioRentalProvider() {
    const context = useContext(StudioRentalPageContext);
    if (!context) throw new Error("useStudioRentalProvider must be used within StudioRentalPageProvider");
    return context;
}
