"use client";

import { InputHTMLAttributes } from "react";

type CalendarSize = "sm" | "md" | "lg" | "xlg";

type CalendarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    className?: string;
    size?: CalendarSize;
};

const sizeHeights: Record<CalendarSize, string> = {
    sm: "4.2rem",
    md: "5.2rem",
    lg: "5.2rem",
    xlg: "7.2rem",
};

const Calendar = ({ className = "", size = "md", type = "datetime-local", ...props }: CalendarProps) => {
    const height = sizeHeights[size];

    return (
        <input
            {...props}
            className={`${className} border border-[var(--adaptive-black100)] bg-white px-[1.6rem] transition-colors hover:border-[var(--adaptive-black500)]`}
            style={{ minHeight: height }}
            type={type}
        />
    );
};

export default Calendar;
