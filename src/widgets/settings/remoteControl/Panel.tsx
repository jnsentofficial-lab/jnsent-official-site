"use client";

import { SettingsRemoteControlPageProvider } from "@/features/settings/remoteControl/model/SubscriptionContext";
import * as SettingsRemoteControlLayer from "@/widgets/settings/remoteControl/ui";

export default function Panel() {
    return (
        <SettingsRemoteControlPageProvider>
            <SettingsRemoteControlLayer.Title />
            <div className="grid gap-4">
                <SettingsRemoteControlLayer.Action />
                <SettingsRemoteControlLayer.Analysis />
            </div>
        </SettingsRemoteControlPageProvider>
    );
}
