"use client";

import { SetupGuidePageProvider } from "@/features/setupGuide/model/SubscriptionContext";
import * as SetupGuideLayer from "@/widgets/setupGuide/ui";

export default function Panel() {
    return (
        <SetupGuidePageProvider>
            <SetupGuideLayer.Title />
            <SetupGuideLayer.Analysis />
        </SetupGuidePageProvider>
    );
}
