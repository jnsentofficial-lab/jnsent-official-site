"use client";

import { InputHTMLAttributes, useId, useRef } from "react";

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

function formatCalendarValue(value: string, type: CalendarProps["type"]) {
    if (!value) {
        return "";
    }

    if (type === "date") {
        return value.replace(/-/g, ".");
    }

    if (type === "time") {
        return value;
    }

    return value.replace("T", " ");
}

const Calendar = ({ className = "", size = "md", type = "datetime-local", placeholder, style, value, disabled, id, ...props }: CalendarProps) => {
    const height = sizeHeights[size];
    const generatedId = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputId = id ?? generatedId;
    const displayValue = typeof value === "string" ? formatCalendarValue(value, type) : "";

    function handleOpenPicker() {
        const input = inputRef.current;

        if (!input || disabled) {
            return;
        }

        const pickerInput = input as HTMLInputElement & { showPicker?: () => void };

        if (pickerInput.showPicker) {
            pickerInput.showPicker();

            return;
        }

        input.focus();
        input.click();
    }

    return (
        <div className="relative w-full">
            <input
                {...props}
                className="pointer-events-none absolute h-px w-px opacity-0"
                disabled={disabled}
                id={inputId}
                ref={inputRef}
                type={type}
                value={value}
            />
            <button
                className={`${className} flex w-full items-center border border-[var(--adaptive-black100)] bg-white px-[1.6rem] text-left transition-colors hover:border-[var(--adaptive-black500)] disabled:cursor-not-allowed disabled:bg-[var(--adaptive-grey100)]`}
                disabled={disabled}
                onClick={handleOpenPicker}
                style={{ ...style, minHeight: height }}
                type="button"
            >
                <span className={displayValue ? "text-inherit" : "text-[var(--adaptive-grey500)]"}>
                    {displayValue || placeholder || "날짜를 선택해주세요"}
                </span>
            </button>
        </div>
    );
};

export default Calendar;
