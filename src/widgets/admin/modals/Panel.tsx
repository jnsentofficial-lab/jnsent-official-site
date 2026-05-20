"use client";

import { AdminModalsPageProvider } from "@/features/admin/modals/model/SubscriptionContext";
import * as AdminModalsLayer from "@/widgets/admin/modals/ui";

export default function Panel() {
    return (
        <AdminModalsPageProvider>
            <AdminModalsLayer.Title />
            <AdminModalsLayer.Analysis />
        </AdminModalsPageProvider>
    );
}
