"use client";

import { FormEvent, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, PanInfo, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";

type SubPageSplitProps = {
    left: ReactNode;
    right: ReactNode;
    className?: string;
    leftTabLabel?: ReactNode;
    rightTabLabel?: ReactNode;
};
export function SubPageSplit({ left, right, className = "", leftTabLabel = "좌측", rightTabLabel = "우측" }: SubPageSplitProps) {
    const [mobileTab, setMobileTab] = useState<"left" | "right">("left");

    const IS_LEFT_SIDE_VIEW = mobileTab === "left";

    return (
        <section
            className={`mx-[1.6rem] pb-[14rem] mobile:pb-24 ${className}`}
            data-report-id="서브페이지 분할 섹션"
            data-report-type="group"
        >
            <div className="mx-auto grid max-w-[var(--size-pc)] w-full grid-cols-4 gap-[5.2rem] max-[86rem]:grid-cols-1">
                {/* <div
                    className="shadow-[0_0_100px_0_var(--adaptive-grey900)] overflow-hidden pc:hidden mobile:flex col-span-4 rounded-full bg-[var(--adaptive-black50)] p-[0.4rem] fixed bottom-[2.4rem] left-[50%] transform translate-x-[-50%] w-[calc(100%-(1.6rem*2))] z-[100] max-w-[var(--size-mobile)]"
                    // className="hidden max-[86rem]:flex col-span-4 rounded-[1.6rem] bg-[var(--adaptive-black50)] p-[0.4rem]"
                    data-report-id="서브페이지 모바일 탭"
                    data-report-type="group"
                > */}
                <button
                    type="button"
                    className={`mobile:fixed pc:hidden flex-1 rounded-full flex items-center gap-[0.4rem] ${IS_LEFT_SIDE_VIEW ? "flex-row" : "flex-row-reverse"} px-[2.0rem] py-[1.2rem] text-[1.6rem] font-[700] transition-colors fixed bottom-[2.4rem] right-[2.4rem] ${IS_LEFT_SIDE_VIEW ? "bg-[var(--adaptive-blue300)]" : "bg-[var(--adaptive-grey500)]"} z-[1000] text-white shadow-[0_0_100px_0_var(--adaptive-grey900)]`}
                    onClick={() => {
                        setMobileTab(IS_LEFT_SIDE_VIEW ? "right" : "left");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    data-report-id="서브페이지 모바일 좌측 탭"
                    data-report-type="item"
                >
                    {IS_LEFT_SIDE_VIEW ? rightTabLabel : "이전으로"}
                    <Image
                        src={"/images/icon/outlined/ico-outlined-arrow-right.svg"}
                        alt=""
                        width={20}
                        height={20}
                        className={`${IS_LEFT_SIDE_VIEW ? "" : "rotate-180"} invert brightness-0`}
                    />
                </button>

                <motion.div
                    className={`col-span-2 ${mobileTab === "right" ? "max-[86rem]:hidden" : ""}`}
                    data-report-id="서브페이지 좌측 영역"
                    data-report-type="item"
                    initial={{ opacity: 0, transform: "translateY(100px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(100px)" }}
                    transition={{
                        delay: 0.4,
                        type: "spring",
                        mass: 0.1,
                        stiffness: 100,
                        damping: 10,
                    }}
                >
                    {left}
                </motion.div>

                <motion.div
                    className={`col-span-2 ${mobileTab === "left" ? "max-[86rem]:hidden" : ""}`}
                    data-report-id="서브페이지 우측 영역"
                    data-report-type="item"
                    initial={{ opacity: 0, transform: "translateY(100px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(100px)" }}
                    transition={{
                        delay: 0.5,
                        type: "spring",
                        mass: 0.1,
                        stiffness: 100,
                        damping: 10,
                    }}
                >
                    {right}
                </motion.div>
            </div>
        </section>
    );
}
