import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { buildAvailableTime, buildRegion, formatPhoneNumber, sanitizeAgeInput, sanitizeNameInput } from "@/entities/inquiry/lib/formFields";
import { apiError, apiOk } from "@/shared/lib/api/server";

export async function POST(request: Request) {
    const body = await request.json();
    const name = sanitizeNameInput(String(body.name ?? "")).trim();
    const phone = formatPhoneNumber(String(body.phone ?? "").trim());
    const message = String(body.message ?? "").trim();
    const age = body.age ? sanitizeAgeInput(String(body.age).trim()) : null;
    const region = body.region ? String(body.region).trim() : buildRegion(String(body.province ?? "").trim(), String(body.city ?? "").trim(), String(body.town ?? "").trim());
    const availableTime = body.available_time
        ? String(body.available_time).trim()
        : buildAvailableTime(String(body.available_period ?? "").trim(), String(body.available_hour ?? "").trim());

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
            age,
            region: region || null,
            available_time: availableTime || null,
            support_label: body.support_label ? String(body.support_label).trim() : null,
            source: String(body.source ?? "bj_support").trim() || "bj_support",
            status: "new",
        })
        .select("*")
        .single();

    return error ? apiError(error.message, 400) : apiOk(data, { status: 201 });
}
