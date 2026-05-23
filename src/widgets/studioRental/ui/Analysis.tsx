"use client";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";

import { InquiryRequestForm, NoticeBox, StudioSlider, SubPageHero, SubPageSplit } from "@/widgets/layout/ui";
import { Fragment } from "react/jsx-runtime";

const studioItems = [
    { title: "개인방송 스튜디오 (좌측)", image: "/images/landing/studioBlue.webp" },
    { title: "개인방송 스튜디오", image: "/images/landing/studioBlue.webp" },
    { title: "엑셀 스튜디오", image: "/images/landing/studioDesk.webp" },
];

export function Analysis() {
    const { data: content } = usePublishedPageContentQuery("studioRental");

    return (
        <Fragment>
            <SubPageHero
                current="스튜디오 대여/대관"
                title={
                    content?.title ?? (
                        <>
                            개인 스튜디오 대여
                            <br />
                            엑셀 스튜디오 대관
                        </>
                    )
                }
                description={content?.description ?? "엑셀 및 개인 방송, 라이브 커머스 등 콘텐츠 성격에 최적화된 맞춤형 공간을 제공합니다."}
            />
            <StudioSlider items={studioItems} />
            <SubPageSplit
                left={
                    <div className="grid gap-8">
                        <h2 className="m-0 text-3xl font-black text-black">
                            주의사항 <span className="text-[#f04452]">*</span>
                        </h2>
                        <NoticeBox />
                    </div>
                }
                right={
                    <InquiryRequestForm
                        category="studio_rental"
                        chips={[{ label: "서비스 선택", options: ["개인방송 스튜디오를 대여할게요", "엑셀스튜디오를 대관할게요"], required: true }]}
                        buttonLabel="문의하기"
                    />
                }
            />
        </Fragment>
    );
}
