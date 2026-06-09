"use client";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";
import Skeleton from "@/shared/ui/kit/Skeleton";
import { BjSupportBenefits } from "@/widgets/bjSupport/ui/BjSupportBenefits";
import { BjSupportInquiryForm } from "@/widgets/bjSupport/ui/BjSupportInquiryForm";
import { SubPageHero, SubPageSplit } from "@/widgets/layout/ui";

export function SupportGuide() {
    const { data: content, isLoading } = usePublishedPageContentQuery("bjSupport");

    return (
        <Skeleton.Section
            target={!isLoading}
            data-report-id="BJ 지원 페이지"
            data-report-type="group"
        >
            <SubPageHero
                current="BJ 지원"
                title={content?.title ?? "BJ 지원"}
                description={content?.description ?? "당신의 개성이 수익이 되는곳,\n제이엔에스가 함께합니다."}
            />
            <SubPageSplit
                leftTabLabel="지원 혜택"
                rightTabLabel="신청하기"
                rightPanelId="bj-support-form"
                left={<BjSupportBenefits />}
                right={
                    <BjSupportInquiryForm
                        source="bj_support"
                        buttonLabel="신청하기"
                    />
                }
            />
        </Skeleton.Section>
    );
}
