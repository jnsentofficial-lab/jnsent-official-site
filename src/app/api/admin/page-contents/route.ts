import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function GET() {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase.from("page_contents").select("*").order("slug", { ascending: true });
    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}

export async function POST(request: Request) {
    const body = await request.json();
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("page_contents")
        .upsert(
            {
                ...body,
                is_published: true,
            },
            { onConflict: "slug" },
        )
        .select("*")
        .single();
    return error ? apiError(error.message, 400) : apiOk(data);
}
