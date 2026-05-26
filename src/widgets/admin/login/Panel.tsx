"use client";

import { AdminLoginPageProvider } from "@/features/admin/login/model/SubscriptionContext";
import * as AdminLoginLayer from "@/widgets/admin/login/ui";

export default function Panel() {
    return (
        <AdminLoginPageProvider>
            {/* <AdminLoginLayer.Title /> */}
            <AdminLoginLayer.Analysis />
        </AdminLoginPageProvider>
    );
}
