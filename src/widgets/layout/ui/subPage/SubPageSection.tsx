"use client";

import type { ReactNode } from "react";

type SubPageSectionProps = {
    title: string;
    className?: string;
    children?: ReactNode;
};

export function SubPageSection({ title, className, children }: SubPageSectionProps) {
    return (
        <section
            className="flex flex-col mobile:gap-[1.2rem] pc:gap-[3.2rem]"
            data-report-id={`서브페이지 섹션 ${title}`}
            data-report-type="group"
        >
            <h2
                className={`${className} flex items-center whitespace-break-spaces gap-[1.2rem] mobile:text-[2rem] pc:text-[2.4rem] font-[900] font-[NanumSquare] text-black leading-[1.5]`}
                data-report-id={`서브페이지 섹션 제목 ${title}`}
                data-report-type="item"
            >
                {title}
            </h2>

            {children}
        </section>
    );
}

export const DottedItem = ({ children }: { children: ReactNode }) => {
    return (
        <div className="relative ml-[1.6rem] leading-[1.5] mobile:text-[1.4rem] pc:text-[1.6rem]">
            <div className="absolute top-[0.8rem] left-[-1.2rem] w-[0.4rem] h-[0.4rem] bg-black rounded-full" />

            {children}
        </div>
    );
};
