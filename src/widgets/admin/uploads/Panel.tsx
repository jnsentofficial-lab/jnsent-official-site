"use client";

import { AdminUploadsPageProvider } from "@/features/admin/uploads/model/SubscriptionContext";
import * as AdminUploadsLayer from "@/widgets/admin/uploads/ui";

export default function Panel() {
    return (
        <AdminUploadsPageProvider>
            <AdminUploadsLayer.Title />
            <AdminUploadsLayer.Action />
        </AdminUploadsPageProvider>
    );
}
