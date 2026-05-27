"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { GlobalModalLayer } from "@/widgets/layout/ui";
// import TransitionTest from "@/app/TransitionTest";

type PopupProviderProps = {
    children: ReactNode;
};

export function PopupProvider({ children }: PopupProviderProps) {
    const pathname = usePathname();
    const isAdminPath = pathname.startsWith("/admin");

    return (
        <>
            {children}
            <GlobalModalLayer includePublic={!isAdminPath} />
        </>
    );
}
