import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { buildAvailableTime, buildRegion, formatPhoneNumber, requiresInquiryEmail, sanitizeAgeInput, sanitizeNameInput } from "@/entities/inquiry/lib/formFields";
import { sendInquiryNotification } from "@/entities/inquiry/lib/inquiryNotification.server";
import { buildInquiryIpHash, buildInquiryPayloadHash, extractClientIp, validateInquirySubmissionLimit } from "@/entities/inquiry/lib/inquiryRateLimit.server";
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
    const category = String(body.category ?? "bj_support").trim() || "bj_support";
    const source = String(body.source ?? "bj_support").trim() || "bj_support";
    const email = body.email ? String(body.email).trim() : null;
    const supportLabel = body.support_label ? String(body.support_label).trim() : null;
    const gender = body.gender ? String(body.gender).trim() : null;
    const ipHash = buildInquiryIpHash(extractClientIp(request));
    const payloadHash = buildInquiryPayloadHash({
        name,
        phone,
        email: email ?? "",
        category,
        gender: gender ?? "",
        age: age ?? "",
        region: region || "",
        availableTime: availableTime || "",
        supportLabel: supportLabel ?? "",
        source,
        message,
        messageBody: body.message_body ?? null,
    });

    if (!name || !phone || !message) {
        return apiError("이름, 연락처, 문의 내용을 입력해주세요.", 400);
    }

    if (requiresInquiryEmail(category) && !email) {
        return apiError("이메일을 입력해주세요.", 400);
    }

    const limitError = await validateInquirySubmissionLimit({
        category,
        phone,
        ipHash,
        payloadHash,
    });

    if (limitError) {
        return apiError(limitError.message, limitError.status);
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
        .from("inquiries")
        .insert({
            name,
            phone,
            email,
            message,
            message_body: body.message_body ?? null,
            category,
            gender,
            age,
            region: region || null,
            available_time: availableTime || null,
            support_label: supportLabel,
            source,
            ip_hash: ipHash,
            payload_hash: payloadHash,
            status: "new",
        })
        .select("*")
        .single();

    if (error) {
        return apiError(error.message, 400);
    }

    try {
        await sendInquiryNotification(data);
    } catch (mailError) {
        console.error("Failed to send inquiry notification", mailError);
    }

    return apiOk(data, { status: 201 });
}
