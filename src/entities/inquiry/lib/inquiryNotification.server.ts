import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { getResendClient } from "@/shared/lib/resend";

const INQUIRY_EMAIL_CATEGORIES = new Set(["consulting", "equipment_rental", "studio_rental"]);

const INQUIRY_CATEGORY_LABEL_MAP: Record<string, string> = {
    consulting: "컨설팅",
    equipment_rental: "장비 렌탈",
    studio_rental: "스튜디오 대여",
};

const INQUIRY_CATEGORY_ROUTE_MAP: Record<string, string> = {
    consulting: "/consulting",
    equipment_rental: "/equipmentRental",
    studio_rental: "/studioRental",
};

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function extractText(node: unknown): string {
    if (!node || typeof node !== "object") {
        return "";
    }

    const typedNode = node as { text?: unknown; content?: unknown };

    if (typeof typedNode.text === "string") {
        return typedNode.text;
    }

    if (Array.isArray(typedNode.content)) {
        return typedNode.content.map(extractText).join("");
    }

    return "";
}

function extractMessageLines(messageBody: unknown): string[] {
    if (!messageBody || typeof messageBody !== "object") {
        return [];
    }

    const root = messageBody as { content?: unknown };

    if (!Array.isArray(root.content)) {
        return [];
    }

    return root.content
        .map((node) => extractText(node).trim())
        .filter((line) => line.length > 0);
}

function buildInfoRows(inquiry: Inquiry) {
    const categoryLabel = INQUIRY_CATEGORY_LABEL_MAP[inquiry.category ?? ""] ?? inquiry.category ?? "기타";
    const routePath = INQUIRY_CATEGORY_ROUTE_MAP[inquiry.category ?? ""] ?? inquiry.source ?? "-";

    return [
        ["문의 ID", inquiry.id],
        ["문의 유형", categoryLabel],
        ["접수 경로", routePath],
        ["이름", inquiry.name],
        ["연락처", inquiry.phone],
        ["이메일", inquiry.email],
        ["지역", inquiry.region],
        ["연락 가능한 시각", inquiry.available_time],
        ["문의 요약", inquiry.message],
        ["접수 시각", inquiry.created_at],
    ].filter((row): row is [string, string] => typeof row[1] === "string" && row[1].trim().length > 0);
}

function buildInquiryEmailHtml(inquiry: Inquiry) {
    const infoRows = buildInfoRows(inquiry);
    const messageLines = extractMessageLines(inquiry.message_body);

    return `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
            <h2 style="margin:0 0 16px">새 문의가 접수되었습니다.</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
                <tbody>
                    ${infoRows
                        .map(
                            ([label, value]) => `
                                <tr>
                                    <th style="width:160px;padding:10px;border:1px solid #ddd;background:#f7f7f7;text-align:left">${escapeHtml(label)}</th>
                                    <td style="padding:10px;border:1px solid #ddd">${escapeHtml(String(value))}</td>
                                </tr>
                            `
                        )
                        .join("")}
                </tbody>
            </table>
            <h3 style="margin:0 0 12px">문의 내용</h3>
            <ul style="margin:0;padding-left:20px">
                ${messageLines.map((line) => `<li style="margin-bottom:8px">${escapeHtml(line)}</li>`).join("")}
            </ul>
        </div>
    `;
}

export function shouldSendInquiryNotification(category: string) {
    return INQUIRY_EMAIL_CATEGORIES.has(category);
}

export async function sendInquiryNotification(inquiry: Inquiry) {
    const resend = getResendClient();
    const to = process.env.INQUIRY_NOTIFICATION_TO_EMAIL?.trim();
    const from = process.env.INQUIRY_NOTIFICATION_FROM_EMAIL?.trim();

    if (!resend || !to || !from || !shouldSendInquiryNotification(inquiry.category ?? "")) {
        return;
    }

    const categoryLabel = INQUIRY_CATEGORY_LABEL_MAP[inquiry.category ?? ""] ?? "문의";

    await resend.emails.send({
        from,
        to,
        subject: `[JNS 문의] ${categoryLabel} - ${inquiry.name}`,
        html: buildInquiryEmailHtml(inquiry),
        replyTo: inquiry.email?.trim() ? inquiry.email : undefined,
    });
}
