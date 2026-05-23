import React, { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Text } from "@/shared/ui/kit/Text";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";

const socialItems = ["bj", "Talk", "Insta", "Blog"];

export const Floating = () => {
    const { isNeedShowFloating } = useLayoutStore();

    return (
        <Fragment>
            <AnimatePresence>
                {isNeedShowFloating && (
                    <motion.section
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-[1.6rem] left-[50%] transform translate-x-[-50%] bg-black h-[6.2rem] flex items-center rounded-full p-[0.4rem] max-w-[var(--size-tablet)] w-full z-10"
                    >
                        <div className="px-[1.6rem]">
                            <img
                                src={"/images/icon/outlined/ico-outlined-siren-white.svg"}
                                alt=""
                                className="w-[2.8rem]"
                            />
                        </div>

                        <div className="flex-1 overflow-hidden relative">
                            <div className="absolute top-0 left-0 z-2 h-full w-[3.2rem] bg-[linear-gradient(90deg,_black,_transparent)]" />

                            <Text.Marquee
                                speed={0.5}
                                classNameInner="gap-[3.2rem]"
                                // interaction
                            >
                                <p className="text-[1.8rem] font-normal text-white">단일 방송 최고 250만 개 달성, 다음 주인공은 당신입니다.</p>
                                <p className="text-[1.8rem] font-normal text-white">✦</p>
                                <p className="text-[1.8rem] font-normal text-white">지금 지원하고 더 빠르게 성장하세요</p>
                            </Text.Marquee>

                            <div className="absolute top-0 right-0 z-2 h-full w-[3.2rem] bg-[linear-gradient(270deg,_black,_transparent)]" />
                        </div>

                        <section className="flex items-center gap-[1.2rem] px-[1.2rem]">
                            <p className="text-white text-[1.8rem] font-bold">문의하기</p>

                            <img
                                src={"/images/icon/outlined/ico-outlined-arrow-single-up.svg"}
                                alt=""
                                className="w-[2.0rem]"
                            />
                        </section>
                    </motion.section>
                )}
            </AnimatePresence>

            <aside className="fixed right-7 bottom-[1.6rem] z-30 grid gap-4 max-[86rem]:hidden">
                {socialItems.map((item) => (
                    <a
                        className="grid h-14 w-14 place-items-center rounded-full bg-white text-sm font-black text-black shadow-[0_0.8rem_2.6rem_rgba(0,0,0,0.14)]"
                        href="/bjSupport"
                        key={item}
                    >
                        {item}
                    </a>
                ))}
                <span className="mx-auto h-px w-8 bg-neutral-500" />
                <a
                    className="grid h-16 w-16 place-items-center rounded-full bg-black text-3xl font-light text-white shadow-[0_0.8rem_2.6rem_rgba(0,0,0,0.16)]"
                    href="#home"
                >
                    ↑
                </a>
            </aside>

            <div className="z-100000 fixed bottom-[calc(50%-25dvh)] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center">
                <motion.div className="w-[0.2rem] h-[5.2rem] relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            background: "linear-gradient(180deg, transparent 0%, black 40%, black 70%, transparent 100%)",
                            // background: "linear-gradient(180deg, transparent 0%, #ff6673 40%, #ffb5c1 70%, transparent 100%)",
                        }}
                        animate={{
                            y: ["100%", "-100%"],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "easeInOut",
                        }}
                    />
                    <div className="absolute inset-0 w-full h-full pointer-events-none" />
                </motion.div>

                <img
                    src={"/images/icon/outlined/ico-outlined-arrow-single-up.svg"}
                    alt=""
                    className="rotate-180 w-[2.4rem]"
                />
            </div>
        </Fragment>
    );
};
