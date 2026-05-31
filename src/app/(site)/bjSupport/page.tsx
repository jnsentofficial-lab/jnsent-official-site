import type { Metadata } from "next";
import { cookies } from "next/headers";
import { BjSupportView } from "@/views/bjSupport/BjSupportView";
import Main from "@/widgets/layout/Main";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "BJ 지원 및 상담 | 제이엔에스 엔터테인먼트",
    description: "BJ 활동 시작과 성장을 위한 방송 운영 상담을 안내합니다.",
};

export default async function BjSupportPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="bj-support"
            className={{ inner: "", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <BjSupportView />
        </Main>
    );
}
