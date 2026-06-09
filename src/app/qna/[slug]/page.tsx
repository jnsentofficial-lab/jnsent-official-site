import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicInquiryBySlug } from "@/entities/inquiry/lib/inquiry.server";
import { InquiryAnswerSection, InquiryQuestionSection } from "@/widgets/admin/inquiries/ui/InquiryDetailContent";
import { buildNoIndexMetadata } from "@/shared/lib/seo";

type QnaDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: QnaDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const detail = await getPublicInquiryBySlug(slug);

    if (!detail) {
        return buildNoIndexMetadata("문의 답변");
    }

    return buildNoIndexMetadata("문의 답변 확인", "문의하신 내용에 대한 답변을 확인할 수 있습니다.");
}

export default async function QnaDetailPage({ params }: QnaDetailPageProps) {
    const { slug } = await params;
    const detail = await getPublicInquiryBySlug(slug);

    if (!detail) {
        notFound();
    }

    return (
        <main className="min-h-[100dvh] bg-[#F9F9F9]">
            <article className="relative mx-auto min-h-[100dvh] max-w-[86rem] bg-white">
                <div className="grid min-h-[100dvh] grid-rows-[auto_auto]">
                    <InquiryQuestionSection inquiry={detail.inquiry} />
                    <InquiryAnswerSection comment={detail.latestComment} />
                </div>
            </article>
        </main>
    );
}
