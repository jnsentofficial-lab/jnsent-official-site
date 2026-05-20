"use client";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";
import { hasRichTextContent } from "@/shared/lib/richText/richText";
import Skeleton from "@/shared/ui/kit/Skeleton";
import { RichTextRenderer } from "@/shared/ui/richText/RichTextRenderer";

const equipmentItems = [
    {
        title: "촬영 장비",
        description: "카메라, 삼각대, 조명 등 기본 촬영 구성을 지원합니다.",
    },
    {
        title: "송출 장비",
        description: "캡처보드, 오디오 인터페이스, 송출용 주변 장비를 준비합니다.",
    },
    {
        title: "운영 장비",
        description: "모니터링, 제어, 현장 운영에 필요한 보조 장비를 제공합니다.",
    },
];

const rentalFlow = ["장비 구성 상담", "일정 확인", "대여 및 세팅", "반납 점검"];

export function Analysis() {
    const { data: content, isLoading } = usePublishedPageContentQuery("equipmentRental");

    return (
        <>
            <Skeleton.Section
                target={!isLoading}
                className={{ element: "border-b border-slate-200 bg-slate-50 py-24 max-[86rem]:py-18" }}
            >
                <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                    <p className="mb-3 text-[1.3rem] font-bold text-teal-700">Equipment Rental</p>
                    <h1 className="m-0 max-w-[82rem] text-5xl leading-[1.14] max-[86rem]:text-4xl">{content?.title ?? "장비렌탈 콘텐츠가 준비되지 않았습니다"}</h1>
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
                        {equipmentItems.map((item) => (
                            <article
                                className="flex min-h-[24rem] flex-col justify-end rounded-lg border border-slate-300 bg-slate-50 p-7"
                                key={item.title}
                            >
                                <h2 className="mt-0 mb-3.5 text-2xl">{item.title}</h2>
                                <p className="m-0 leading-[1.7] text-slate-600">{item.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-slate-900 pt-[7.6rem] pb-[9.2rem] text-slate-50">
                <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] gap-14 max-[86rem]:grid-cols-1">
                    <div>
                        <p className="mb-3 text-[1.3rem] font-bold text-teal-700">Process</p>
                        <h2 className="m-0 text-[3.4rem] leading-[1.25]">대여 진행 흐름</h2>
                    </div>
                    <ol className="m-0 grid list-none gap-3 p-0">
                        {rentalFlow.map((item, index) => (
                            <li
                                className="rounded-lg border border-slate-700 px-5 py-[1.8rem] text-slate-200"
                                key={item}
                            >
                                <span className="mr-3.5 font-bold text-teal-500">{String(index + 1).padStart(2, "0")}</span>
                                {item}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </>
    );
}
