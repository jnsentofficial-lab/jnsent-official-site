"use client";

import { ConsultingPageProvider } from "@/features/consulting/model/SubscriptionContext";
import * as ConsultingLayer from "@/widgets/consulting/ui";

export default function Panel() {
    return (
        <ConsultingPageProvider>
            <ConsultingLayer.Title />
            <ConsultingLayer.Analysis />
        </ConsultingPageProvider>
    );
}
