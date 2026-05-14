import type { Variants } from "framer-motion";

export const defaultTransition = {
    duration: 0.35,
    ease: [0.22, 1, 0.36, 1],
} as const;

export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 16,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: defaultTransition,
    },
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};
