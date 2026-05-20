"use client";

import { motion } from "framer-motion";

const proofCards = [
    { icon: "▣", title: "실제 10:0 계약서", text: "일부 업체의 허위 홍보와 다릅니다. 실제 계약 사례와 계약서를 즉시 대조해드립니다." },
    { icon: "☑", title: "부가세 신고 자료", text: "운영 규모를 속이지 않습니다. 세무 자료 기반으로 투명한 운영 수치를 공개합니다." },
    { icon: "◌", title: "허위 사실 보상제", text: "안내드린 내용이 사실과 다를 경우 공식적인 보상 절차를 진행합니다." },
];

export function TransparencyProof() {
    return (
        <section className="relative min-h-[92rem] overflow-hidden bg-black py-[18rem] text-white max-[86rem]:py-24">
            <div className="absolute inset-0 bg-[url('/images/landing/meeting.webp')] bg-cover bg-center opacity-55" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/35" />
            <div className="relative z-[1] mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                <motion.div
                    className="max-w-[70rem]"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="m-0 text-5xl font-black leading-[1.25] max-[86rem]:text-4xl">
                        모든 데이터는 공개될 수 있을 때
                        <br />
                        <span className="text-[#ff6673]">진짜</span>가 됩니다.
                    </h2>
                    <p className="mt-8 text-2xl leading-[1.65] text-white/85 max-[86rem]:text-lg">
                        제이엔에스는 말이 아닌, 실제 운영 데이터로 증명합니다.
                        <br />
                        초보 BJ분들도 안심하고 시작할 수 있는 투명한 환경을 약속드립니다.
                    </p>
                </motion.div>
                <div className="mt-24 grid gap-6 md:grid-cols-3">
                    {proofCards.map((item, index) => (
                        <motion.article
                            className="min-h-[22rem] rounded-[2.4rem] border border-white/10 bg-black/35 p-8 backdrop-blur-xl"
                            initial={{ opacity: 0, y: 32 }}
                            key={item.title}
                            transition={{ delay: index * 0.08, duration: 0.65 }}
                            viewport={{ once: true, amount: 0.2 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <span className="text-4xl text-[#ff6673]">{item.icon}</span>
                            <h3 className="mt-7 mb-5 text-2xl font-black">{item.title}</h3>
                            <p className="m-0 text-base leading-[1.75] text-white/70">{item.text}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
