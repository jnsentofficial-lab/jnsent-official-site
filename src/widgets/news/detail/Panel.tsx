"use client";

import { NewsDetailPageProvider } from "@/features/news/detail/model/SubscriptionContext";
import * as NewsDetailLayer from "@/widgets/news/detail/ui";

type PanelProps = {
    slug: string;
};

export default function Panel({ slug }: PanelProps) {
    return (
        <NewsDetailPageProvider slug={slug}>
            <NewsDetailLayer.Title />
            <NewsDetailLayer.Analysis slug={slug} />
        </NewsDetailPageProvider>
    );
}
