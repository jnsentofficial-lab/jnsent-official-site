"use client";

import { ReactNode, SelectHTMLAttributes } from "react";

type SelectOption = {
    label: string;
    value: string;
};

type SelectSize = "sm" | "md" | "lg" | "xlg";

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
    className?: string;
    icon?: ReactNode;
    iconClassName?: string;
    options: SelectOption[];
    size?: SelectSize;
    onClick?: () => void;
    wrapperClassName?: string;
};

const sizeHeights: Record<SelectSize, string> = {
    sm: "4.2rem",
    md: "5.2rem",
    lg: "5.2rem",
    xlg: "7.2rem",
};

const defaultIcon = (
    <svg
        aria-hidden="true"
        fill="none"
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
        />
    </svg>
);

const Select = ({ className = "", icon = defaultIcon, iconClassName = "", options, size = "sm", wrapperClassName = "", onClick, ...props }: SelectProps) => {
    const height = sizeHeights[size];

    return (
        <div className={`relative ${wrapperClassName}`}>
            <select
                {...props}
                className={`${className} w-full appearance-none border px-[1.2rem] cursor-pointer hover:bg-[var(--adaptive-grey100)]`}
                style={{ minHeight: "3.2rem" }}
                onClick={onClick}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            <span className={`pointer-events-none absolute right-[1.6rem] top-1/2 -translate-y-1/2 text-[var(--adaptive-black300)] ${iconClassName}`}>{icon}</span>
        </div>
    );
};

export default Select;
