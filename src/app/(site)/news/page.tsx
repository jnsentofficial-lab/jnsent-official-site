import type { Metadata } from "next";
import { NewsListView } from "@/views/news/list/NewsListView";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "NEWS | New Project 2",
    description: "New Project 2의 소식과 업데이트를 확인하세요.",
};

export default function NewsListPage() {
    return <NewsListView />;
}
