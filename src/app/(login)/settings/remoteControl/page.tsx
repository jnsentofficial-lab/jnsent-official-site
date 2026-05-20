import { cookies } from "next/headers";
import { SettingsRemoteControlView } from "@/views/settings/remoteControl/SettingsRemoteControlView";
import Main from "@/widgets/layout/Main";

export default async function SettingsRemoteControlPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="settings-remote-control"
            className={{ inner: "px-[2.0rem] max-w-[var(--size-pc)]", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <SettingsRemoteControlView />
        </Main>
    );
}
