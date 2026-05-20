"use client";

import { createContext, ReactNode, useContext } from "react";

type SettingsRemoteControlPageProviderValue = {
    routeName: string;
    status: string;
};

const SettingsRemoteControlPageContext = createContext<SettingsRemoteControlPageProviderValue | null>(null);

export function SettingsRemoteControlPageProvider({ children }: { children: ReactNode }) {
    return <SettingsRemoteControlPageContext.Provider value={{ routeName: "settings/remoteControl", status: "ready" }}>{children}</SettingsRemoteControlPageContext.Provider>;
}

export function useSettingsRemoteControlProvider() {
    const context = useContext(SettingsRemoteControlPageContext);

    if (!context) {
        throw new Error("useSettingsRemoteControlProvider must be used within SettingsRemoteControlPageProvider");
    }

    return context;
}
