"use client";

import { SalesDetailsPageProvider } from "@/features/sales/details/model/SubscriptionContext";
import * as SalesDetailsLayer from "@/widgets/sales/details/ui";

export default function Panel() {
    return (
        <SalesDetailsPageProvider>
            <SalesDetailsLayer.Title />
            <div className="grid gap-4">
                <SalesDetailsLayer.Status />
                <SalesDetailsLayer.Analysis />
            </div>
        </SalesDetailsPageProvider>
    );
}
