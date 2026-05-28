"use client";

import { Text } from "@/shared/ui/kit/Text";
import { motion } from "framer-motion";

const supportItems = [
    { title: "고성능 장비", text: "PC, 마이크, 조명, 캠, 오디오 인터페이스 풀세팅 지원" },
    { title: "기술 지원", text: "디자인 작업, 원격 세팅 및 방송 프로그램 최적화 지원" },
    { title: "공간 지원", text: "사내 스튜디오 및 실제 운영 공간 제공" },
];

export function BroadcastEnvironment() {
    return (
        <section
            className="min-h-[100dvh] mobile:py-[12.8rem] pc:py-0 flex mobile:flex-col pc:flex-row items-center"
            data-report-id="방송 환경 섹션"
            data-report-type="group"
        >
            <div
                className="flex flex-col items-end justify-center mobile:gap-[1.6rem] pc:gap-[5.2rem] text-center mobile:p-[1.6rem] pc:p-0 mobile:w-full pc:w-[calc(50dvw-9.2rem)] h-full pc:mr-auto"
                data-report-id="방송 환경 카피"
                data-report-type="item"
            >
                <Text.Reveal
                    as="h2"
                    className="mobile:text-[2.4rem] pc:text-[3.8rem] font-[900] leading-[1.5]"
                    initialColor="#ffffff00"
                    revealColor="#000000"
                    highlightColor="#FF6B75"
                    revealWindow={0.5}
                    revealStartPosition={20}
                    revealEndPosition={60}
                    align="right"
                    // delay={2}
                    // transition={0}
                    transition={2}
                >
                    {`최상의 결과는\n최상의 환경에서 시작됩니다`}
                </Text.Reveal>

                {/* <div className="flex flex-col justify-end items-end gap-[1.6rem]">
                    {supportItems.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col items-end"
                        >
                            <strong className="block text-2xl font-[700]">{item.title}</strong>
                            <span className="mt-2 block text-base font-semibold text-neutral-700">{item.text}</span>
                        </div>
                    ))}
                </div> */}
                <div
                    className="mt-[1.6rem] grid gap-10"
                    data-report-id="방송 환경 지원 목록"
                    data-report-type="item"
                >
                    {supportItems.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col mobile:gap-[0.4rem] pc:gap-[1.2rem]"
                        >
                            <h6 className="text-right mobile:text-[1.8rem] pc:text-[2.4rem] font-[700]">{item.title}</h6>
                            <p className="text-right mobile:text-[1.4rem] pc:text-[1.8rem] text-[var(--adaptive-black400)] font-[700]">{item.text}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-12 text-sm leading-[1.5] text-right text-neutral-400">* 온라인 이미지만 속지 마세요. 실제 방송 환경을 직접 눈으로 확인하실 수 있습니다.</p>
            </div>

            <div
                className="mobile:w-full pc:w-[50dvw]"
                data-report-id="방송 환경 이미지"
                data-report-type="item"
            >
                <motion.img
                    className="w-full h-full object-cover opacity-55"
                    src={"/images/landing/room.jpg"}
                    alt=""
                    style={{
                        maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                />
            </div>
        </section>
    );
}
