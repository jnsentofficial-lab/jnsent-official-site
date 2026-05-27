import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ConsultingView } from "@/views/consulting/ConsultingView";
import Main from "@/widgets/layout/Main";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "엔터창업컨설팅 | 제이엔에스 엔터테인먼트",
    description: "엔터테인먼트 창업을 위한 운영 구조와 실행 계획을 안내합니다.",
};

export default async function ConsultingPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="consulting"
            className={{ inner: "", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <ConsultingView />
        </Main>
    );
}
