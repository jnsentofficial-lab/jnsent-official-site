"use client";

import { InfoCard, InquiryRequestForm, SubPageHero, SubPageSplit } from "@/widgets/layout/ui";
import { DottedItem, SubPageSection } from "@/widgets/layout/ui/SubPageLayout";
import { ReactNode } from "react";

const consultingAreas = [
    {
        title: "BJ 엔터테인먼트 창업",
        description: "콘텐츠, 인력, 공간, 장비 운영을 사업 흐름에 맞게 정리합니다.",
        list: ["운영 구조 설계", "BJ 모집 및 관리 방향", "정산 및 운영 시스템 구성", "방송 운영 프로세스 컨설팅"],
    },
    {
        title: "방송 스튜디오 운영",
        description: "오픈 전 준비 일정과 필수 의사결정 항목을 구체화합니다.",
        list: ["스튜디오 공간 구성", "방송 장비 세팅 및 환경 구축", "운영 방식 및 관리 노하우 안내"],
    },
    {
        title: "콘텐츠 운영 및 관리",
        description: "운영 데이터와 시장 방향을 바탕으로 개선 우선순위를 찾습니다.",
        list: ["플랫폼별 운영 방향성", "콘텐츠 기획 및 관리 구조", "매니저 운영 방식 컨설팅"],
    },
    {
        title: "초기 운영 세팅",
        description: "운영 데이터와 시장 방향을 바탕으로 개선 우선순위를 찾습니다.",
        list: ["방송 프로그램 및 서버 환경 구축", "장비 구성 및 세팅 지원", "운영에 필요한 기본 시스템 안내"],
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
                                        className="rounded-[2.4rem] bg-[var(--adaptive-black50)] p-[1.6rem_2.4rem] flex flex-col gap-[1.6rem]"
                                    >
                                        <h3 className="text-[2.0rem] font-[700] text-black">{area.title}</h3>

                                        <section className="flex flex-col gap-[1.2rem]">
                                            {area.list.map((mappedItem, mappedIdx) => (
                                                <p
                                                    key={mappedIdx}
                                                    className="text-[var(--adaptive-black300)] font-[500]"
                                                >
                                                    {mappedItem}
                                                </p>
                                            ))}
                                        </section>
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
