"use client";

import { BjSupportPageProvider } from "@/features/bjSupport/model/SubscriptionContext";
import * as BjSupportLayer from "@/widgets/bjSupport/ui";

export default function Panel() {
    return (
        <BjSupportPageProvider>
            <BjSupportLayer.Title />
            <BjSupportLayer.Analysis />
        </BjSupportPageProvider>
    );
}
