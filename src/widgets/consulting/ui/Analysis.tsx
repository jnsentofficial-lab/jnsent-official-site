"use client";

import { InfoCard, InquiryRequestForm, SubPageHero, SubPageSplit } from "@/widgets/layout/ui";
import { DottedItem, SubPageSection } from "@/widgets/layout/ui/SubPageLayout";
import { ReactNode } from "react";

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

export function Analysis() {
    return (
        <section>
            <SubPageHero
                current="엔터창업"
                title={"엔터창업"}
                description={"라이브 콘텐츠 및 BJ 매니지먼트 운영 경험을 바탕으로\n엔터테인먼트 및 방송 관련 창업 컨설팅을 진행하고 있습니다."}
            />

            <SubPageSplit
                left={
                    <div className="flex flex-col gap-[9.2rem]">
                        <SubPageSection title={"컨설팅 분야"}>
                            <div className="flex flex-col gap-[1.6rem]">
                                {consultingAreas.map((area) => (
                                    <section
                                        key={area.title}
                                        className="rounded-[2.4rem] bg-[var(--adaptive-black50)] p-[1.2rem_2.4rem] flex flex-col gap-[0.4rem]"
                                    >
                                        <h3 className="text-[1.8rem] font-[700] text-black">{area.title}</h3>
                                        <div className="text-[1.6rem] leading-[1.5] text-[var(--adaptive-black300)]">{area.description}</div>
                                    </section>
                                ))}
                            </div>
                        </SubPageSection>

                        <SubPageSection title={"이런 분들께 추천드립니다"}>
                            {/* <div className="m-0 grid gap-2 pl-5 text-lg font-semibold leading-[1.5] text-black"> */}
                            <div className="flex flex-col gap-[0.8rem]">
                                <DottedItem>엔터테인먼트 사업을 처음 시작하시는 분</DottedItem>
                                <DottedItem>방송 스튜디오 운영을 준비 중이신 분</DottedItem>
                                <DottedItem>BJ 매니지먼트 운영 방향이 필요한 분</DottedItem>
                                <DottedItem>실제 운영 경험 기반의 현실적인 조언이 필요한 분</DottedItem>
                            </div>
                        </SubPageSection>

                        <SubPageSection title={`제이엔에스엔터테인먼트는\n실제 라이브 콘텐츠 운영 경험을 기반으로\n\n보다 안정적이고\n효율적인 운영 방향을 함께 고민합니다.`} />
                    </div>
                }
                right={
                    <InquiryRequestForm
                        category="consulting"
                        showEmail
                    />
                }
            />
        </section>
    );
}
