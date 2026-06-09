import { AdminInquiryEmailPreviewPanel } from "@/widgets/admin/inquiries/emailPreview";

type AdminInquiryEmailPreviewViewProps = {
    previewHtml: string;
};

export function AdminInquiryEmailPreviewView({ previewHtml }: AdminInquiryEmailPreviewViewProps) {
    return <AdminInquiryEmailPreviewPanel previewHtml={previewHtml} />;
}
