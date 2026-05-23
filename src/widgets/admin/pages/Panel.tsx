"use client";

import { AdminPagesPageProvider } from "@/features/admin/pages/model/SubscriptionContext";
import * as AdminPagesLayer from "@/widgets/admin/pages/ui";

export default function Panel() {
    return (
        <AdminPagesPageProvider>
            <AdminPagesLayer.Title />
            <AdminPagesLayer.Analysis />
        </AdminPagesPageProvider>
    );
}
