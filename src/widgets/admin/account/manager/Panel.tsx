"use client";

import { AdminAccountManagerPageProvider } from "@/features/admin/account/manager/model/SubscriptionContext";
import * as AdminAccountManagerLayer from "@/widgets/admin/account/manager/ui";

export default function Panel() {
    return (
        <AdminAccountManagerPageProvider>
            {/* <AdminAccountManagerLayer.Title /> */}
            <AdminAccountManagerLayer.Analysis />
        </AdminAccountManagerPageProvider>
    );
}
