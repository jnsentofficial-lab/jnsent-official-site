"use client";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";
import { InquiryForm } from "@/features/submitInquiry/InquiryForm";
import { hasRichTextContent } from "@/shared/lib/richText/richText";
import Skeleton from "@/shared/ui/kit/Skeleton";
import { RichTextRenderer } from "@/shared/ui/richText/RichTextRenderer";

const supportItems = [
    {
        title: "방송 시작 상담",
        description: "초기 장비, 프로그램, 공간 준비 범위를 함께 정리합니다.",
    },
    {
        title: "운영 개선 상담",
        description: "현재 방송 환경의 문제와 개선 우선순위를 점검합니다.",
    },
    {
        title: "성장 지원",
        description: "콘텐츠 운영 방향과 제작 루틴을 사업 관점에서 설계합니다.",
    },
];

export function Analysis() {
    const { data: content, isLoading } = usePublishedPageContentQuery("bjSupport");

    return (
        <>
            <Skeleton.Section
                target={!isLoading}
                className={{ element: "border-b border-slate-200 bg-slate-50 py-24 max-[86rem]:py-18" }}
            >
                <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                    <p className="mb-3 text-[1.3rem] font-bold text-teal-700">BJ Support</p>
                    <h1 className="m-0 max-w-[82rem] text-5xl leading-[1.14] max-[86rem]:text-4xl">{content?.title ?? "BJ 지원 및 상담 콘텐츠가 준비되지 않았습니다"}</h1>
                    <span className="mt-6 block max-w-[72rem] text-lg leading-[1.7] text-slate-600">{content?.description ?? "관리자에서 공개 콘텐츠를 입력하면 이 영역에 반영됩니다."}</span>
                </div>
            </Skeleton.Section>

            {hasRichTextContent(content?.body) ? (
                <section className="border-b border-slate-100 py-12">
                    <div className="mx-auto w-[min(92rem,calc(100%_-_3.2rem))]">
                        <RichTextRenderer content={content?.body} />
                    </div>
                </section>
            ) : null}

            <section className="py-[8.4rem]">
                <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                    <div className="grid grid-cols-3 gap-4 max-[86rem]:grid-cols-1 min-[86.1rem]:max-[108rem]:grid-cols-2">
                        {supportItems.map((item) => (
                            <article
                                className="min-h-[22rem] rounded-lg border border-slate-200 bg-white p-7"
                                key={item.title}
                            >
                                <h2 className="mt-0 mb-[1.8rem] text-2xl">{item.title}</h2>
                                <p className="m-0 leading-[1.7] text-slate-600">{item.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 pt-[7.6rem] pb-[9.2rem]">
                <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-[minmax(0,0.75fr)_minmax(32rem,1fr)] gap-14 max-[86rem]:grid-cols-1">
                    <div>
                        <p className="mb-3 text-[1.3rem] font-bold text-teal-700">Consultation</p>
                        <h2 className="m-0 text-[3.4rem] leading-[1.25]">상담 신청 정보</h2>
                        <span className="mt-[1.8rem] block leading-[1.7] text-slate-600">방송 준비 상황과 필요한 지원 내용을 남기면 상담 목록에 저장됩니다.</span>
                    </div>
                    <InquiryForm />
                </div>
            </section>
        </>
    );
}
