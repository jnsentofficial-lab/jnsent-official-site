import type { Metadata } from "next";
import { cookies } from "next/headers";
import { FailedView } from "@/views/send/failed/FailedView";
import Main from "@/widgets/layout/Main";

export const metadata: Metadata = {
    title: "문의 접수 실패 | 제이엔에스 엔터테인먼트",
    description: "문의 전송 중 오류가 발생했습니다.",
};

export default async function SendFailedPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="send-failed"
            className={{ container: "min-h-[calc(100svh-10.8rem)]" }}
        >
            <FailedView />
        </Main>
    );
}
