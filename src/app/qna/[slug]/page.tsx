import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicInquiryBySlug } from "@/entities/inquiry/lib/inquiry.server";
import { InquiryAnswerSection, InquiryQuestionSection } from "@/widgets/admin/inquiries/ui/InquiryDetailContent";

type QnaDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: QnaDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const detail = await getPublicInquiryBySlug(slug);

    if (!detail) {
        return {
            title: "문의 답변",
        };
    }

    return {
        title: `${detail.inquiry.message} | 문의 답변`,
        description: detail.latestComment.message,
    };
}

export default async function QnaDetailPage({ params }: QnaDetailPageProps) {
    const { slug } = await params;
    const detail = await getPublicInquiryBySlug(slug);

    if (!detail) {
        notFound();
    }

    return (
        <article className="min-h-[100dvh] bg-[#F9F9F9]">
            <aside className="relative mx-auto min-h-[100dvh] max-w-[86rem] bg-white">
                {/* <div className="absolute mobile:top-[1.6rem] mobile:right-[1.6rem] pc:top-[4.2rem] pc:right-[4.2rem] z-10 px-[1.4rem] rounded-full bg-[var(--adaptive-black100)]">
                    <Link
                        aria-label="닫기"
                        className="block text-[3.2rem] text-[var(--adaptive-black300)] font-[300]"
                        href="/"
                    >
                        ×
                    </Link>
                </div> */}

                <div className="grid min-h-[100dvh] grid-rows-[auto_auto]">
                    <InquiryQuestionSection inquiry={detail.inquiry} />
                    <InquiryAnswerSection comment={detail.latestComment} />
                </div>
            </aside>
        </article>
    );
}
