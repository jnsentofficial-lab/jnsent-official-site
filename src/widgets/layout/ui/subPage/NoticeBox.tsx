"use client";

import { FormEvent, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, PanInfo, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import UI from "@/shared/ui/UIComponent";

export function NoticeBox() {
    return (
        <article
            className="flex flex-col rounded-[2.4rem] border border-[var(--adaptive-grey200)] bg-white p-[1.6rem] gap-[1.6rem]"
            data-report-id="안내 박스"
            data-report-type="item"
        >
            <section className="flex items-center gap-[1.6rem]">
                <Image
                    src={"/images/icon/outlined/ico-outlined-headset.svg"}
                    alt=""
                    width={32}
                    height={32}
                    className="mobile:hidden pc:block"
                />
                <section className="flex flex-col gap-[0.8rem]">
                    <h5 className="font-[900] mobile:text-[1.6rem] pc:text-[1.8rem]">문의가 필요하신가요?</h5>
                    <p className="leading-[1.5]">장비 상담 및 렌탈 관련 문의는 언제든지 연락주세요.</p>
                </section>
            </section>

            <UI.Button
                size="sm"
                className="w-full bg-[var(--adaptive-black50)] text-[var(--adaptive-black500)] rounded-[1.6rem]"
                onClick={() => window.open("https://open.kakao.com/o/s0UmPOAc", "_blank", "noopener,noreferrer")}
            >
                1:1 문의하기
            </UI.Button>
        </article>
    );
}
