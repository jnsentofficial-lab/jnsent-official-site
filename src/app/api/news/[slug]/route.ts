import { createSupabaseServerClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

type RouteProps = {
    params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
    const { slug } = await params;
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from("news").select("*").eq("slug", slug).eq("is_published", true).neq("title", "NEWS 준비 중입니다").maybeSingle();

    return error ? apiError(error.message, 500) : apiOk(data);
}
