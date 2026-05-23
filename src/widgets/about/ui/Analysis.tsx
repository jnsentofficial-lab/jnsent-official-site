"use client";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";
import { hasRichTextContent } from "@/shared/lib/richText/richText";
import Skeleton from "@/shared/ui/kit/Skeleton";
import { RichTextRenderer } from "@/shared/ui/richText/RichTextRenderer";

const strengths = ["방송 세팅부터 운영 관리까지 이어지는 실무형 프로세스", "장비, 공간, 콘텐츠 운영을 함께 설계하는 통합 지원", "관리자가 직접 콘텐츠와 SEO를 수정할 수 있는 CMS 기반 구조"];

const values = [
    { label: "Setup", value: "운영 환경 구축" },
    { label: "Studio", value: "제작 공간 지원" },
    { label: "Growth", value: "창업과 성장 상담" },
];

export function Analysis() {
    const { data: content, isLoading } = usePublishedPageContentQuery("about");

    return (
        <>
            <Skeleton.Section
                target={!isLoading}
                className={{ element: "border-b border-slate-200 bg-slate-50 py-24 max-[86rem]:py-18" }}
            >
                <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                    <p className="mb-3 text-[1.3rem] font-bold text-teal-700">About</p>
                    <h1 className="m-0 max-w-[82rem] text-5xl leading-[1.14] max-[86rem]:text-4xl">{content?.title ?? "회사소개 콘텐츠가 준비되지 않았습니다"}</h1>
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
                <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] items-start gap-14 max-[86rem]:grid-cols-1">
                    <div>
                        <p className="mb-3 text-[1.3rem] font-bold text-teal-700">What we do</p>
                        <h2 className="m-0 text-[3.4rem] leading-[1.25]">현장 준비와 운영 판단을 함께 정리합니다</h2>
                    </div>
                    <p className="m-0 text-lg leading-[1.8] text-slate-700">
                        방송 프로그램 세팅, 장비 렌탈, 스튜디오 대여, BJ 지원과 창업 컨설팅을 분리된 서비스가 아니라 운영에 필요한 연결된 과정으로 다룹니다.
                    </p>
                </div>
            </section>

            <section className="bg-slate-900 py-[7.6rem] text-slate-50">
                <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-3 gap-4 max-[86rem]:grid-cols-1 min-[86.1rem]:max-[108rem]:grid-cols-2">
                    {strengths.map((strength) => (
                        <article
                            className="min-h-[19rem] rounded-lg border border-slate-700 p-[2.6rem]"
                            key={strength}
                        >
                            <span className="mb-[4.2rem] block h-1 w-9 bg-teal-500" />
                            <p className="m-0 text-lg leading-[1.65] text-slate-200">{strength}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="pt-16 pb-[9.2rem]">
                <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-3 gap-4 max-[86rem]:grid-cols-1 min-[86.1rem]:max-[108rem]:grid-cols-2">
                    {values.map((item) => (
                        <div
                            className="rounded-lg border border-slate-200 bg-white p-6"
                            key={item.label}
                        >
                            <strong className="block text-[2.6rem] text-teal-700">{item.label}</strong>
                            <span className="mt-2 block text-slate-600">{item.value}</span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
