"use client";

import { AdminDashboardPageProvider } from "@/features/admin/dashboard/model/SubscriptionContext";
import * as AdminDashboardLayer from "@/widgets/admin/dashboard/ui";

export default function Panel() {
    return (
        <AdminDashboardPageProvider>
            <AdminDashboardLayer.Title />
            <AdminDashboardLayer.Analysis />
        </AdminDashboardPageProvider>
    );
}
