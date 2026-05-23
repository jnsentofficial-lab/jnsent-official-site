"use client";

import Text from "@/shared/ui/reveal";
import Transition from "@/shared/ui/transition";
import { motion } from "framer-motion";

const supportItems = [
    { title: "고성능 장비", text: "PC, 마이크, 조명, 캠, 오디오 인터페이스 풀세팅 지원" },
    { title: "기술 지원", text: "디자인 작업, 원격 세팅 및 방송 프로그램 최적화 지원" },
    { title: "공간 지원", text: "사내 스튜디오 및 실제 운영 공간 제공" },
];

export function BroadcastEnvironment() {
    return (
        <section className="h-[100dvh] flex">
            <motion.div
                className="flex flex-col items-end justify-center gap-[5.2rem] text-center w-[calc(50dvw-9.2rem)] h-full mr-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7 }}
            >
                <Text.Reveal
                    as="h2"
                    className="max-w-[92rem] text-[3.8rem] leading-[1.5] max-[64rem]:text-5xl max-[48rem]:text-4xl"
                    initialColor="#ffffff00"
                    revealColor="#000000"
                    highlightColor="#FF6B75"
                    revealWindow={0.5}
                    // transition={2}
                    align="right"
                    delay={2}
                >
                    {`최상의 결과는\n최상의 환경에서 시작됩니다`}
                </Text.Reveal>

                <div className="flex flex-col justify-end items-end gap-[1.6rem]">
                    {supportItems.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col items-end"
                        >
                            <strong className="block text-2xl font-black">{item.title}</strong>
                            <span className="mt-2 block text-base font-semibold text-neutral-700">{item.text}</span>
                        </div>
                    ))}
                </div>

                <p className="mt-12 text-sm leading-[1.7] text-neutral-400">* 온라인 이미지만 속지 마세요. 실제 방송 환경을 직접 눈으로 확인하실 수 있습니다.</p>
            </motion.div>

            <div className="w-[calc(50dvw)]">
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
