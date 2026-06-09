import { cookies } from "next/headers";
import { NewsListView } from "@/views/news/list/NewsListView";
import Main from "@/widgets/layout/Main";
import { buildPageMetadata } from "@/shared/lib/seo";

export const revalidate = 60;

export const metadata = buildPageMetadata({
    title: "NEWS | 제이엔에스 엔터테인먼트",
    description: "제이엔에스 엔터테인먼트의 소식과 업데이트를 확인하세요.",
    path: "/news",
});

export default async function NewsListPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="news"
            className={{ inner: "", container: "min-h-[calc(100svh-10.8rem)]" }}
        >
            <NewsListView />
        </Main>
    );
}
