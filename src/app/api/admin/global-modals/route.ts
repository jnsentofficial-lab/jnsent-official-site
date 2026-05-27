import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { getAdminApiName, hasAdminApiSession } from "@/shared/lib/adminApi";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function GET() {
    if (!(await hasAdminApiSession())) {
        return apiError("관리자 권한이 필요합니다.", 403);
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase.from("global_modals").select("*").order("row", { ascending: true }).order("col", { ascending: true }).order("stack_order", { ascending: true });
    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}

export async function POST(request: Request) {
    if (!(await hasAdminApiSession())) {
        return apiError("관리자 권한이 필요합니다.", 403);
    }

    const body = await request.json();
    const adminName = (await getAdminApiName()) ?? "관리자";
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("global_modals")
        .insert({
            ...body,
            creator_name: adminName,
        })
        .select("*")
        .single();
    return error ? apiError(error.message, 400) : apiOk(data, { status: 201 });
}
