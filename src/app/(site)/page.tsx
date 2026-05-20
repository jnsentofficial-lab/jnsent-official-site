import type { Metadata } from "next";
import { cookies } from "next/headers";
import { HomeView } from "@/views/home/HomeView";
import Main from "@/widgets/layout/Main";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "New Project 2",
    description: "콘텐츠 비즈니스를 위한 운영 파트너입니다.",
};

export default async function HomePage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="home"
            className={{ inner: "", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <HomeView />
        </Main>
    );
}
