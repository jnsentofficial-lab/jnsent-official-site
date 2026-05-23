import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NewsDetailView } from "@/views/news/detail/NewsDetailView";
import Main from "@/widgets/layout/Main";

export const revalidate = 60;

type NewsDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export const metadata: Metadata = {
    title: "NEWS 상세 | New Project 2",
    description: "New Project 2의 NEWS 상세 페이지입니다.",
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const cookieStore = await cookies();
    void cookieStore;
    const { slug } = await params;

    return (
        <Main
            id="news-detail"
            className={{ inner: "", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <NewsDetailView slug={slug} />
        </Main>
    );
}
