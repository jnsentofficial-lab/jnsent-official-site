"use client";

import { Fragment } from "react/jsx-runtime";

import { usePublishedPageContentQuery } from "@/entities/pageContent/api/pageContent.query";
import { InquiryRequestForm, NoticeBox, SubPageHero, SubPageSplit } from "@/widgets/layout/ui";
import { DottedItem, SubPageSection } from "@/widgets/layout/ui/SubPageLayout";
import UI from "@/shared/ui/UIComponent";
import Image from "next/image";

const equipmentChips = [
    // { label: "PC 본체", options: ["i5 5400", "i7 10700k"], required: true },
    // { label: "모니터", options: ["27인치", "32인치"] },
    // { label: "DSLR", options: ["200D", "200D II"] },
    // { label: "웹캠", options: ["biro4k", "C920", "C930"] },
    // { label: "조명", options: ["룩스패드43H", "룩스패드22", "소프트박스", "레일조명"] },
    { label: "CPU", options: ["인텔 코어 울트라 시리즈2-270K", "인텔 15세대 울트라 5 225에로우레이크"], required: true },
    { label: "GPU", options: ["GEFORCE RTX 5060"], required: true },
    { label: "카메라", options: ["R8 RP"], required: true },
    { label: "렌즈", options: ["캐논 24mm", "캐논 28mm"], required: true },
    { label: "조명", options: ["룩스패드43H", "룩스패드22", "소프트박스"], required: true },
];

export function Analysis() {
    const { data: content, isLoading } = usePublishedPageContentQuery("equipmentRental");

    return (
        <Fragment>
            <SubPageHero
                current="장비렌탈"
                title={"장비렌탈"}
                description={"최고의 장비를\n합리적인 비용으로 렌탈해드립니다."}
            />
            <SubPageSplit
                left={
                    <div
                        className="sticky top-[9.2rem] flex flex-col gap-[9.2rem]"
                        data-report-id="장비렌탈 안내 영역"
                        data-report-type="group"
                    >
                        <SubPageSection title={"주의사항"}>
                            <section className="bg-[var(--adaptive-black50)] rounded-[1.6rem] p-[1.6rem]">
                                <p className="text-[var(--adaptive-black500)]">필요한 장비 선택 → 장비렌탈 신청 및 상담 → 출장 스케줄 예약 및 방문 설치</p>
                            </section>

                            <section className="flex flex-col gap-[0.8rem]">
                                <DottedItem>1개월 기준 렌탈료는 선입금 해주셔야합니다.</DottedItem>
                                <DottedItem>최초 렌탈기준 기간은 1년입니다.</DottedItem>
                                <DottedItem>18개월 계약시 장비 소유 가능합니다.</DottedItem>
                                <DottedItem>PC 본체는 필수 선택사항입니다.</DottedItem>
                                <DottedItem>렌탈장비 이외 물품은 지원해드리지 않습니다.</DottedItem>
                                <DottedItem>모니터, 웹캠, 조명 등 단독 렌탈 불가함을 알려드립니다.</DottedItem>
                            </section>
                        </SubPageSection>

                        <article className="flex flex-col rounded-[2.4rem] border border-[var(--adaptive-grey200)] bg-white p-[1.6rem] gap-[1.6rem]">
                            <section className="flex items-center gap-[1.6rem]">
                                <Image
                                    src={"/images/icon/outlined/ico-outlined-headset.svg"}
                                    alt=""
                                    width={32}
                                    height={32}
                                />
                                <section className="flex flex-col gap-[0.8rem]">
                                    <h5 className="text-[1.8rem]">문의가 필요하신가요?</h5>
                                    <p>장비 상담 및 렌탈 관련 문의는 언제든지 연락주세요.</p>
                                </section>
                            </section>

                            <UI.Button
                                className="w-full bg-[var(--adaptive-black50)] text-[var(--adaptive-black500)] rounded-[1.6rem] h-[5.4rem]"
                                // href="/bjSupport"
                            >
                                1:1 문의하기
                            </UI.Button>
                        </article>
                    </div>
                }
                right={
                    <InquiryRequestForm
                        category="equipment_rental"
                        chips={equipmentChips}
                        buttonLabel="요청하기"
                    />
                }
            />
        </Fragment>
    );
}
