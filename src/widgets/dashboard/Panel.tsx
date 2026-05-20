"use client";

import { DashboardPageProvider } from "@/features/dashboard/model/SubscriptionContext";
import * as DashboardLayer from "@/widgets/dashboard/ui";

export default function Panel() {
    return (
        <DashboardPageProvider>
            <DashboardLayer.Title />
            <div className="grid gap-4">
                <DashboardLayer.Status />
                <DashboardLayer.Analysis />
            </div>
        </DashboardPageProvider>
    );
}
