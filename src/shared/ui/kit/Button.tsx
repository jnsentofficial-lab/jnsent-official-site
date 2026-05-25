"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ButtonProps } from "../model/ui-props";

// Size type and sizeHeights from Input.tsx
type ButtonSize = "sm" | "md" | "lg" | "xlg";
const sizeHeights: Record<ButtonSize, string> = {
    sm: "4.2rem",
    md: "5.2rem",
    lg: "5.2rem",
    xlg: "7.2rem",
};

export const Button = ({
    children,
    className,
    type = "button",
    defaultHover = false,
    disabled = false,
    disabledMsg,
    rippleColor = "#ffffff",
    ref,
    ariaLabel = "button",
    desc_no,
    defaultValue,
    size = "md",
    onClick,
    onHoverStart,
    onHoverEnd,
    onPointerDown,
    tooltip = [],
}: ButtonProps & {
    size?: ButtonSize;
    tooltip?: {
        type: "active" | "disabled";
        msg: string;
        direction?: "left" | "right" | "top" | "bottom";
        align?: "left" | "right" | "center";
    }[];
}) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
    const [isHovered, setIsHovered] = useState(false);

    const message = disabled ? tooltip?.find((t) => t.type === "disabled")?.msg : tooltip?.find((t) => t.type === "active")?.msg;
    const align = disabled ? tooltip?.find((t) => t.type === "disabled")?.align : tooltip?.find((t) => t.type === "active")?.align;
    const direction = disabled ? tooltip?.find((t) => t.type === "disabled")?.direction : tooltip?.find((t) => t.type === "active")?.direction;

    const getDirectionStyle = (t: "left" | "right" | "top" | "bottom") => {
        switch (t) {
            case "top":
                return "bottom-full";
            case "bottom":
                return "";
            default:
                return "bottom-full";
        }
    };

    const height = sizeHeights[size];

    return (
        <motion.button
            type={type}
            ref={ref}
            value={defaultValue ?? ""}
            onClick={(e) => {
                if (disabled) {
                    return null;
                }

                if (onClick) onClick(e);
            }}
            onPointerDown={onPointerDown}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                ${className}
                ${isHovered && message ? "" : "overflow-hidden"}
                relative transition-colors cursor-pointer
                ${defaultHover ? "brightness-100 hover:brightness-50 transition-colors duration-200" : ""}
            `}
            style={{ minHeight: height }}
            whileTap={{ scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                mass: 0.5,
            }}
            aria-label={ariaLabel}
        >
            {disabled ? <div className="opacity-50 w-[inherit] h-[inherit] flex justify-center items-center">{children}</div> : children}

            <AnimatePresence mode="popLayout">
                {isHovered && tooltip.length && message && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`${getDirectionStyle(direction ?? "top")} flex items-center gap-[0.4rem] w-max pointer-events-none absolute left-1/2 z-20 mb-2 -translate-x-1/2 p-[0.8rem_1.2rem] rounded-[1.2rem] border border-[var(--color-gray-700)] bg-[var(--color-gray-800)] shadow-[0_1rem_2rem_0_#9da9ae50] whitespace-pre`}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                            mass: 0.1,
                        }}
                    >
                        <p>{message}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
