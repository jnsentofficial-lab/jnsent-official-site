"use client";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";
import { hasRichTextContent } from "@/shared/lib/richText/richText";
import Skeleton from "@/shared/ui/kit/Skeleton";
import { RichTextRenderer } from "@/shared/ui/richText/RichTextRenderer";

const spaces = [
    {
        title: "라이브 방송 공간",
        description: "개인 방송과 라이브 커머스에 적합한 기본 송출 환경을 제공합니다.",
    },
    {
        title: "촬영 공간",
        description: "프로필, 숏폼, 홍보 콘텐츠 촬영에 맞춘 공간 구성을 지원합니다.",
    },
    {
        title: "운영 대기 공간",
        description: "출연자와 운영 인력이 안정적으로 준비할 수 있는 동선을 제공합니다.",
    },
];

const features = ["조명 기본 구성", "촬영/송출 장비 연계", "예약 시간 관리", "현장 세팅 상담"];

export function StudioRentalView() {
    const { data: content, isLoading } = usePublishedPageContentQuery("studioRental");

    return (
        <main className="bg-white">
            <Skeleton.Section
                target={!isLoading}
                className={{ element: "border-b border-slate-200 bg-slate-50 py-24 max-[86rem]:py-18" }}
            >
                <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                    <p className="mb-3 text-[1.3rem] font-bold text-teal-700">Studio Rental</p>
                    <h1 className="m-0 max-w-[82rem] text-5xl leading-[1.14] max-[86rem]:text-4xl">{content?.title ?? "스튜디오 대여 콘텐츠가 준비되지 않았습니다"}</h1>
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
                        {spaces.map((space) => (
                            <article
                                className="min-h-[30rem] rounded-lg border border-slate-200 bg-white p-6"
                                key={space.title}
                            >
                                <div
                                    className="mb-7 h-[12rem] rounded-md bg-slate-100 bg-[linear-gradient(135deg,rgba(15,118,110,0.26),transparent_48%)]"
                                    aria-hidden="true"
                                />
                                <h2 className="mt-0 mb-3.5 text-2xl">{space.title}</h2>
                                <p className="m-0 leading-[1.7] text-slate-600">{space.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 pt-[7.6rem] pb-[9.2rem]">
                <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] gap-14 max-[86rem]:grid-cols-1">
                    <div>
                        <p className="mb-3 text-[1.3rem] font-bold text-teal-700">Features</p>
                        <h2 className="m-0 text-[3.4rem] leading-[1.25]">대여 지원 항목</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3 max-[86rem]:grid-cols-1">
                        {features.map((feature) => (
                            <span
                                className="rounded-lg border border-slate-200 bg-white px-5 py-[1.8rem] font-bold text-slate-700"
                                key={feature}
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
