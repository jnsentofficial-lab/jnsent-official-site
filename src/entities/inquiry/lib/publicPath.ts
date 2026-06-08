export function buildPublicInquiryPath(slug: string) {
    return `/qna/${slug}`;
}

export function buildAdminInquiryPath(inquiryId?: string) {
    if (!inquiryId) {
        return "/admin/inquiries";
    }

    return `/admin/inquiries?inquiryId=${encodeURIComponent(inquiryId)}`;
}
