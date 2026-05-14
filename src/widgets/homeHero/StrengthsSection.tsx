"use client";

import { motion } from "framer-motion";

const strengths = [
    { icon: "📋", title: "공정 계약 운영", desc: "불공정 조항 없는 투명한 계약 구조. 최대 10:0 계약 조건으로 파트너의 수익을 최우선으로 생각합니다." },
    { icon: "👩‍💼", title: "전담 매니저 배정", desc: "1:1 전담 매니저가 방송 방향성 설계, 일정 관리, 성장 전략을 함께 고민합니다." },
    { icon: "🎙️", title: "장비 & 스튜디오 지원", desc: "방송용 PC, 마이크, 조명, 캠, 오디오 인터페이스 지원. 사내 스튜디오 이용도 가능합니다." },
    { icon: "🌐", title: "플랫폼 직속 운영", desc: "플랫폼과의 직속 관계를 통해 더 빠르고 안정적인 방송 환경과 지원을 받을 수 있습니다." },
    { icon: "📈", title: "크루 방송 운영", desc: "자체 크루 및 엑셀 방송 운영으로 개인 방송 외에도 다양한 수익 창출 기회를 제공합니다." },
    { icon: "🎓", title: "초보자 교육 지원", desc: "방송 경험이 전혀 없어도 괜찮습니다. 방송 세팅부터 콘텐츠 기획까지 체계적인 교육을 제공합니다." },
    { icon: "🤝", title: "120명+ BJ 네트워크", desc: "협력 포함 120명 이상의 BJ 네트워크를 통해 다양한 협업과 성장 기회를 경험할 수 있습니다." },
    { icon: "💻", title: "원격 세팅 지원", desc: "직접 방문이 어려운 경우에도 원격으로 방송 환경 세팅 및 프로그램 설치를 지원합니다." },
];

export function StrengthsSection() {
    return (
        <section className="flex min-h-dvh items-center bg-[#faf8f6] py-[clamp(8rem,10vw,14rem)]">
            <div className="mx-auto w-[min(112rem,90%)]">
                <motion.div
                    className="mb-[7.2rem] text-center"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="mb-3 block text-[1.1rem] font-medium uppercase tracking-[0.25em] text-[#c9a96e]">Why JNS</span>
                    <span className="mx-auto mb-5 block h-[0.15rem] w-12 bg-[linear-gradient(90deg,#c9a96e,#e8d5b0)]" />
                    <h2 className="font-serif text-[clamp(2.6rem,3.5vw,4.2rem)] font-normal leading-[1.45] text-[#1e1e1e]">JNS와 함께해야 하는 이유</h2>
                    <p className="mx-auto mt-5 max-w-[52rem] text-[clamp(1.4rem,1.5vw,1.6rem)] leading-[1.9] text-[#555]">
                        단순한 소속사가 아닙니다. 방송 시작부터 성장까지 모든 단계를 함께하는 파트너입니다.
                    </p>
                </motion.div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {strengths.map((item, index) => (
                        <motion.article
                            className="rounded-xl border border-[#ede8e3] bg-white px-7 py-9 transition hover:-translate-y-1.5 hover:shadow-[0_1.6rem_4.8rem_rgba(0,0,0,0.07)]"
                            key={item.title}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.65, delay: (index % 4) * 0.08 }}
                        >
                            <div className="mb-5 flex h-[5.2rem] w-[5.2rem] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,#f7ede9,#f5f0eb)] text-[2.2rem]">{item.icon}</div>
                            <div className="mb-2.5 text-[1.5rem] font-semibold leading-[1.5] text-[#1e1e1e]">{item.title}</div>
                            <p className="m-0 text-[1.3rem] leading-[1.8] text-[#555]">{item.desc}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
