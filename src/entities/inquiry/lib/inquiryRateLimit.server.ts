import { createHash } from "node:crypto";
import { shouldSendInquiryNotification } from "@/entities/inquiry/lib/inquiryNotification.server";
import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";

const DEFAULT_MAX_DAILY_INQUIRIES_PER_PHONE = 3;
const DEFAULT_MAX_DAILY_INQUIRIES_PER_IP = 10;
const DEFAULT_DUPLICATE_WINDOW_MINUTES = 10;
const KST_OFFSET_HOURS = 9;

function readNumberEnv(name: string, fallback: number) {
    const value = Number(process.env[name] ?? "");

    return Number.isFinite(value) && value > 0 ? value : fallback;
}

function createSha256(value: string) {
    return createHash("sha256").update(value).digest("hex");
}

function getKstDayRange(now = new Date()) {
    const shifted = new Date(now.getTime() + KST_OFFSET_HOURS * 60 * 60 * 1000);
    const start = new Date(Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate()) - KST_OFFSET_HOURS * 60 * 60 * 1000);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

    return {
        startAt: start.toISOString(),
        endAt: end.toISOString(),
    };
}

function getDuplicateWindowStart(now = new Date()) {
    const minutes = readNumberEnv("INQUIRY_DUPLICATE_WINDOW_MINUTES", DEFAULT_DUPLICATE_WINDOW_MINUTES);

    return new Date(now.getTime() - minutes * 60 * 1000).toISOString();
}

export function extractClientIp(request: Request) {
    const forwardedFor = request.headers.get("x-forwarded-for");

    if (forwardedFor) {
        return forwardedFor.split(",")[0]?.trim() ?? "";
    }

    return request.headers.get("x-real-ip")?.trim() ?? request.headers.get("cf-connecting-ip")?.trim() ?? "";
}

export function buildInquiryIpHash(ip: string) {
    return ip ? createSha256(ip) : null;
}

export function buildInquiryPayloadHash(payload: Record<string, unknown>) {
    return createSha256(JSON.stringify(payload));
}

type InquiryLimitPayload = {
    category: string;
    phone: string;
    ipHash: string | null;
    payloadHash: string;
};

export async function validateInquirySubmissionLimit(payload: InquiryLimitPayload) {
    if (!shouldSendInquiryNotification(payload.category)) {
        return null;
    }

    const supabase = createSupabaseServiceClient();
    const { startAt, endAt } = getKstDayRange();
    const maxDailyPerPhone = readNumberEnv("INQUIRY_MAX_DAILY_PER_PHONE", DEFAULT_MAX_DAILY_INQUIRIES_PER_PHONE);
    const maxDailyPerIp = readNumberEnv("INQUIRY_MAX_DAILY_PER_IP", DEFAULT_MAX_DAILY_INQUIRIES_PER_IP);
    const duplicateWindowStart = getDuplicateWindowStart();

    const [phoneDailyResult, duplicateResult, ipDailyResult] = await Promise.all([
        supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("category", payload.category).eq("phone", payload.phone).gte("created_at", startAt).lt("created_at", endAt),
        supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("payload_hash", payload.payloadHash).gte("created_at", duplicateWindowStart),
        payload.ipHash
            ? supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("ip_hash", payload.ipHash).gte("created_at", startAt).lt("created_at", endAt)
            : Promise.resolve({ count: 0, error: null }),
    ]);

    const error = phoneDailyResult.error ?? duplicateResult.error ?? ipDailyResult.error;

    if (error) {
        throw new Error(error.message);
    }

    if ((duplicateResult.count ?? 0) > 0) {
        return {
            message: "같은 내용의 문의가 방금 접수되어 잠시 후 다시 시도해주세요.",
            status: 429,
        };
    }

    if ((phoneDailyResult.count ?? 0) >= maxDailyPerPhone) {
        return {
            message: `하루 문의 가능 횟수는 ${maxDailyPerPhone}건까지입니다. 내일 다시 시도해주세요.`,
            status: 429,
        };
    }

    if (payload.ipHash && (ipDailyResult.count ?? 0) >= maxDailyPerIp) {
        return {
            message: "현재 네트워크에서 오늘 문의 가능 횟수를 초과했습니다. 내일 다시 시도해주세요.",
            status: 429,
        };
    }

    return null;
}
