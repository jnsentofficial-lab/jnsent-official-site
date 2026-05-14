import { createSupabaseServerClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function POST(request: Request) {
    const body = await request.json();
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from("inquiries")
        .insert({
            name: String(body.name ?? "").trim(),
            phone: String(body.phone ?? "").trim(),
            message: String(body.message ?? "").trim(),
            category: "bj_support",
            status: "new",
        })
        .select("*")
        .single();

    return error ? apiError(error.message, 400) : apiOk(data, { status: 201 });
}
