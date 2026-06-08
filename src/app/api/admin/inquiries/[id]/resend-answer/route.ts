import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { sendInquiryAnswerNotification, shouldSendInquiryNotification } from "@/entities/inquiry/lib/inquiryNotification.server";
import { apiError, apiOk } from "@/shared/lib/api/server";
import { hasAdminApiSession } from "@/shared/lib/adminApi";

type RouteProps = { params: Promise<{ id: string }> };

export async function POST(_request: Request, { params }: RouteProps) {
    const { id } = await params;
    const hasSession = await hasAdminApiSession();

    if (!hasSession) {
        return apiError("로그인 정보를 확인해주세요.", 401);
    }

    const supabase = createSupabaseServiceClient();
    const { data: inquiry, error: inquiryError } = await supabase.from("inquiries").select("*").eq("id", id).maybeSingle();

    if (inquiryError) {
        return apiError(inquiryError.message, 400);
    }

    if (!inquiry) {
        return apiError("문의를 찾을 수 없습니다.", 404);
    }

    if (!shouldSendInquiryNotification(inquiry.category ?? "")) {
        return apiError("현재 문의 유형은 답변 메일 재발송 대상이 아닙니다.", 400);
    }

    if (!inquiry.email?.trim()) {
        return apiError("문의자 이메일이 없어 재발송할 수 없습니다.", 400);
    }

    const { data: latestComment, error: commentError } = await supabase
        .from("inquiry_comments")
        .select("*")
        .eq("inquiry_id", id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (commentError) {
        return apiError(commentError.message, 400);
    }

    if (!latestComment) {
        return apiError("재발송할 답변이 없습니다.", 400);
    }

    try {
        await sendInquiryAnswerNotification(inquiry, latestComment);
    } catch (mailError) {
        console.error("Failed to resend inquiry answer notification", mailError);
        return apiError(mailError instanceof Error ? mailError.message : "답변 메일 재발송에 실패했습니다.", 500);
    }

    return apiOk({ sent: true });
}
