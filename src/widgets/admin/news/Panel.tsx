"use client";

import { AdminNewsPageProvider } from "@/features/admin/news/model/SubscriptionContext";
import * as AdminNewsLayer from "@/widgets/admin/news/ui";

export default function Panel() {
    return (
        <AdminNewsPageProvider>
            {/* <AdminNewsLayer.Title /> */}
            <AdminNewsLayer.Analysis />
        </AdminNewsPageProvider>
    );
}
