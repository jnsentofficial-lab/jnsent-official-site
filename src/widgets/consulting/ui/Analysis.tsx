"use client";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";
import { hasRichTextContent } from "@/shared/lib/richText/richText";
import Skeleton from "@/shared/ui/kit/Skeleton";
import { RichTextRenderer } from "@/shared/ui/richText/RichTextRenderer";

const consultingAreas = [
    {
        title: "사업 구조 설계",
        description: "콘텐츠, 인력, 공간, 장비 운영을 사업 흐름에 맞게 정리합니다.",
    },
    {
        title: "초기 운영 계획",
        description: "오픈 전 준비 일정과 필수 의사결정 항목을 구체화합니다.",
    },
    {
        title: "성장 전략 점검",
        description: "운영 데이터와 시장 방향을 바탕으로 개선 우선순위를 찾습니다.",
    },
];

const phases = ["진단", "설계", "실행 계획", "운영 점검"];

export function Analysis() {
    const { data: content, isLoading } = usePublishedPageContentQuery("consulting");

    return (
        <>
            <Skeleton.Section
                target={!isLoading}
                className={{ element: "border-b border-slate-200 bg-slate-50 py-24 max-[86rem]:py-18" }}
            >
                <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                    <p className="mb-3 text-[1.3rem] font-bold text-teal-700">Consulting</p>
                    <h1 className="m-0 max-w-[82rem] text-5xl leading-[1.14] max-[86rem]:text-4xl">{content?.title ?? "엔터창업컨설팅 콘텐츠가 준비되지 않았습니다"}</h1>
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

            <section className="bg-white py-[8.4rem]">
                <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                    <div className="grid grid-cols-3 gap-4 max-[86rem]:grid-cols-1 min-[86.1rem]:max-[108rem]:grid-cols-2">
                        {consultingAreas.map((area) => (
                            <article
                                className="min-h-[24rem] rounded-lg border border-slate-200 bg-slate-50 p-7"
                                key={area.title}
                            >
                                <h2 className="mt-0 mb-[1.8rem] text-2xl text-slate-900">{area.title}</h2>
                                <p className="m-0 leading-[1.7] text-slate-700">{area.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-blue-50 pt-[7.6rem] pb-[9.2rem]">
                <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] gap-14 max-[86rem]:grid-cols-1">
                    <div>
                        <p className="mb-3 text-[1.3rem] font-bold text-teal-700">Process</p>
                        <h2 className="m-0 text-[3.4rem] leading-[1.25] text-slate-900">컨설팅 진행 단계</h2>
                    </div>
                    <ol className="m-0 grid list-none gap-3 p-0">
                        {phases.map((phase, index) => (
                            <li
                                className="rounded-lg border border-slate-200 bg-white px-5 py-[1.8rem] font-bold text-slate-700"
                                key={phase}
                            >
                                <span className="mr-3.5 text-blue-700">{String(index + 1).padStart(2, "0")}</span>
                                {phase}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </>
    );
}
