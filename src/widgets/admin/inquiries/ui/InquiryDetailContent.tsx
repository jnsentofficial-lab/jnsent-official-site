import type { Inquiry, InquiryComment } from "@/entities/inquiry/model/inquiry.type";
import useNavigate from "@/shared/hooks/useNavigate";
import { RichTextRenderer } from "@/shared/ui/richText/RichTextRenderer";

type InquiryQuestionSectionProps = {
    inquiry: Inquiry;
};

type InquiryAnswerSectionProps = {
    comment: InquiryComment;
};

function formatDate(value: string) {
    return new Intl.DateTimeFormat("ko-KR").format(new Date(value));
}

function buildInquiryFields(inquiry: Inquiry) {
    return [
        { label: "이름", value: inquiry.name },
        { label: "연락처", value: inquiry.phone },
        { label: "이메일", value: inquiry.email },
        { label: "성별", value: inquiry.gender },
        { label: "연령", value: inquiry.age },
        { label: "지역", value: inquiry.region },
        { label: "연락 가능한 시각", value: inquiry.available_time },
        { label: "서비스 선택", value: inquiry.support_label || inquiry.category },
        { label: "문의사항", value: inquiry.message },
    ].filter((field) => Boolean(String(field.value ?? "").trim()));
}

export function InquiryQuestionSection({ inquiry }: InquiryQuestionSectionProps) {
    const fields = buildInquiryFields(inquiry);

    return (
        <section className="flex-1 flex flex-col mobile:gap-[2.4rem] pc:gap-[5.2rem] bg-[#F3F3F3] mobile:p-[2.4rem_1.6rem] pc:p-[5.2rem]">
            <div className="flex flex-col gap-[1.6rem]">
                <h6 className="text-[var(--adaptive-black300)] text-[1.8rem]">선택한 질문</h6>

                <h2 className="mobile:text-[2.4rem] pc:text-[3.2rem] leading-[1.5]">{inquiry.message}</h2>

                <p className="text-[1.4rem] text-[var(--adaptive-black400)]">
                    {formatDate(inquiry.created_at)} ~ {formatDate(inquiry.updated_at)}
                </p>
            </div>

            <div className="flex flex-col gap-[1.6rem] mobile:text-[1.8rem] pc:text-[2.0rem] leading-[1.5] text-[var(--adaptive-black300)]">
                {fields.map((field) => (
                    <p key={field.label}>
                        <strong className="font-[700]">{field.label}</strong>: {field.value}
                    </p>
                ))}
            </div>
        </section>
    );
}

export function InquiryAnswerSection({ comment }: InquiryAnswerSectionProps) {
    return (
        <section className="flex-1 block mobile:p-[2.4rem_1.6rem] pc:p-[5.2rem]">
            <h6 className="mb-[1.6rem] text-[1.8rem] text-[var(--adaptive-black300)]">관리자 답변</h6>

            <div className="flex flex-col gap-[5.2rem]">
                <RichTextRenderer
                    className="mobile:text-[1.6rem] pc:text-[2.0rem]"
                    content={comment.message_body}
                    fallback={comment.message}
                />

                <div className="bg-[var(--adaptive-grey200)] w-full h-[0.1rem]" />

                <div className="flex flex-col items-end gap-[0.8rem]">
                    <p className="text-[1.4rem] font-[700] text-[var(--adaptive-black300)]">{comment.manager_name}</p>
                    <p className="text-[1.3rem] text-[var(--adaptive-black400)]">{formatDate(comment.created_at)}</p>
                </div>
            </div>
        </section>
    );
}
