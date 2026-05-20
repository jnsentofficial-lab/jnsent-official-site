"use client";

import { motion } from "framer-motion";

const qualifications = [
    "만 20세 이상 여성 지원 가능",
    "주 5일 / 일 최소 4시간 이상 방송 가능자 우대",
    "원하는 시간 및 요일에 방송 가능",
    "투잡 및 초보 지원 가능",
    "방송 경험이 없어도 교육 및 세팅 지원",
];
const process = [
    "지원서 제출 (하단 버튼 클릭)",
    "담당 매니저 1:1 상담 진행",
    "계약 조건 안내 및 협의",
    "방송 환경 세팅 및 교육",
    "방송 시작 및 전담 매니저 배정",
];

function RecruitCard({ title, items }: { title: string; items: string[] }) {
    return (
        <motion.article
            className="rounded-2xl border border-[#ede8e3] bg-white px-10 py-11"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
        >
            <div className="mb-7 flex items-center gap-3 border-b border-[#ede8e3] pb-5 font-serif text-lg font-medium text-[#1e1e1e]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[linear-gradient(135deg,#e8a89c,#c9a96e)]" />
                {title}
            </div>
            <ul className="flex list-none flex-col gap-3.5 p-0">
                {items.map((item) => (
                    <li className="flex items-start gap-3 text-sm leading-[1.7] text-[#555] before:mt-px before:shrink-0 before:font-semibold before:text-[#d4897b] before:content-['✓']" key={item}>
                        {item}
                    </li>
                ))}
            </ul>
        </motion.article>
    );
}

export function RecruitSection() {
    return (
        <section className="flex min-h-dvh items-center bg-[#faf8f6] py-[clamp(8rem,10vw,14rem)]">
            <div className="mx-auto w-[min(112rem,90%)]">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="mb-3 block text-[1.1rem] font-medium uppercase tracking-[0.25em] text-[#c9a96e]">Recruitment</span>
                    <span className="mb-5 block h-[0.15rem] w-12 bg-[linear-gradient(90deg,#c9a96e,#e8d5b0)]" />
                    <h2 className="font-serif text-[clamp(2.6rem,3.5vw,4.2rem)] font-normal leading-[1.45] text-[#1e1e1e]">
                        지원 자격 및
                        <br />
                        <strong className="font-semibold">모집 요강</strong>
                    </h2>
                </motion.div>
                <div className="mt-[6rem] grid gap-12 lg:grid-cols-2 max-[90rem]:grid-cols-1">
                    <RecruitCard items={qualifications} title="지원 자격" />
                    <RecruitCard items={process} title="지원 절차" />
                    <motion.div
                        className="grid gap-8 rounded-2xl border border-[#e8a89c]/30 bg-[linear-gradient(135deg,#f7ede9_0%,#f5f0eb_100%)] px-12 py-11 lg:col-span-2 lg:grid-cols-[1fr_auto] lg:items-center max-[56rem]:text-center"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <div className="font-serif text-[clamp(1.8rem,2vw,2.4rem)] font-normal leading-[1.6] text-[#1e1e1e]">
                            경험이 없어도 괜찮습니다.
                            <br />
                            <strong className="text-[#d4897b]">제이엔에스가 처음부터 함께합니다.</strong>
                        </div>
                        <a className="inline-flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#e8a89c_0%,#d4897b_100%)] px-9 py-4 text-sm font-medium tracking-[0.04em] text-white shadow-[0_0.8rem_2.8rem_rgba(212,137,123,0.35)] transition hover:-translate-y-0.5" href="#cta">
                            지금 지원하기 →
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
