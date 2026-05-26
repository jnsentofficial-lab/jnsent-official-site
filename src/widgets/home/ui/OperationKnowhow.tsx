"use client";

import { useSectionTheme } from "@/shared/hooks";
import useScrollProgress from "@/shared/hooks/useScrollProgress";
import { Text } from "@/shared/ui/kit/Text";
import { motion } from "framer-motion";
import { useRef } from "react";

const knowhowItems = [
    { title: "플랫폼 직속 엔터", text: "협력 포함 120명 이상의 BJ 네트워크 보유" },
    { title: "전문 매니징", text: "5년 이상 경력의 전담 매니저 배정 및 콘텐츠 방향성 컨설팅" },
    { title: "크루방송 단일 회차", text: "장기 계약 강요 없는 공정 계약 지향 및 최대 10:0 계약 가능" },
    { title: "크루 시스템", text: "자체 크루 및 엑셀 방송 진행으로 빠른 성장 지원" },
];

export function OperationKnowhow() {
    const [ref, { progress, status }] = useScrollProgress(-50);

    const sectionRef = useRef<HTMLElement>(null);

    useSectionTheme(sectionRef, { activeTheme: "dark", defaultTheme: "light", threshold: 0.5 });

    return (
        <section
            ref={sectionRef}
            className="relative mobile:min-h-[100dvh] mobile:px-[1.6rem] mobile:py-[8rem] pc:h-[150dvh]"
        >
            <div
                className="absolute w-full left-[50%] transform translate-x-[-50%] inset-0 pointer-events-none z-0"
                style={{
                    maskImage: "radial-gradient(ellipse at left 50%, black 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.2) 55%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse at left 50%, black 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.2) 55%, transparent 100%)",
                }}
            >
                <motion.img
                    className="w-full h-full object-cover"
                    src={"/images/landing/studio.jpg"}
                    alt=""
                    style={{
                        maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                        objectPosition: `0 ${progress / 1}%`,
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    // whileInView={{ opacity: 0.2 }}
                    viewport={{ amount: 0.1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                />
            </div>

            <div
                ref={ref}
                className="ml-auto flex h-full items-center justify-center mobile:w-full pc:w-[calc(50dvw-7.2rem)]"
            >
                <div
                    // className="relative z-[1] ml-auto w-[min(72rem,calc(100%_-_3.2rem))] pr-[max(1.6rem,calc((100vw_-_112rem)/2))]"
                    className="w-full h-full flex flex-col justify-center items-start"
                    // initial={{ opacity: 0, x: 34 }}
                    // whileInView={{ opacity: 1, x: 0 }}
                    // viewport={{ once: true, amount: 0.25 }}
                    // transition={{ duration: 0.75 }}
                >
                    <Text.Reveal
                        as="h2"
                        className="mobile:text-[2.4rem] pc:text-[3.8rem] font-[700] leading-[1.5]"
                        initialColor="#00000000"
                        midColor="rgb(255, 92, 118)"
                        revealColor="rgb(255, 255, 255)"
                        revealWindow={0.5}
                        align="left"
                        revealStartPosition={20}
                        revealEndPosition={60}
                        delay={2}
                        transition={0}
                    >
                        {`2017년부터 쌓아온 운영 노하우\n당신의 성장에만 집중합니다.`}
                    </Text.Reveal>
                    {/* <p>{progress}</p> */}

                    <motion.div
                        className="mt-14 grid gap-9"
                        // variants={{
                        //     visible: {
                        //         transition: {
                        //             staggerChildren: 0.22,
                        //         },
                        //     },
                        // }}
                        // initial="hidden"
                        // animate={progress === 100 ? "visible" : "hidden"}
                    >
                        {knowhowItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                className="flex flex-col gap-[0.8rem]"
                                // variants={{
                                //     hidden: { opacity: 0, y: 132 },
                                //     visible: { opacity: 1, y: 0 },
                                // }}
                                // transition={{ duration: 0, ease: "easeInOut" }}
                            >
                                <h3 className="text-[2.8rem]">{item.title}</h3>
                                <p className="text-[1.8rem]">{item.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
