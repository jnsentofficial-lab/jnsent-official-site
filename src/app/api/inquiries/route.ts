import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import type { Json } from "@/shared/types/Database";
import { buildAvailableTime, buildRegion, formatPhoneNumber, sanitizeAgeInput, sanitizeNameInput } from "@/entities/inquiry/lib/formFields";
import { sendInquiryNotification } from "@/entities/inquiry/lib/inquiryNotification.server";
import { buildInquiryIpHash, buildInquiryPayloadHash, extractClientIp, validateInquirySubmissionLimit } from "@/entities/inquiry/lib/inquiryRateLimit.server";
import { apiError, apiOk } from "@/shared/lib/api/server";
import { parseJsonBody } from "@/shared/lib/validation/parseRequest";
import { createInquirySchema } from "@/shared/lib/validation/schemas/inquiry";

export async function POST(request: Request) {
    const parsed = await parseJsonBody(request, createInquirySchema);

    if (!parsed.success) {
        return parsed.response;
    }

    const body = parsed.data;
    const name = sanitizeNameInput(body.name).trim();
    const phone = formatPhoneNumber(body.phone.trim());
    const message = body.message.trim();
    const age = body.age ? sanitizeAgeInput(body.age.trim()) : null;
    const region = body.region
        ? body.region.trim()
        : buildRegion(String(body.province ?? "").trim(), String(body.city ?? "").trim(), String(body.town ?? "").trim());
    const availableTime = body.available_time
        ? body.available_time.trim()
        : buildAvailableTime(String(body.available_period ?? "").trim(), String(body.available_hour ?? "").trim());
    const category = body.category.trim() || "bj_support";
    const source = body.source.trim() || "bj_support";
    const email = body.email ? body.email.trim() : null;
    const supportLabel = body.support_label ? body.support_label.trim() : null;
    const gender = body.gender ? body.gender.trim() : null;
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
            message_body: (body.message_body ?? null) as Json | null,
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
