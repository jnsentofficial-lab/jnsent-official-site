import type { Inquiry, InquiryComment } from "@/entities/inquiry/model/inquiry.type";
import { buildAdminInquiryPath, buildPublicInquiryPath } from "@/entities/inquiry/lib/publicPath";
import { getResendClient } from "@/shared/lib/resend";
import { getSiteUrl } from "@/shared/lib/siteUrl";

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

const INQUIRY_MESSAGE_HIDDEN_LABELS = new Set(["이름", "연락처", "지역", "연락 가능한 시각", "이메일"]);

function escapeHtml(value: string) {
    return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function buildAbsoluteUrl(path: string) {
    return `${getSiteUrl()}${path}`;
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

    return root.content.map((node) => extractText(node).trim()).filter((line) => line.length > 0);
}

function buildMessageItems(messageLines: string[]) {
    return messageLines.map((line) => {
        const separatorIndex = line.indexOf(":");

        if (separatorIndex === -1) {
            return { label: "", value: line };
        }

        const label = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim();

        if (!label || !value) {
            return { label: "", value: line };
        }

        return { label, value };
    });
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
        ["접수 시각", inquiry.created_at],
    ].filter((row): row is [string, string] => typeof row[1] === "string" && row[1].trim().length > 0);
}

function buildInquiryEmailShell({
    accentTitle,
    title,
    description,
    leadText,
    body,
    buttonLabel,
    buttonHref,
    footerText,
}: {
    accentTitle: string;
    title: string;
    description: string;
    leadText: string;
    body: string;
    buttonLabel: string;
    buttonHref: string;
    footerText: string;
}) {
    return `
        <div style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;color:#222">
            <div style="max-width:760px;margin:0 auto;background:#ffffff">
                <div style="padding:30px 42px 0;font-size:15px;font-weight:800;letter-spacing:0.2px;color:#111111">
                    JNS ENTERTAINMENT
                </div>
                <div style="padding:56px 42px 80px">
                    <div style="font-size:18px;line-height:1.7;color:#222222">
                        <div style="font-size:28px;font-weight:800;line-height:1;color:#222222;margin:0 0 8px">
                            <span style="color:#ff2253;margin:0">${escapeHtml(accentTitle)}</span> ${escapeHtml(title)}
                        </div>
                        <div style="font-size:28px;font-weight:800;line-height:1;margin:0 0 2px">
                            <span style="color:#222222;margin:0">${escapeHtml(description)}</span>
                        </div>
                    </div>
                </div>
                <div style="padding:0 42px 56px">
                    <div style="border-top:3px solid #2f343b;padding-top:20px">
                        <p style="margin:0 0 18px;font-size:15px;line-height:1.9;color:#4b4f56">
                            ${escapeHtml(leadText)}
                        </p>
                        <p style="margin:0 0 34px;font-size:15px;line-height:1.9;color:#4b4f56">
                            ${escapeHtml(footerText)}
                        </p>
                    </div>
                    ${body}
                    <div style="padding:54px 0 0;text-align:center">
                        <a href="${escapeHtml(buttonHref)}" style="display:inline-block;min-width:170px;padding:16px 28px;border-radius:16px;background:#000000;color:#ffffff;font-size:18px;font-weight:500;line-height:1;text-decoration:none">
                            ${escapeHtml(buttonLabel)}
                        </a>
                    </div>
                </div>
            </div>
            <div style="max-width:760px;margin:0 auto;padding:28px 42px 36px;font-size:12px;line-height:1.9;color:#9aa0a6">
                <div style="margin:0 0 4px">본 메일은 발신전용입니다. 문의 관련 추가 확인이 필요하시면 관리자 페이지에서 확인해주세요.</div>
                <div style="margin:0 0 4px">JNS ENTERTAINMENT | ${escapeHtml(process.env.INQUIRY_NOTIFICATION_TO_EMAIL?.trim() || "contact@jns-entertainment.com")}</div>
                <div style="margin:0">Copyright © JNS ENTERTAINMENT. All Rights Reserved.</div>
            </div>
        </div>
    `;
}

export function buildInquiryEmailHtml(inquiry: Inquiry) {
    const infoRows = buildInfoRows(inquiry);
    const messageItems = buildMessageItems(extractMessageLines(inquiry.message_body)).filter(({ label, value }) => value.trim().length > 0 && !INQUIRY_MESSAGE_HIDDEN_LABELS.has(label));
    const categoryLabel = INQUIRY_CATEGORY_LABEL_MAP[inquiry.category ?? ""] ?? inquiry.category ?? "문의";

    return buildInquiryEmailShell({
        accentTitle: categoryLabel,
        title: "문의가 접수되었습니다.",
        description: "내용을 확인해주세요",
        leadText: "제이엔에스 엔터테인먼트 웹사이트를 통해 새로운 문의가 접수되었습니다. 아래 내용을 확인하신 뒤 필요한 후속 응대를 진행해주세요.",
        footerText: "접수 정보와 상세 문의 내용은 메일 하단에 정리되어 있으며, 문의자 정보와 요청 항목이 잘 구분되도록 구성했습니다.",
        body: `
            <div style="margin:0 0 18px;font-size:20px;font-weight:800;line-height:1.4;color:#222222">유저 정보</div>
            <table style="width:100%;border-collapse:collapse;border-top:1px solid #eceef2;border-bottom:1px solid #eceef2;margin:0 0 36px">
                <tbody>
                    ${infoRows
                        .map(
                            ([label, value]) => `
                                <tr>
                                    <th style="width:165px;padding:14px 10px;text-align:left;vertical-align:top;border-bottom:1px solid #eceef2;font-size:14px;font-weight:700;line-height:1.7;color:#222222;background:#ffffff">
                                        ${escapeHtml(label)}
                                    </th>
                                    <td style="padding:14px 0;border-bottom:1px solid #eceef2;font-size:14px;line-height:1.8;color:#4b4f56;word-break:break-word">
                                        ${escapeHtml(String(value))}
                                    </td>
                                </tr>
                            `,
                        )
                        .join("")}
                </tbody>
            </table>
            <div style="margin:0 0 18px;font-size:20px;font-weight:800;line-height:1.4;color:#222222">문의 내용</div>
            <table style="width:100%;border-collapse:collapse;border-top:1px solid #eceef2;border-bottom:1px solid #eceef2">
                <tbody>
                    ${messageItems
                        .map(
                            ({ label, value }) => `
                                <tr>
                                    <td style="padding:16px 12px 18px;border-bottom:1px solid #eceef2">
                                        ${
                                            label
                                                ? `
                                                    <div style="margin:0 0 10px;font-size:13px;font-weight:700;line-height:1.6;color:#222222">
                                                        ${escapeHtml(label)}
                                                    </div>
                                                `
                                                : ""
                                        }
                                        <div style="font-size:14px;line-height:1.9;color:#4b4f56;word-break:break-word">
                                            ${escapeHtml(value)}
                                        </div>
                                    </td>
                                </tr>
                            `,
                        )
                        .join("")}
                </tbody>
            </table>
        `,
        buttonLabel: "문의 확인하기",
        buttonHref: buildAbsoluteUrl(buildAdminInquiryPath(inquiry.id)),
    });
}

export function buildInquiryAnswerEmailHtml(inquiry: Inquiry) {
    const categoryLabel = INQUIRY_CATEGORY_LABEL_MAP[inquiry.category ?? ""] ?? inquiry.category ?? "문의";

    return buildInquiryEmailShell({
        accentTitle: categoryLabel,
        title: "문의에 답변이 등록되었습니다.",
        description: "답변 내용을 확인해주세요",
        leadText: "제이엔에스 엔터테인먼트 웹사이트를 통해 남겨주신 문의에 답변이 등록되었습니다. 아래 버튼을 눌러 답변 내용을 바로 확인하실 수 있습니다.",
        footerText: "접수 정보와 상세 문의 내용은 메일 하단에 정리되어 있으며, 문의자 정보와 요청 항목이 잘 구분되도록 구성했습니다.",
        body: "",
        buttonLabel: "답변 내용 확인하기",
        buttonHref: buildAbsoluteUrl(buildPublicInquiryPath(inquiry.id)),
    });
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

export async function sendInquiryAnswerNotification(inquiry: Inquiry, _comment: InquiryComment) {
    const resend = getResendClient();
    const to = inquiry.email?.trim();
    const from = process.env.INQUIRY_NOTIFICATION_FROM_EMAIL?.trim();

    if (!resend || !to || !from || !shouldSendInquiryNotification(inquiry.category ?? "")) {
        return;
    }

    const categoryLabel = INQUIRY_CATEGORY_LABEL_MAP[inquiry.category ?? ""] ?? "문의";

    await resend.emails.send({
        from,
        to,
        subject: `[JNS 답변] ${categoryLabel} - ${inquiry.name}`,
        html: buildInquiryAnswerEmailHtml(inquiry),
    });
}
