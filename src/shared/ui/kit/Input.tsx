import React, { InputHTMLAttributes } from "react";

type InputSize = "sm" | "md" | "lg" | "xlg";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    className?: string;
    name: string;
    placeholder: string;
    size?: InputSize;
}

const sizeHeights: Record<InputSize, string> = {
    sm: "2.4rem",
    md: "5.2rem",
    lg: "5.2rem",
    xlg: "7.2rem",
};

const Input = ({ className = "", name, placeholder, type, size = "md", ...props }: InputProps) => {
    const height = sizeHeights[size];

    return (
        <input
            {...props}
            className={`${className} rounded-[1.4rem] border border-[var(--adaptive-black100)] hover:border-[var(--adaptive-black500)] px-[1.6rem] transition-colors`}
            name={name}
            placeholder={placeholder}
            type={type}
            style={{ minHeight: height }}
        />
    );
};

export default Input;
