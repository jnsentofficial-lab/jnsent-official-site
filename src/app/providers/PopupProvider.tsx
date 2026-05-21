"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { GlobalModalLayer } from "@/widgets/layout/ui";

type PopupProviderProps = {
    children: ReactNode;
};

export function PopupProvider({ children }: PopupProviderProps) {
    const pathname = usePathname();
    const isAdminPath = pathname.startsWith("/admin");

    return (
        <>
            {children}
            {isAdminPath ? null : <GlobalModalLayer />}
        </>
    );
}
