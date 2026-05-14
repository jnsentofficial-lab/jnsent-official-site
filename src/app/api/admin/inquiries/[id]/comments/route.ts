import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

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
    const managerName = String(body.manager_name ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!managerName || !message) {
        return apiError("담당자 이름과 답변 내용을 입력해주세요.", 400);
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("inquiry_comments")
        .insert({
            inquiry_id: id,
            manager_name: managerName,
            message,
        })
        .select("*")
        .single();

    return error ? apiError(error.message, 400) : apiOk(data, { status: 201 });
}
