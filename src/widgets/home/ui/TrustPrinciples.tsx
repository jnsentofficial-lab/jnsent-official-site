"use client";

import { useSectionTheme } from "@/shared/hooks";
import { Text } from "@/shared/ui/kit/Text";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const principleItems = [
    { title: `"현혹" 되지마세요`, text: `과도한 수익 보장이나 실체 없는 10:0 계약 홍보는\n실제와 다를 수 있습니다.` },
    { title: `"직접" 확인하세요`, text: `계약서에 숨겨진 독소 조항이나\n장기 계약 강요는 초보 BJ의 성장을 가로막습니다.` },
    { title: `"증명" 요구하세요`, text: `실제 운영 시설과 데이터가 있는 회사인지\n반드시 확인해야 합니다.` },
];

const openItems = [
    {
        icon: "ico-outlined-building",
        description: `실제 운영 시설\n투명공개`,
    },
    {
        icon: "ico-outlined-graph-white",
        description: `정산 데이터\n샘플공개`,
    },
    {
        icon: "ico-outlined-account",
        description: `계약서 원본\n사전설명`,
    },
    {
        icon: "ico-outlined-checklist-white",
        description: `1:1 맞춤 미팅\n진행`,
    },
];

export function TrustPrinciples() {
    const sectionRef = useRef<HTMLElement>(null);

    useSectionTheme(sectionRef, { activeTheme: "mild", defaultTheme: "light", threshold: 0.5 });

    return (
        // <section className="bg-[#f3f6f7] py-[16rem] max-[86rem]:py-24">
        <section
            ref={sectionRef}
            className="min-h-[100dvh] mobile:py-[12.8rem] pc:py-0 flex mobile:flex-col pc:flex-row justify-center items-center"
        >
            {/* <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-[minmax(0,1fr)_44rem] items-center gap-14 max-[86rem]:grid-cols-1"> */}
            <div className="mx-auto max-w-[var(--size-pc)] mx-auto w-full flex flex-col justify-center items-center gap-[3.2rem] px-[1.6rem]">
                <Text.Reveal
                    as="h2"
                    className="mobile:text-[2.4rem] pc:text-[3.8rem] font-[700] leading-[1.5] w-full"
                    initialColor="#00000000"
                    midColor="rgb(255, 92, 118)"
                    revealColor="rgb(0, 0, 0)"
                    revealWindow={0.5}
                    align="left"
                    revealStartPosition={20}
                    revealEndPosition={60}
                    delay={2}
                    transition={0}
                >
                    {`투명한 인터넷 방송 생태계를 위한,\n제이엔에스가 지키는 단호한 원칙`}
                </Text.Reveal>

                <section className="w-full flex gap-[1.6rem] items-center mobile:flex-col pc:flex-row">
                    <div className="flex-1 flex flex-col gap-[0.4rem] mobile:w-full pc:w-auto">
                        {principleItems.map((item) => (
                            <article
                                className="rounded-[3.2rem] p-[3.2rem] flex flex-col gap-[1.2rem]"
                                // className="rounded-2xl bg-white px-8 py-7 shadow-[0_1.2rem_3rem_rgba(20,30,40,0.06)]"
                                key={item.title}
                            >
                                <h6 className="mobile:text-[1.8rem] pc:text-[2.4rem]">{item.title}</h6>
                                <p className="mobile:text-[1.4rem] pc:text-[1.8rem] text-[var(--adaptive-black300)] font-[500] whitespace-break-spaces leading-[1.5]">{item.text}</p>
                            </article>
                        ))}
                    </div>

                    <Image
                        src={`/images/icon/outlined/ico-outlined-arrow-single-right.svg`}
                        alt=""
                        width={48}
                        height={48}
                        className="mobile:rotate-90 pc:rotate-0"
                    />

                    <motion.article
                        // className="relative min-h-[43rem] overflow-hidden rounded-[2.4rem] bg-[url('/images/landing/meeting.webp')] bg-cover bg-center p-8 text-white shadow-[0_2rem_5rem_rgba(20,30,40,0.18)]"
                        // className="relative aspect-square overflow-hidden rounded-[2.4rem] bg-[url('/images/landing/meeting.png')] bg-cover bg-center text-white shadow-[0_2rem_5rem_rgba(20,30,40,0.18)]"
                        // className="relative aspect overflow-hidden rounded-[2.4rem] bg-[url('/images/landing/meeting.png')] bg-cover bg-center text-white shadow-[0_2rem_5rem_rgba(20,30,40,0.18)]"
                        className="relative flex-1 overflow-hidden rounded-[2.4rem] bg-[url('/images/landing/meeting.png')] bg-cover bg-center text-white shadow-[0_2rem_5rem_rgba(20,30,40,0.18)]"
                        initial={{ opacity: 0, x: 28 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true, amount: 0.25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        {/* <section className="bg-[linear-gradient(0deg,#000000f7_10%,#00000050)] h-full flex-1 p-[3.2rem] flex flex-col justify-between"> */}
                        <section className="bg-[linear-gradient(0deg,#000000f7_10%,#00000050)] h-full flex-1 p-[3.2rem] gap-[12.0rem] h-full flex flex-col justify-between">
                            <section className="flex flex-col gap-[1.6rem]">
                                <p className="text-[1.8rem] font-[500]">제이엔에스는 모든 항목에 대해</p>
                                <h6 className="leading-[1.5] text-[2.4rem]">
                                    미팅 시 실제 자료를
                                    <br />
                                    투명하게 공개합니다.
                                </h6>
                            </section>

                            <section className="flex flex-col gap-[1.6rem]">
                                <div className="grid mobile:grid-cols-[1fr_1fr] pc:grid-cols-[1fr_1fr_1fr_1fr] mobile:gap-[3.2rem] pc:gap-0">
                                    {openItems.map((mappedItem, mappedIdx) => (
                                        <div key={mappedIdx}>
                                            <Image
                                                src={`/images/icon/outlined/${mappedItem.icon}.svg`}
                                                alt=""
                                                width={48}
                                                height={48}
                                            />
                                            <p className="leading-[1.5] font-[400] whitespace-break-spaces">{mappedItem.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full bg-[#ffffff50] h-[0.1rem]" />
                                <div className="flex items-center gap-[0.8rem]">
                                    <Image
                                        src={`/images/icon/colored/ico-colored-checked-green.svg`}
                                        alt=""
                                        width={20}
                                        height={20}
                                    />
                                    <p className="text-[#89FF49] font-[400] leading-[1.5]">말이 아닌, 눈으로 확인 할 수 있는 신뢰를 약속드립니다.</p>
                                </div>
                            </section>
                        </section>
                    </motion.article>
                </section>
            </div>
        </section>
    );
}
