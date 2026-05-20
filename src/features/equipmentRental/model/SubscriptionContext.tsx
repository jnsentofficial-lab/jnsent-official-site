"use client";

import { createContext, ReactNode, useContext } from "react";

type EquipmentRentalPageProviderValue = { routeName: string };
const EquipmentRentalPageContext = createContext<EquipmentRentalPageProviderValue | null>(null);

export function EquipmentRentalPageProvider({ children }: { children: ReactNode }) {
    return <EquipmentRentalPageContext.Provider value={{ routeName: "equipmentRental" }}>{children}</EquipmentRentalPageContext.Provider>;
}

export function useEquipmentRentalProvider() {
    const context = useContext(EquipmentRentalPageContext);
    if (!context) throw new Error("useEquipmentRentalProvider must be used within EquipmentRentalPageProvider");
    return context;
}
