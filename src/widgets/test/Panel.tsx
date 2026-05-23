"use client";

import { TestPageProvider } from "@/features/test/model/SubscriptionContext";
import * as TestLayer from "@/widgets/test/ui";

export default function Panel() {
    return (
        <TestPageProvider>
            <TestLayer.Intro />
            <TestLayer.ShimmerPreview />
            <TestLayer.RevealPreview />
        </TestPageProvider>
    );
}
