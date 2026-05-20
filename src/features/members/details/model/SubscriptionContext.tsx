"use client";

import { createContext, ReactNode, useContext } from "react";

type MemberDetailsPageProviderValue = {
    routeName: string;
    status: string;
};

const MemberDetailsPageContext = createContext<MemberDetailsPageProviderValue | null>(null);

export function MemberDetailsPageProvider({ children }: { children: ReactNode }) {
    return <MemberDetailsPageContext.Provider value={{ routeName: "members/details", status: "ready" }}>{children}</MemberDetailsPageContext.Provider>;
}

export function useMemberDetailsProvider() {
    const context = useContext(MemberDetailsPageContext);

    if (!context) {
        throw new Error("useMemberDetailsProvider must be used within MemberDetailsPageProvider");
    }

    return context;
}
