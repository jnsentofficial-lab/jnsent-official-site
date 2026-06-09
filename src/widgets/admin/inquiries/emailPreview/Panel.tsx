"use client";

import { AdminInquiriesPageProvider } from "@/features/admin/inquiries/model/SubscriptionContext";
import { EmailPreview } from "@/widgets/admin/inquiries/ui/EmailPreview";

type EmailPreviewPanelProps = {
    previewHtml: string;
};

export default function Panel({ previewHtml }: EmailPreviewPanelProps) {
    return (
        <AdminInquiriesPageProvider>
            <EmailPreview previewHtml={previewHtml} />
        </AdminInquiriesPageProvider>
    );
}
