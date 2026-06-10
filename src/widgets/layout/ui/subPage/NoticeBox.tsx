"use client";

import Image from "next/image";

import UI from "@/shared/ui/UIComponent";
import { Text } from "@/shared/ui/kit/Text";

import { SubPageSection } from "./SubPageSection";

export function NoticeBox() {
    return (
        <SubPageSection title={"문의가 필요하신가요?"}>
            <article
                data-report-id="BJ 지원 상담 CTA"
                data-report-type="item"
                className="flex items-center justify-between mobile:flex-col pc:flex-row gap-[1.2rem] p-[1.6rem] bg-[var(--adaptive-black50)] rounded-[2.4rem]"
            >
                <section className="flex items-center gap-[1.6rem]">
                    <div className="mobile:hidden pc:block bg-white rounded-full p-[0.8rem]">
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
                    className="px-[2.0rem] border border-[var(--adaptive-black100)] flex items-center gap-[1.2rem] text-[var(--adaptive-black50)] rounded-[1.6rem] font-bold text-[1.6rem] mobile:w-full pc:w-fit justify-center"
                    onClick={() => window.open("https://open.kakao.com/o/s0UmPOAc", "_blank", "noopener,noreferrer")}
                >
                    <Text.Shimmer
                        color={{
                            start: "#cc0c50",
                            end: "#000000",
                        }}
                        duration={10}
                    >
                        1:1 상담 신청하기
                    </Text.Shimmer>
                </UI.Button>
            </article>
        </SubPageSection>
    );
}
