"use client";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";
import Skeleton from "@/shared/ui/kit/Skeleton";
import { InfoCard, InquiryRequestForm, SubPageHero, SubPageSplit } from "@/widgets/layout/ui";

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
        <Skeleton.Section target={!isLoading}>
            <SubPageHero
                current="엔터창업"
                title={content?.title ?? "엔터창업"}
                description={content?.description ?? "라이브 콘텐츠 및 BJ 매니지먼트 운영 경험을 바탕으로 엔터테인먼트 및 방송 관련 창업 컨설팅을 진행하고 있습니다."}
            />
            <SubPageSplit
                left={(
                    <div className="grid gap-8">
                        <h2 className="m-0 text-3xl font-black text-black">컨설팅 분야</h2>
                        {consultingAreas.map((area) => (
                            <InfoCard
                                key={area.title}
                                title={area.title}
                            >
                                {area.description}
                            </InfoCard>
                        ))}
                        <div className="pt-10">
                            <h2 className="mb-6 text-3xl font-black text-black">이런 분들께 추천드립니다</h2>
                            <ul className="m-0 grid gap-2 pl-5 text-lg font-semibold leading-[1.8] text-black">
                                <li>엔터테인먼트 사업을 처음 시작하시는 분</li>
                                <li>방송 스튜디오 운영을 준비 중이신 분</li>
                                <li>BJ 매니지먼트 운영 방향이 필요한 분</li>
                                <li>실제 운영 경험 기반의 현실적인 조언이 필요한 분</li>
                            </ul>
                        </div>
                    </div>
                )}
                right={<InquiryRequestForm category="consulting" showEmail />}
            />
        </Skeleton.Section>
    );
}
