import { createSupabaseServerClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

type RouteProps = {
    params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
    const { slug } = await params;
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from("news").select("*").eq("slug", slug).eq("is_published", true).neq("title", "NEWS 준비 중입니다").maybeSingle();

    if (error) {
        return apiError(error.message, 500);
    }

    return data ? apiOk(data) : apiError("뉴스를 찾을 수 없습니다.", 404);
}
