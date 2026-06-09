"use client";

import { EmailPreview } from "@/widgets/admin/inquiries/ui/EmailPreview";

type EmailPreviewPanelProps = {
    previewHtml: string;
};

export default function Panel({ previewHtml }: EmailPreviewPanelProps) {
    return <EmailPreview previewHtml={previewHtml} />;
}
