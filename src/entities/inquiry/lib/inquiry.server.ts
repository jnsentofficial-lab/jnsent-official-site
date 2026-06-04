import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import type { Inquiry, InquiryComment } from "@/entities/inquiry/model/inquiry.type";

export type PublicInquiryDetail = {
    inquiry: Inquiry;
    latestComment: InquiryComment;
};

export async function getPublicInquiryBySlug(slug: string): Promise<PublicInquiryDetail | null> {
    const supabase = createSupabaseServiceClient();
    const { data: inquiry, error: inquiryError } = await supabase.from("inquiries").select("*").eq("id", slug).eq("status", "done").maybeSingle();

    if (inquiryError) {
        throw new Error(inquiryError.message);
    }

    if (!inquiry) {
        return null;
    }

    const { data: latestComment, error: commentError } = await supabase
        .from("inquiry_comments")
        .select("*")
        .eq("inquiry_id", inquiry.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (commentError) {
        throw new Error(commentError.message);
    }

    if (!latestComment) {
        return null;
    }

    return {
        inquiry,
        latestComment,
    };
}
