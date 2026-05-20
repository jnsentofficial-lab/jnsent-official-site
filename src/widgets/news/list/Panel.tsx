"use client";

import { NewsListPageProvider } from "@/features/news/list/model/SubscriptionContext";
import * as NewsListLayer from "@/widgets/news/list/ui";

export default function Panel() {
    return (
        <NewsListPageProvider>
            <NewsListLayer.Title />
            <NewsListLayer.Analysis />
        </NewsListPageProvider>
    );
}
