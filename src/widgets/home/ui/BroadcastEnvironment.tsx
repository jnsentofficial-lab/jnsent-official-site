"use client";

import { motion } from "framer-motion";

const supportItems = [
    { title: "고성능 장비", text: "PC, 마이크, 조명, 캠, 오디오 인터페이스 풀세팅 지원" },
    { title: "기술 지원", text: "디자인 작업, 원격 세팅 및 방송 프로그램 최적화 지원" },
    { title: "공간 지원", text: "사내 스튜디오 및 실제 운영 공간 제공" },
];

export function BroadcastEnvironment() {
    return (
        <section className="grid min-h-[86rem] grid-cols-2 bg-white max-[86rem]:grid-cols-1">
            <motion.div
                className="flex items-center justify-center px-10 py-24 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7 }}
            >
                <div className="max-w-[52rem]">
                    <h2 className="m-0 text-5xl font-black leading-[1.3] max-[86rem]:text-4xl">
                        최상의 결과는
                        <br />
                        <span className="text-[#ff6673]">최상의 환경</span>에서 시작됩니다
                    </h2>
                    <div className="mt-14 grid gap-9">
                        {supportItems.map((item) => (
                            <div key={item.title}>
                                <strong className="block text-2xl font-black">{item.title}</strong>
                                <span className="mt-2 block text-base font-semibold text-neutral-700">{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-12 text-sm leading-[1.7] text-neutral-400">* 온라인 이미지만 속지 마세요. 실제 방송 환경을 직접 눈으로 확인하실 수 있습니다.</p>
                </div>
            </motion.div>
            <div className="min-h-[64rem] bg-[url('/images/landing/studioDesk.webp')] bg-cover bg-center" />
        </section>
    );
}
