"use client";

import { AboutPageProvider } from "@/features/about/model/SubscriptionContext";
import * as AboutLayer from "@/widgets/about/ui";

export default function Panel() {
    return (
        <AboutPageProvider>
            <AboutLayer.Title />
            <AboutLayer.Analysis />
        </AboutPageProvider>
    );
}
