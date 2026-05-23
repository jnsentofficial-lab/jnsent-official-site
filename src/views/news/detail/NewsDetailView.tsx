"use client";

import { NewsDetailPanel } from "@/widgets/news/detail";

type NewsDetailViewProps = {
    slug: string;
};

export function NewsDetailView({ slug }: NewsDetailViewProps) {
    return <NewsDetailPanel slug={slug} />;
}
