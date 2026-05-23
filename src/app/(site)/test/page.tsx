import type { Metadata } from "next";
import { cookies } from "next/headers";
import { TestView } from "@/views/test/TestView";
import Main from "@/widgets/layout/Main";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "모션 테스트 | New Project 2",
    description: "스켈레톤 shimmer 전환 테스트 페이지입니다.",
};

export default async function TestPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="test"
            className={{ inner: "", container: "min-h-[calc(100dvh-10.8rem)] bg-[var(--adaptiveGrey50)]" }}
        >
            <TestView />
        </Main>
    );
}
