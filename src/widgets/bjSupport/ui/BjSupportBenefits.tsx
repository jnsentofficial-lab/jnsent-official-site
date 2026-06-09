"use client";

import Image from "next/image";

import UI from "@/shared/ui/UIComponent";
import { useSubPageSplitNavigation } from "@/widgets/layout/ui/subPage/SubPageSplit";
import { SubPageSection } from "@/widgets/layout/ui/SubPageLayout";
import { Text } from "@/shared/ui/kit/Text";

const BJ_SUPPORT_ACCENT = "rgb(255, 92, 118)";

const benefits = [
    {
        icon: "ico-outlined-money",
        title: "최대 10:0 계약 가능",
        lines: ["인센티브 최대 10:0까지!", "노력한 만큼 더 많이 가져가세요."],
    },
    {
        icon: "ico-outlined-account",
        title: "만 20세 이상 여성",
        lines: ["만 20세 이상 여성이라면 누구나 지원 가능합니다."],
    },
    {
        icon: "ico-outlined-checklist",
        title: "방송 경험 없는 초보 환영",
        lines: ["경험이 없어도 괜찮아요!", "처음부터 차근차근 알려드립니다."],
    },
    {
        icon: "ico-outlined-check",
        title: "투잡 가능",
        lines: ["본업과 병행하며 활동 가능!", "부담 없이 시작할 수 있습니다."],
    },
    {
        icon: "ico-outlined-bell",
        title: "원하는 시간, 요일 자유 선택",
        lines: ["정해진 스케줄 없이", "내가 원하는 시간에 방송하세요."],
    },
    {
        icon: "ico-outlined-graph",
        title: "지원부터 정산까지 체계적인 시스템",
        lines: ["전담 매니저의 1:1 케어로 안정적인 방송 활동을 지원합니다."],
    },
] as const;

export function BjSupportBenefits() {
    const { showRightPanel } = useSubPageSplitNavigation();

    return (
        <div
            className="flex flex-col mobile:gap-[2.4rem] pc:gap-[3.2rem]"
            data-report-id="BJ 지원 혜택"
            data-report-type="group"
        >
            {/* <div className="flex flex-col mobile:gap-[0.8rem] pc:gap-[1.2rem]"> */}
            <SubPageSection title={"지원 혜택 및 조건"}>
                {/* <article className="grid mobile:grid-cols-1 pc:grid-cols-2 mobile:gap-[0.8rem] pc:gap-[1.2rem]"> */}
                <article className="grid mobile:grid-cols-1 pc:grid-cols-2 mobile:gap-[0.4rem] rounded-[2.4rem] p-[0.4rem]">
                    {benefits.map((item) => (
                        <article
                            key={item.title}
                            className="flex mobile:gap-[1.2rem] pc:gap-[1.6rem] rounded-[2.4rem] bg-[var(--adaptive-black50)] mobile:p-[1.6rem] pc:p-[1.6rem_2rem]"
                            // className="flex mobile:gap-[1.2rem] pc:gap-[1.6rem] rounded-[2.4rem] mobile:p-[1.6rem] pc:p-[1.6rem_2rem]"
                            data-report-id={`BJ 지원 혜택 ${item.title}`}
                            data-report-type="item"
                        >
                            <Image
                                src={`/images/icon/outlined/${item.icon}.svg`}
                                alt=""
                                width={32}
                                height={32}
                                className={`${item.icon === "ico-outlined-account" ? "invert" : ""} shrink-0 mobile:w-[2.8rem] pc:w-[3.2rem]`}
                            />
                            <div className="flex min-w-0 flex-col mobile:gap-[0.4rem] pc:gap-[0.6rem]">
                                <h3 className="m-0 mobile:text-[1.4rem] pc:text-[1.6rem] font-[700] leading-[1.4] text-black">{item.title}</h3>
                                <div className="flex flex-col mobile:gap-[0.2rem] pc:gap-[0.4rem]">
                                    {item.lines.map((line) => (
                                        <p
                                            key={line}
                                            className="m-0 mobile:text-[1.3rem] pc:text-[1.4rem] leading-[1.5] text-[var(--adaptive-black300)]"
                                        >
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </article>
            </SubPageSection>

            <SubPageSection title={"망설이지 말고, 지금 바로 시작하세요!"}>
                <article
                    data-report-id="BJ 지원 상담 CTA"
                    data-report-type="item"
                    className="flex items-center justify-between gap-[1.2rem] p-[1.6rem] bg-[#eeeeee99] rounded-[2.4rem]"
                >
                    <section className="flex items-center gap-[1.6rem]">
                        <div className="bg-white rounded-full p-[0.8rem]">
                            <Image
                                src="/images/icon/outlined/ico-outlined-headset.svg"
                                alt=""
                                width={32}
                                height={32}
                            />
                        </div>

                        <p className="m-0 leading-[1.5] font-bold text-[var(--adaptive-black500)] whitespace-break-spaces text-[1.6rem]">{`더 궁금한 점이 있으신가요?\n전담 매니저와 1:1 상담을 통해 자세히 안내해드립니다.`}</p>
                    </section>

                    <UI.Button
                        className="px-[2.0rem] flex items-center gap-[1.2rem] bg-[var(--adaptive-black900)] text-[var(--adaptive-black50)] rounded-[1.6rem] font-bold text-[1.6rem]"
                        onClick={() => window.open("https://open.kakao.com/o/s0UmPOAc", "_blank", "noopener,noreferrer")}
                    >
                        <Text.Shimmer
                            color={{
                                start: "#ffffff",
                                end: "#555555",
                            }}
                            duration={10}
                        >
                            1:1 상담 신청하기
                        </Text.Shimmer>
                    </UI.Button>
                </article>
            </SubPageSection>
        </div>
    );
}
