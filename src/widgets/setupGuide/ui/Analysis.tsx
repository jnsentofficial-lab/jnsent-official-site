"use client";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";
import { hasRichTextContent } from "@/shared/lib/richText/richText";
import Skeleton from "@/shared/ui/kit/Skeleton";
import { RichTextRenderer } from "@/shared/ui/richText/RichTextRenderer";

const steps = [
    {
        title: "환경 진단",
        description: "사용 장비, 네트워크, 송출 목적에 맞춰 필요한 조건을 확인합니다.",
    },
    {
        title: "프로그램 구성",
        description: "송출, 녹화, 오디오, 화면 구성 프로그램을 목적에 맞게 세팅합니다.",
    },
    {
        title: "운영 테스트",
        description: "실제 방송 흐름 기준으로 안정성, 지연, 음향 상태를 점검합니다.",
    },
];

const checklist = ["송출 프로그램 초기 설정", "오디오 입력/출력 경로 정리", "화면 소스와 장면 구성", "네트워크와 해상도 권장값 안내"];

export function Analysis() {
    const { data: content, isLoading } = usePublishedPageContentQuery("setupGuide");

    return (
        <>
            <Skeleton.Section
                target={!isLoading}
                className={{ element: "border-b border-slate-200 bg-slate-50 py-24 max-[86rem]:py-18" }}
            >
                <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                    <p className="mb-3 text-[1.3rem] font-bold text-teal-700">Setup Guide</p>
                    <h1 className="m-0 max-w-[82rem] text-5xl leading-[1.14] max-[86rem]:text-4xl">{content?.title ?? "프로그램 세팅안내 콘텐츠가 준비되지 않았습니다"}</h1>
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
                        {steps.map((step, index) => (
                            <article
                                className="min-h-[26rem] rounded-lg border border-slate-200 bg-white p-7"
                                key={step.title}
                            >
                                <strong className="text-[1.5rem] text-teal-500">{String(index + 1).padStart(2, "0")}</strong>
                                <h2 className="mt-[4.2rem] mb-3.5 text-2xl">{step.title}</h2>
                                <p className="m-0 leading-[1.7] text-slate-600">{step.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 pt-[7.6rem] pb-[9.2rem]">
                <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] items-start gap-14 max-[86rem]:grid-cols-1">
                    <div>
                        <p className="mb-3 text-[1.3rem] font-bold text-teal-700">Checklist</p>
                        <h2 className="m-0 text-[3.4rem] leading-[1.25]">기본 세팅 범위</h2>
                    </div>
                    <ul className="m-0 grid list-none gap-3 p-0">
                        {checklist.map((item) => (
                            <li
                                className="rounded-lg border border-slate-200 bg-white px-5 py-[1.8rem] font-bold text-slate-700"
                                key={item}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}
