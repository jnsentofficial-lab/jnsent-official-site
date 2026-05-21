import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function POST(request: Request) {
    const body = await request.json();
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("inquiries")
        .insert({
            name: String(body.name ?? "").trim(),
            phone: String(body.phone ?? "").trim(),
            email: body.email ? String(body.email).trim() : null,
            message: String(body.message ?? "").trim(),
            message_body: body.message_body ?? null,
            category: String(body.category ?? "bj_support").trim() || "bj_support",
            status: "new",
        })
        .select("*")
        .single();

    return error ? apiError(error.message, 400) : apiOk(data, { status: 201 });
}
