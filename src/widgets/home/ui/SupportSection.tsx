"use client";

import { motion } from "framer-motion";

const supportItems = [
    { num: "01", text: "방송 장비 세팅", desc: "방송용 PC, 마이크, 조명, 캠, 오디오 인터페이스 지원" },
    { num: "02", text: "원격 세팅 지원", desc: "방송 프로그램 설치 및 원격 환경 구성 가능" },
    { num: "03", text: "방송 컨설팅", desc: "콘텐츠 방향성 및 방송 환경 전반에 대한 1:1 컨설팅" },
    { num: "04", text: "사내 스튜디오", desc: "고성능 방송 장비를 갖춘 사내 스튜디오 이용 가능" },
];

export function SupportSection() {
    return (
        <section className="flex min-h-dvh items-center bg-white py-[clamp(8rem,10vw,14rem)]">
            <div className="mx-auto w-[min(112rem,90%)]">
                <div className="grid items-center gap-20 lg:grid-cols-2 max-[90rem]:gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="mb-3 block text-[1.1rem] font-medium uppercase tracking-[0.25em] text-[#c9a96e]">Broadcast Support</span>
                        <span className="mb-5 block h-[0.15rem] w-12 bg-[linear-gradient(90deg,#c9a96e,#e8d5b0)]" />
                        <h2 className="font-serif text-[clamp(2.6rem,3.5vw,4.2rem)] font-normal leading-[1.45] text-[#1e1e1e]">
                            방송 시작에 필요한
                            <br />
                            <strong className="font-semibold">모든 것을 지원합니다</strong>
                        </h2>
                        <p className="mt-5 text-[clamp(1.4rem,1.5vw,1.6rem)] leading-[1.9] text-[#555]">
                            장비가 없어도, 공간이 없어도, 경험이 없어도 괜찮습니다. 제이엔에스는 방송 시작에 필요한 모든 환경을 함께 준비해드립니다.
                        </p>
                        <ul className="mt-9 flex list-none flex-col p-0">
                            {supportItems.map((item, index) => (
                                <li className={`flex items-center gap-5 border-b border-[#ede8e3] py-5 ${index === 0 ? "border-t" : ""}`} key={item.num}>
                                    <span className="w-6 shrink-0 font-serif text-[1.3rem] font-medium text-[#c9a96e]">{item.num}</span>
                                    <span className="text-sm leading-[1.6] text-[#555]">
                                        <strong className="font-semibold text-[#1e1e1e]">{item.text}</strong> — {item.desc}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        className="min-h-[52rem] rounded bg-[linear-gradient(135deg,#e8d5b0_0%,#f7ede9_45%,#faf8f6_100%)] p-8 shadow-[0_2rem_7rem_rgba(0,0,0,0.06)]"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <div className="h-full rounded-sm border border-white/70 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.85),transparent_18%),linear-gradient(160deg,rgba(255,255,255,0.28),rgba(255,255,255,0.06))]" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
