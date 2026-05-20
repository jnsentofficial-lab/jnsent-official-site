"use client";

import { HomePageProvider } from "@/features/home/model/SubscriptionContext";
import * as HomeLayer from "@/widgets/home/ui";

export default function Panel() {
    return (
        <HomePageProvider>
            <HomeLayer.Title />
            <HomeLayer.Analysis />
        </HomePageProvider>
    );
}
