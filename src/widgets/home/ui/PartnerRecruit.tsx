"use client";

import { Text } from "@/shared/ui/kit/Text";
import { motion } from "framer-motion";

const recruitInfo = [
    { title: "대상", text: "만 20세 이상 여성, 초보 / 투잡 / 방송 경험 없는 분 적극 환영" },
    { title: "우대", text: "주 5일 / 일 최소 4시간 이상 가능자" },
    { title: "혜택", text: "원하는 시간·요일 자유 선택, 방송 교육 및 세팅 전액 지원" },
];

export function PartnerRecruit() {
    return (
        <section
            className="min-h-[100dvh] mobile:py-[12.8rem] pc:py-0 flex justify-center mobile:flex-col-reverse pc:flex-row"
            data-report-id="파트너 모집 섹션"
            data-report-type="group"
        >
            <div
                className="mobile:w-full pc:w-[50dvw]"
                data-report-id="파트너 모집 이미지"
                data-report-type="item"
            >
                <motion.img
                    className="w-full h-full object-cover opacity-55"
                    src={"/images/landing/bj.jpg"}
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

            <div
                className="flex items-center pc:ml-[9.2rem] mobile:p-[1.6rem] pc:p-0 mobile:w-full pc:w-[calc(50dvw-9.2rem)]"
                data-report-id="파트너 모집 카피"
                data-report-type="item"
                // initial={{ opacity: 0, x: 32 }}
                // whileInView={{ opacity: 1, x: 0 }}
                // viewport={{ once: true, amount: 0.25 }}
                // transition={{ duration: 0.7 }}
            >
                <div className="flex flex-col mobile:gap-[1.6rem] pc:gap-[5.2rem] max-w-[56rem]">
                    {/* <h2 className="m-0 text-5xl font-[700] leading-[1.5] max-[86rem]:text-4xl">
                        제이엔에스와 함께
                        <br />
                        <span className="text-[#ff6673]">성장할 파트너</span>를 찾습니다
                    </h2> */}
                    <Text.Reveal
                        as="h2"
                        className="mobile:text-[2.4rem] pc:text-[3.8rem] font-[900] leading-[1.5]"
                        initialColor="#ffffff00"
                        midColor="rgb(255, 92, 118)"
                        revealColor="rgb(0, 0, 0)"
                        revealWindow={0.5}
                        align="left"
                        revealStartPosition={20}
                        revealEndPosition={60}
                        // delay={10}
                        // transition={20}
                        transition={2}
                    >
                        {`제이엔에스와 함께 \성장할 파트너를 찾습니다`}
                    </Text.Reveal>

                    <div
                        className="mt-[1.6rem] grid gap-10"
                        data-report-id="파트너 모집 안내 목록"
                        data-report-type="item"
                    >
                        {recruitInfo.map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col mobile:gap-[0.4rem] pc:gap-[1.2rem]"
                            >
                                <h6 className="mobile:text-[1.8rem] pc:text-[2.4rem] font-[700]">{item.title}</h6>
                                <p className="mobile:text-[1.4rem] pc:text-[1.8rem] text-[var(--adaptive-black400)] font-[700]">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
