"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Text } from "@/shared/ui/kit/Text";
import { GraphVer3 } from "@/widgets/home/ui/recordGraph/GraphVer3";
import { platformRecords } from "@/widgets/home/ui/recordGraph/constants";

export function RecordGraph() {
    return (
        <section
            className="relative h-svh min-h-0 overflow-x-clip flex flex-col"
            data-report-id="플랫폼 기록 섹션"
            data-report-type="group"
        >
            <div
                className="absolute top-[calc(50%-(1.6rem*2))] left-1/2 z-10 w-full -translate-x-1/2 translate-y-[-50%] px-[clamp(1.6rem,4vw,4rem)]"
                data-report-id="플랫폼 기록 카피"
                data-report-type="item"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.25 }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col gap-[1.6rem] max-w-[var(--size-pc)] mx-auto"
                >
                    <section className="flex items-center">
                        <Image
                            src={"/images/icon/filled/ico-filled-bay-tree.svg"}
                            alt=""
                            width={32}
                            height={32}
                            className="mobile:w-[2.4rem] mobile:h-[2.4rem] pc:w-[3.2rem] pc:h-[3.2rem]"
                        />

                        <Text.Shimmer
                            className="mobile:text-[1.8rem] pc:text-[2.4rem] font-[700] font-[NanumSquare]"
                            color={{ start: "#000000", end: "#e0e0e0" }}
                            duration={10}
                        >
                            플랫폼 신기록
                        </Text.Shimmer>

                        <Image
                            src={"/images/icon/filled/ico-filled-bay-tree.svg"}
                            alt=""
                            height={32}
                            width={32}
                            style={{ transform: "scaleX(-1)" }}
                            className="mobile:w-[2.4rem] mobile:h-[2.4rem] pc:w-[3.2rem] pc:h-[3.2rem]"
                        />
                    </section>

                    <Text.Reveal
                        as="h2"
                        className="mobile:text-[2.4rem] pc:text-[3.8rem] font-[900] leading-[1.5]"
                        initialColor="#ffffff00"
                        revealColor="#000000"
                        subHighlightColor="#A953FF"
                        highlightColor="#FF6B75"
                        revealWindow={0.5}
                        revealStartPosition={10}
                        revealEndPosition={40}
                        align="left"
                        transition={2}
                    >
                        {`기록은 거짓말하지 않습니다\n결과로 증명된 운영성과`}
                    </Text.Reveal>

                    <div
                        className="mt-8 grid gap-6 max-[48rem]:mt-6 max-[48rem]:gap-4 min-[86rem]:mt-12 min-[86rem]:gap-8"
                        data-report-id="플랫폼 기록 수치 목록"
                        data-report-type="item"
                    >
                        {platformRecords.map((record) => (
                            <div key={record.label}>
                                <span className="pc:block mobile:hidden">
                                    <Text.Rolling
                                        value={record.value}
                                        textSize={28}
                                        rollingCount={5}
                                    />
                                </span>
                                <span className="pc:hidden mobile:block">
                                    <Text.Rolling
                                        value={record.value}
                                        textSize={20}
                                        rollingCount={5}
                                    />
                                </span>
                                <span className="mt-2 block mobile:text-[1.4rem] pc:text-[1.8rem] text-base font-bold text-neutral-500">{record.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <GraphVer3 />
        </section>
    );
}
