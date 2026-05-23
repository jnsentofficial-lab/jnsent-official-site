"use client";

import { AdminInquiriesPageProvider } from "@/features/admin/inquiries/model/SubscriptionContext";
import * as AdminInquiriesLayer from "@/widgets/admin/inquiries/ui";

export default function Panel() {
    return (
        <AdminInquiriesPageProvider>
            <AdminInquiriesLayer.Title />
            <AdminInquiriesLayer.Analysis />
        </AdminInquiriesPageProvider>
    );
}
