import { cookies } from "next/headers";
import { HomeView } from "@/views/home/HomeView";
import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const revalidate = 60;

export const metadata = buildPageMetadata({
    title: "제이엔에스 엔터테인먼트",
    description: "콘텐츠 비즈니스를 위한 운영 파트너입니다.",
    path: "/",
});

export default async function HomePage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="home"
            className={{ inner: "", container: "min-h-[calc(100svh-10.8rem)]" }}
        >
            <HomeView />
        </Main>
    );
}
