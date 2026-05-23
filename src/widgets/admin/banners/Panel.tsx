"use client";

import { AdminBannersPageProvider } from "@/features/admin/banners/model/SubscriptionContext";
import * as AdminBannersLayer from "@/widgets/admin/banners/ui";

export default function Panel() {
    return (
        <AdminBannersPageProvider>
            <AdminBannersLayer.Title />
            <AdminBannersLayer.Analysis />
        </AdminBannersPageProvider>
    );
}
