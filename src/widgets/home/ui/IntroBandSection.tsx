"use client";

import { motion } from "framer-motion";

const marqueeItems = [
    "플랫폼 직속 엔터테인먼트",
    "초보 BJ 환영",
    "전담 매니저 배정",
    "고성능 방송 장비 지원",
    "공정 계약 운영",
    "사내 스튜디오 이용 가능",
    "플랫폼 신기록 보유",
    "투잡·초보 지원 가능",
];

export function IntroBandSection() {
    const items = [...marqueeItems, ...marqueeItems];

    return (
        <section className="overflow-hidden bg-[linear-gradient(135deg,#f7ede9_0%,#f5f0eb_100%)] py-9">
            <motion.div
                className="flex w-max gap-12 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            >
                {items.map((item, index) => (
                    <span className="inline-flex items-center gap-4 text-[1.3rem] font-medium uppercase tracking-[0.12em] text-[#d4897b] after:text-[1rem] after:text-[#c9a96e] after:content-['✦']" key={`${item}-${index}`}>
                        {item}
                    </span>
                ))}
            </motion.div>
        </section>
    );
}
