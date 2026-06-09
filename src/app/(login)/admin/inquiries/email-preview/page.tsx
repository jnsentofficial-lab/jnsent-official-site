import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { buildInquiryMessageBody } from "@/entities/inquiry/lib/buildMessageBody";
import { buildInquiryEmailHtml } from "@/entities/inquiry/lib/inquiryNotification.server";
import { AdminInquiryEmailPreviewView } from "@/views/admin/inquiries/AdminInquiryEmailPreviewView";
import Main from "@/widgets/layout/Main";
import { buildNoIndexMetadata } from "@/shared/lib/seo";

export const metadata = buildNoIndexMetadata("문의 메일 미리보기");

const sampleInquiry: Inquiry = {
    id: "preview-inquiry-id",
    name: "김민아",
    phone: "010-0000-0000",
    email: "preview@jnsentertainment.com",
    category: "equipment_rental",
    gender: null,
    age: null,
    region: "서울특별시 강남구 청담타워 9층 101호",
    available_time: "오전 2시",
    support_label: null,
    source: "home_modal",
    ip_hash: null,
    payload_hash: null,
    status: "new",
    message: "테스트로 입력한 문의 입니다. 이메일 발송 테스트용 문의 입니다.",
    message_body: buildInquiryMessageBody({
        이름: "김민아",
        연락처: "010-0000-0000",
        지역: "서울특별시 강남구 청담타워 9층 101호",
        "연락 가능한 시각": "오전 2시",
        CPU: "인텔 코어 울트라 시리즈2-270K",
        GPU: "GEFORCE RTX 5060",
        카메라: "캐논 EOS RP",
        렌즈: "RF 24mm F1.8",
        조명: "룩스패드22",
        문의사항: "테스트로 입력한 문의 입니다. 이메일 발송 테스트용 문의 입니다.",
    }),
    created_at: "2026-06-04T08:08:52.32469+00:00",
    updated_at: "2026-06-04T08:08:52.32469+00:00",
};

export default function AdminInquiryEmailPreviewPage() {
    const previewHtml = buildInquiryEmailHtml(sampleInquiry);

    return (
        <Main
            id="admin-inquiry-email-preview"
            className={{ container: "min-h-[calc(100dvh-10.8rem)] bg-[#f4f4f5]" }}
        >
            <AdminInquiryEmailPreviewView previewHtml={previewHtml} />
        </Main>
    );
}
