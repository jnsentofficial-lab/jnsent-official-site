"use client";

import { FormEvent, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, PanInfo, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";

type SubPageHeroProps = {
    current: string;
    title: ReactNode;
    description: ReactNode;
};

export function SubPageHero({ current, title, description }: SubPageHeroProps) {
    return (
        // <section className="pt-[calc(50dvh-7.2rem-17.4rem-9.2rem)] pb-[9.2rem] mx-[1.6rem]">
        <section
            className="mobile:pt-[calc(3.2rem+7.2rem+1.6rem)] pc:pt-[calc(50dvh-1.6rem-17.4rem-5.2rem)] pb-[3.2rem] mx-[1.6rem]"
            data-report-id={`${current} 히어로 섹션`}
            data-report-type="group"
            // className="pt-[calc(50dvh-1.6rem-17.4rem-3.2rem)] pb-[3.2rem] mx-[1.6rem]"
            // initial={{ opacity: 0, transform: "translateY(100px)" }}
            // animate={{ opacity: 1, transform: "translateY(0px)" }}
            // exit={{ opacity: 0, transform: "translateY(100px)" }}
            // transition={{
            //     delay: 0.1 * 1,
            //     type: "spring",
            //     mass: 0.1,
            //     stiffness: 100,
            //     damping: 10,
            // }}
        >
            <div className="mx-auto max-w-[var(--size-pc)] w-full flex flex-col mobile:gap-[1.6rem] pc:gap-[0.8rem]">
                <nav
                    aria-label="현재 페이지 위치"
                    className="flex items-center mobile:gap-[0.2rem] pc:gap-[0.8rem]"
                    data-report-id={`${current} 히어로 브레드크럼`}
                    data-report-type="item"
                >
                    <ol className="flex items-center mobile:gap-[0.2rem] pc:gap-[0.8rem]">
                        <li className="mobile:text-[1.8rem] pc:text-[2.4rem] text-[var(--adaptive-grey500)]">메인</li>
                        <li aria-hidden="true">
                            <img
                                src={"/images/icon/outlined/ico-outlined-arrow-right.svg"}
                                alt=""
                                className="mobile:w-[2.4rem] pc:w-[3.6rem]"
                            />
                        </li>
                        <li className="mobile:text-[1.8rem] pc:text-[2.4rem] font-[700]">{current}</li>
                    </ol>
                </nav>

                {/* <section className="grid grid-cols-4 mobile:gap-[0.8rem] pc:gap-16 max-[86rem]:grid-cols-1"> */}
                <section className="grid mobile:grid-cols-1 pc:grid-cols-4 mobile:gap-[1.2rem] pc:gap-[5.2rem]">
                    {/* <section className="grid grid-cols-4 gap-16 max-[86rem]:grid-cols-1"> */}
                    <motion.h1
                        className="col-span-2 whitespace-break-spaces font-[900] mobile:text-[2.8rem] pc:text-[5.2rem] leading-[1.5]"
                        data-report-id={`${current} 히어로 제목`}
                        data-report-type="item"
                        initial={{ opacity: 0, transform: "translateY(100px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        exit={{ opacity: 0, transform: "translateY(100px)" }}
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10,
                        }}
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        className="col-span-2 mobile:text-[2rem] pc:text-[2.4rem] font-[NanumSquare] whitespace-break-spaces leading-[1.5]"
                        data-report-id={`${current} 히어로 설명`}
                        data-report-type="item"
                        // className="col-span-2 m-0 pt-5 text-[2.4rem] font-[NanumSquare] whitespace-break-spaces leading-[1.5] text-black max-[86rem]:pt-0 max-[86rem]:text-2xl"
                        initial={{ opacity: 0, transform: "translateY(100px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        exit={{ opacity: 0, transform: "translateY(100px)" }}
                        transition={{
                            delay: 0.3,
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10,
                        }}
                    >
                        {description}
                    </motion.p>
                </section>
            </div>
        </section>
    );
}
