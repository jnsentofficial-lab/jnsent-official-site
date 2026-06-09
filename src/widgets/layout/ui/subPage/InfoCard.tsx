"use client";

import { FormEvent, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, PanInfo, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";

type InfoCardProps = {
    title: string;
    className?: string;
    children?: ReactNode;
};
export function InfoCard({ title, children }: InfoCardProps) {
    return (
        <article
            className="rounded-[2.4rem] bg-[var(--adaptive-black50)] p-[1.2rem_2.4rem] flex flex-col gap-[1.2rem]"
            data-report-id={`정보 카드 ${title}`}
            data-report-type="item"
        >
            <h3 className="text-[2.0rem] font-[700] text-black">{title}</h3>
            <div className="text-[1.6rem] leading-[1.5] text-[var(--adaptive-black300)]">{children}</div>
        </article>
    );
}
