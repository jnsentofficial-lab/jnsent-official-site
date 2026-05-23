import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AboutView } from "@/views/about/AboutView";
import Main from "@/widgets/layout/Main";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "회사소개 | New Project 2",
    description: "New Project 2의 운영 방향과 핵심 가치를 안내합니다.",
};

export default async function AboutPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="about"
            className={{ inner: "", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <AboutView />
        </Main>
    );
}
