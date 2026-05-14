"use client";

import { motion } from "framer-motion";

const cautionItems = [
    "과도한 수익 보장을 약속하는 업체",
    "장기 계약을 강요하거나 위약금 조항이 불명확한 업체",
    "계약서 없이 구두 약속만으로 진행하는 업체",
    "초기 비용 또는 장비 구매를 강요하는 업체",
    "수익 배분 구조가 불투명한 업체",
];
const promiseItems = [
    "모든 계약은 서면으로 진행하며 계약서를 반드시 제공합니다",
    "수익 배분 구조를 투명하게 공개합니다",
    "강제 장기 계약 없이 합리적인 조건으로 운영합니다",
    "초기 비용 없이 방송 시작이 가능합니다",
    "언제든지 궁금한 점을 담당 매니저에게 문의할 수 있습니다",
];

function NoticeBox({ accent, title, items }: { accent: "gold" | "rose"; title: string; items: string[] }) {
    const isRose = accent === "rose";

    return (
        <div className={`mt-12 rounded-r-xl border border-[#ede8e3] border-l-4 bg-[#faf8f6] px-11 py-10 ${isRose ? "border-l-[#d4897b]" : "border-l-[#c9a96e]"}`}>
            <div className={`mb-5 flex items-center gap-2.5 text-[1.5rem] font-semibold ${isRose ? "text-[#d4897b]" : "text-[#a8874a]"}`}>{title}</div>
            <ul className="flex list-none flex-col gap-3.5 p-0">
                {items.map((item) => (
                    <li className="flex items-start gap-3 text-sm leading-[1.8] text-[#555] before:shrink-0 before:text-xl before:leading-[1.4] before:text-[#c9a96e] before:content-['·']" key={item}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function NoticeSection() {
    return (
        <section className="flex min-h-dvh items-center bg-white py-[clamp(8rem,10vw,14rem)]">
            <div className="mx-auto w-[min(112rem,90%)]">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="mb-3 block text-[1.1rem] font-medium uppercase tracking-[0.25em] text-[#c9a96e]">Important Notice</span>
                    <span className="mb-5 block h-[0.15rem] w-12 bg-[linear-gradient(90deg,#c9a96e,#e8d5b0)]" />
                    <h2 className="font-serif text-[clamp(2.6rem,3.5vw,4.2rem)] font-normal leading-[1.45] text-[#1e1e1e]">
                        지원 전 꼭 확인하세요
                        <br />
                        <strong className="font-semibold">예비 BJ를 위한 주의사항</strong>
                    </h2>
                    <p className="mt-5 max-w-[60rem] text-[clamp(1.4rem,1.5vw,1.6rem)] leading-[1.9] text-[#555]">
                        신뢰할 수 있는 파트너를 선택하는 것이 무엇보다 중요합니다. 아래 내용을 꼭 확인하시고 현명한 선택을 하시기 바랍니다.
                    </p>
                </motion.div>
                <motion.div
                    className="grid gap-6 lg:grid-cols-2 max-[90rem]:grid-cols-1"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <NoticeBox accent="gold" items={cautionItems} title="⚠️ 이런 업체는 주의하세요" />
                    <NoticeBox accent="rose" items={promiseItems} title="✅ JNS의 약속" />
                </motion.div>
            </div>
        </section>
    );
}
