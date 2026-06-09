"use client";

import * as NewsDetailLayer from "@/widgets/news/detail/ui";

type PanelProps = {
    slug: string;
};

export default function Panel({ slug }: PanelProps) {
    return <NewsDetailLayer.NewsArticle slug={slug} />;
}
