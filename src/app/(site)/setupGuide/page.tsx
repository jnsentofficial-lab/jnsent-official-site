import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SetupGuideView } from "@/views/setupGuide/SetupGuideView";
import Main from "@/widgets/layout/Main";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "프로그램 세팅안내 | New Project 2",
    description: "방송 시작 전 필요한 프로그램, 장비, 네트워크 설정을 안내합니다.",
};

export default async function SetupGuidePage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="setup-guide"
            className={{ inner: "", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <SetupGuideView />
        </Main>
    );
}
