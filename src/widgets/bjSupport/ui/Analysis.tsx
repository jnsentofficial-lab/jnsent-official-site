"use client";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";
import Skeleton from "@/shared/ui/kit/Skeleton";
import { InfoCard, InquiryRequestForm, SubPageHero, SubPageSplit } from "@/widgets/layout/ui";

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
        <Skeleton.Section target={!isLoading}>
            <SubPageHero
                current="BJ 지원"
                title={content?.title ?? "BJ 지원"}
                description={content?.description ?? "방송 시작과 성장에 필요한 상담, 장비, 공간, 운영 관리를 함께 지원합니다."}
            />
            <SubPageSplit
                left={
                    <div className="grid gap-8">
                        <h2 className="m-0 text-3xl font-[700] text-black">지원 안내</h2>
                        {supportItems.map((item) => (
                            <InfoCard
                                key={item.title}
                                title={item.title}
                            >
                                {item.description}
                            </InfoCard>
                        ))}
                    </div>
                }
                right={
                    <InquiryRequestForm
                        category="bj_support"
                        showEmail
                        buttonLabel="신청하기"
                    />
                }
            />
        </Skeleton.Section>
    );
}
