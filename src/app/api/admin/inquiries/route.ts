import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function GET() {
    const supabase = createSupabaseServiceClient();
    const [inquiriesResponse, commentsResponse] = await Promise.all([
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("inquiry_comments").select("inquiry_id"),
    ]);

    const error = inquiriesResponse.error ?? commentsResponse.error;

    if (error) {
        return apiError(error.message, 500);
    }

    const answeredInquiryIds = new Set((commentsResponse.data ?? []).map((comment) => comment.inquiry_id));
    const data = (inquiriesResponse.data ?? []).map((inquiry) => ({
        ...inquiry,
        hasAnswer: answeredInquiryIds.has(inquiry.id),
    }));

    return apiOk(data);
}
