import type { Metadata } from "next";
import { NewsDetailView } from "@/views/news/detail/NewsDetailView";

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
    const { slug } = await params;
    return <NewsDetailView slug={slug} />;
}
