import type { Json } from "@/shared/types/Database";

export function buildInquiryMessageBody(payload: Record<string, unknown>): Json {
    return {
        type: "doc",
        content: Object.entries(payload)
            .filter(([, value]) => value !== undefined && value !== null && String(value).trim().length > 0)
            .map(([key, value]) => ({
                type: "paragraph",
                content: [{ type: "text", text: `${key}: ${Array.isArray(value) ? value.join(", ") : String(value)}` }],
            })),
    };
}
