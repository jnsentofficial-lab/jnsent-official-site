import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function POST(request: Request) {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !phone || !message) {
        return apiError("이름, 연락처, 문의 내용을 입력해주세요.", 400);
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("inquiries")
        .insert({
            name,
            phone,
            email: body.email ? String(body.email).trim() : null,
            message,
            message_body: body.message_body ?? null,
            category: String(body.category ?? "bj_support").trim() || "bj_support",
            gender: body.gender ? String(body.gender).trim() : null,
            age: body.age ? String(body.age).trim() : null,
            region: body.region ? String(body.region).trim() : null,
            available_time: body.available_time ? String(body.available_time).trim() : null,
            support_label: body.support_label ? String(body.support_label).trim() : null,
            source: String(body.source ?? "bj_support").trim() || "bj_support",
            status: "new",
        })
        .select("*")
        .single();

    return error ? apiError(error.message, 400) : apiOk(data, { status: 201 });
}
