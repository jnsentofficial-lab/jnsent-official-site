"use client";

import { ReactNode } from "react";
import { GlobalModalLayer } from "@/widgets/layout/ui";

type PopupProviderProps = {
    children: ReactNode;
};

export function PopupProvider({ children }: PopupProviderProps) {
    return (
        <>
            {children}
            <GlobalModalLayer />
        </>
    );
}
