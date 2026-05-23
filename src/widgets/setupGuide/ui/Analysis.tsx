"use client";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";
import Skeleton from "@/shared/ui/kit/Skeleton";
import { InfoCard, InquiryRequestForm, SubPageHero, SubPageSplit } from "@/widgets/layout/ui";

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
        <Skeleton.Section target={!isLoading}>
            <SubPageHero
                current="시스템/지원내용"
                title={content?.title ?? "시스템 지원내용 안내"}
                description={content?.description ?? "방송 시작 전 필요한 프로그램, 장비, 네트워크 설정과 운영 지원 범위를 안내합니다."}
            />
            <SubPageSplit
                left={(
                    <div className="grid gap-8">
                        <h2 className="m-0 text-3xl font-black text-black">지원 범위</h2>
                        {steps.map((step) => (
                            <InfoCard
                                key={step.title}
                                title={step.title}
                            >
                                {step.description}
                            </InfoCard>
                        ))}
                        <div className="pt-8">
                            <h2 className="mb-6 text-3xl font-black text-black">기본 세팅 범위</h2>
                            <ul className="m-0 grid gap-2 pl-5 text-lg font-semibold leading-[1.8] text-black">
                                {checklist.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                )}
                right={<InquiryRequestForm category="setup_guide" buttonLabel="문의하기" />}
            />
        </Skeleton.Section>
    );
}
