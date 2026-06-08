import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SuccessView } from "@/views/send/success/SuccessView";
import Main from "@/widgets/layout/Main";

export const metadata: Metadata = {
    title: "문의 접수 완료 | 제이엔에스 엔터테인먼트",
    description: "문의 접수가 정상적으로 완료되었습니다.",
};

export default async function SendSuccessPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="send-success"
            className={{ container: "min-h-[calc(100svh-10.8rem)]" }}
        >
            <SuccessView />
        </Main>
    );
}
