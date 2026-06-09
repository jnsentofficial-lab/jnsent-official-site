"use client";

import { FormEvent, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, PanInfo, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import UI from "@/shared/ui/UIComponent";
import { SubPageSection } from "./SubPageSection";
import { Text } from "@/shared/ui/kit/Text";

export function NoticeBox() {
    return (
        <SubPageSection title={"문의가 필요하신가요?"}>
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

                    <p className="m-0 leading-[1.5] font-bold text-[var(--adaptive-black500)] whitespace-break-spaces text-[1.6rem]">{`장비 상담 및 렌탈 관련 문의는\n언제든지 연락주세요.`}</p>
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
    );
}
