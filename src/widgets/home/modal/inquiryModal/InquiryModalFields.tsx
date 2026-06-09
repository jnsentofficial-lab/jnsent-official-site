"use client";

import { type InputHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import UI from "@/shared/ui/UIComponent";
import { selectedOptionClass, unselectedOptionClass } from "@/widgets/home/modal/inquiryModal/constants";

export function FormField({ label, children, delay = 1, error }: { label: string; children: ReactNode; delay: number; error?: string }) {
    return (
        <motion.div
            className="flex flex-col gap-[0.8rem]"
            initial={{ opacity: 0, transform: "translateY(100px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(100px)" }}
            transition={{
                delay: 0.05 * delay,
                type: "spring",
                mass: 0.1,
                stiffness: 100,
                damping: 10,
            }}
        >
            <label className="text-[1.6rem] font-bold text-black font-[NanumSquare]">{label}</label>
            {children}
            {error ? (
                <p
                    className="m-0 -mt-[0.4rem] text-[1.4rem] font-medium text-[#FF4B8B]"
                    role="alert"
                >
                    {error}
                </p>
            ) : null}
        </motion.div>
    );
}

export function TextInput({ className = "", hasError = false, ...props }: InputHTMLAttributes<HTMLInputElement> & { className?: string; hasError?: boolean }) {
    return (
        <input
            {...props}
            className={`h-[5.2rem] w-full rounded-[1.6rem] border bg-white px-[1.6rem] text-[1.6rem] font-medium text-black outline-none transition-colors placeholder:text-[#BBBBBB] focus:border-[#FF4B8B] ${
                hasError ? "border-[#FF4B8B]" : "border-[#E5E5E5]"
            } ${className}`}
        />
    );
}

export function SelectInput({ className = "", hasError = false, options, ...props }: React.ComponentProps<typeof UI.Select> & { hasError?: boolean }) {
    return (
        <UI.Select
            {...props}
            className={`rounded-[1.6rem] border bg-white px-[1.6rem] text-[1.6rem] font-medium text-black outline-none transition-colors disabled:bg-[#f7f7f7] ${
                hasError ? "border-[#FF4B8B]" : "border-[#E5E5E5]"
            } ${className}`}
            options={options}
            size="md"
        />
    );
}

export function OptionButton({ children, selected, onClick, className = "" }: { children: ReactNode; selected: boolean; onClick: () => void; className?: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`h-[5.2rem] rounded-[1.6rem] border text-[1.6rem] font-bold transition-colors ${selected ? selectedOptionClass : unselectedOptionClass} ${className}`}
        >
            {children}
        </button>
    );
}