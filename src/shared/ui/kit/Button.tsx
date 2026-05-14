"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ButtonProps } from "../model/ui-props";

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
    onClick,
    onHoverStart,
    onHoverEnd,
    onPointerDown,
    tooltip = [],
}: ButtonProps & {
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
            className={`${className} ${isHovered && message ? "" : "overflow-hidden"} relative transition-colors ${defaultHover ? "brightness-100 hover:brightness-50 transition-colors duration-200" : ""}`}
            whileTap={{ scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                mass: 0.5,
            }}
            aria-label={ariaLabel}
        >
            {/* {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none w-full h-full z-10 rounded-[50%] blur-[1rem]"
          style={{
            left: `calc(${ripple.x}px - 50%)`,
            top: `calc(${ripple.y}px - 50%)`,
            background: `radial-gradient(circle, ${rippleColor}00 0%, ${rippleColor} 50%, ${rippleColor}00 70%)`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      ))} */}

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
                        {/* <Icon
                            type="filled-info"
                            alt=""
                            className="invert brightness-0 opacity-60"
                            width={18}
                        />
                        <TextShimmer
                            as="p"
                            duration={4}
                            color={{
                                start: "#ffffff",
                                end: "#ffffff70",
                            }}
                            className={`${align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center"} text-[1.4rem] font-bold leading-[1.5]`}
                        >
                            {message}
                        </TextShimmer> */}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
