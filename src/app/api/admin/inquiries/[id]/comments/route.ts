import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";
import { getAdminApiName, hasAdminApiSession } from "@/shared/lib/adminApi";

type RouteProps = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteProps) {
    const { id } = await params;
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("inquiry_comments")
        .select("*")
        .eq("inquiry_id", id)
        .order("created_at", { ascending: false });

    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}

export async function POST(request: Request, { params }: RouteProps) {
    const { id } = await params;
    const body = await request.json();
    const message = String(body.message ?? "").trim();
    const hasSession = await hasAdminApiSession();
    const managerName = (await getAdminApiName())?.trim() ?? "";

    if (!hasSession || !managerName) {
        return apiError("로그인 정보를 확인해주세요.", 401);
    }

    if (!message) {
        return apiError("답변 내용을 입력해주세요.", 400);
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("inquiry_comments")
        .insert({
            inquiry_id: id,
            manager_name: managerName,
            message,
            message_body: body.message_body ?? null,
        })
        .select("*")
        .single();

    if (error) {
        return apiError(error.message, 400);
    }

    const { error: inquiryError } = await supabase
        .from("inquiries")
        .update({ status: "done" })
        .eq("id", id);

    return inquiryError ? apiError(inquiryError.message, 400) : apiOk(data, { status: 201 });
}

export async function PATCH(request: Request, { params }: RouteProps) {
    const { id: inquiryId } = await params;
    const body = await request.json();
    const commentId = String(body.id ?? "").trim();
    const message = String(body.message ?? "").trim();
    const hasSession = await hasAdminApiSession();
    const managerName = (await getAdminApiName())?.trim() ?? "";

    if (!hasSession || !managerName) {
        return apiError("로그인 정보를 확인해주세요.", 401);
    }

    if (!commentId || !message) {
        return apiError("수정할 답변과 내용을 입력해주세요.", 400);
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("inquiry_comments")
        .update({
            manager_name: managerName,
            message,
            message_body: body.message_body ?? null,
        })
        .eq("id", commentId)
        .eq("inquiry_id", inquiryId)
        .select("*")
        .single();

    return error ? apiError(error.message, 400) : apiOk(data);
}
