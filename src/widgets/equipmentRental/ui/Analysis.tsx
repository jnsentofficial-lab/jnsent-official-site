"use client";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";
import Skeleton from "@/shared/ui/kit/Skeleton";
import { InfoCard, InquiryRequestForm, NoticeBox, SubPageHero, SubPageSplit } from "@/widgets/layout/ui";

const equipmentChips = [
    { label: "PC 본체", options: ["i5 5400", "i7 10700k"], required: true },
    { label: "모니터", options: ["27인치", "32인치"] },
    { label: "DSLR", options: ["200D", "200D II"] },
    { label: "웹캠", options: ["biro4k", "C920", "C930"] },
    { label: "조명", options: ["룩스패드43H", "룩스패드22", "소프트박스", "레일조명"] },
];

export function Analysis() {
    const { data: content, isLoading } = usePublishedPageContentQuery("equipmentRental");

    return (
        <Skeleton.Section target={!isLoading}>
            <SubPageHero
                current="장비렌탈"
                title={content?.title ?? "장비렌탈"}
                description={content?.description ?? "최고의 장비를 합리적인 비용으로 렌탈해드립니다."}
            />
            <SubPageSplit
                left={(
                    <div className="grid gap-8">
                        <h2 className="m-0 text-3xl font-black text-black">주의사항 <span className="text-[#f04452]">*</span></h2>
                        <div className="rounded bg-[var(--adaptiveGrey50)] px-5 py-4 text-lg font-black">필요한 장비 선택 → 장비렌탈 신청 및 상담 → 출장 스케줄 예약 및 방문 설치</div>
                        <ul className="m-0 grid gap-3 p-0 pl-5 text-lg font-semibold leading-[1.7] text-black">
                            <li>1개월 기준 렌탈료는 선입금 해주셔야합니다.</li>
                            <li>최초 렌탈기준 기간은 1년입니다.</li>
                            <li>18개월 계약시 장비 소유 가능합니다.</li>
                            <li>PC 본체는 필수 선택사항입니다.</li>
                            <li>렌탈장비 이외 물품은 지원해드리지 않습니다.</li>
                            <li>모니터, 웹캠, 조명 등 단독 렌탈 불가함을 알려드립니다.</li>
                        </ul>
                        <NoticeBox />
                    </div>
                )}
                right={(
                    <InquiryRequestForm
                        category="equipment_rental"
                        chips={equipmentChips}
                        buttonLabel="요청하기"
                    />
                )}
            />
        </Skeleton.Section>
    );
}
