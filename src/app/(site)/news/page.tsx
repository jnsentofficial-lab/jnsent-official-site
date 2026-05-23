import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NewsListView } from "@/views/news/list/NewsListView";
import Main from "@/widgets/layout/Main";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "NEWS | New Project 2",
    description: "New Project 2의 소식과 업데이트를 확인하세요.",
};

export default async function NewsListPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="news"
            className={{ inner: "", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <NewsListView />
        </Main>
    );
}
