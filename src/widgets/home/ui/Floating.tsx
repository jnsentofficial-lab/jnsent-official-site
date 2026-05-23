import Text from "@/shared/ui/reveal";
import React, { Fragment } from "react";

export const Floating = () => {
    return (
        <Fragment>
            <section className="fixed bottom-[1.6rem] left-[50%] transform translate-x-[-50%] bg-black h-[7.2rem] flex items-center rounded-full p-[0.4rem] max-w-[var(--size-pc)] w-full">
                <p className="rounded-full text-white px-[2.4rem] py-1 whitespace-nowrap">공지사항</p>

                <div className="flex-1 overflow-hidden relative">
                    <div className="absolute top-0 left-0 z-2 h-full w-[2.4rem] bg-[linear-gradient(90deg,_black,_transparent)]" />

                    <Text.Marquee speed={0.5}>
                        <p className=" text-white">단일 방송 최고 250만 개 달성, 다음 주인공은 당신입니다.</p>
                        <p className="text-white">✦</p>
                        <p className=" text-white">지금 지원하고 더 빠르게 성장하세요</p>
                    </Text.Marquee>

                    <div className="absolute top-0 right-0 z-2 h-full w-[2.4rem] bg-[linear-gradient(270deg,_black,_transparent)]" />
                </div>

                <p className="border-l border-white/20 px-[2.4rem] text-[#ff6673] max-[86rem]:border-l-0 max-[86rem]:pl-0">문의하기 ↑</p>
            </section>
        </Fragment>
    );
};
