import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function GET() {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase.from("banners").select("*").order("sort_order", { ascending: true });
    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}

export async function POST(request: Request) {
    const body = await request.json();
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("banners")
        .insert({
            title: body.title,
            subtitle: body.subtitle,
            image_url: body.image_url,
            link_url: body.link_url,
            is_published: true,
        })
        .select("*")
        .single();
    return error ? apiError(error.message, 400) : apiOk(data, { status: 201 });
}
