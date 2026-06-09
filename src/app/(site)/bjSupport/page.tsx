import type { Metadata } from "next";
import { cookies } from "next/headers";
import { BjSupportView } from "@/views/bjSupport/BjSupportView";
import Main from "@/widgets/layout/Main";
import { buildCmsPageMetadata } from "@/shared/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
    return buildCmsPageMetadata("bjSupport", {
        title: "BJ 지원 및 상담 | 제이엔에스 엔터테인먼트",
        description: "BJ 활동 시작과 성장을 위한 방송 운영 상담을 안내합니다.",
        path: "/bjSupport",
    });
}

export default async function BjSupportPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="bj-support"
            className={{ inner: "", container: "min-h-[calc(100svh-10.8rem)]" }}
        >
            <BjSupportView />
        </Main>
    );
}
