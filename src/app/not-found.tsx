import Link from "next/link";

import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const metadata = buildPageMetadata({
    title: "페이지를 찾을 수 없습니다 | 제이엔에스 엔터테인먼트",
    description: "요청하신 페이지를 찾을 수 없습니다.",
    path: "/404",
    noIndex: true,
});

export default function NotFound() {
    return (
        <Main
            id="not-found"
            className={{ container: "min-h-[calc(100svh-10.8rem)]" }}
        >
            <section className="mx-auto flex min-h-[calc(100svh-10.8rem)] max-w-[68rem] flex-col items-center justify-center gap-[2.4rem] px-[1.6rem] py-[5.2rem] text-center">
                <p className="text-[1.6rem] font-[700] text-[var(--adaptive-grey500)]">404</p>
                <h1 className="m-0 text-[3.2rem] font-[900] leading-[1.4]">페이지를 찾을 수 없습니다</h1>
                <p className="m-0 text-[1.8rem] leading-[1.6] text-[var(--adaptive-grey500)]">
                    주소가 변경되었거나 더 이상 제공되지 않는 페이지입니다.
                </p>
                <Link
                    className="rounded-full bg-black px-[2.4rem] py-[1.4rem] text-[1.6rem] font-[700] text-white"
                    href="/"
                >
                    메인으로 돌아가기
                </Link>
            </section>
        </Main>
    );
}
