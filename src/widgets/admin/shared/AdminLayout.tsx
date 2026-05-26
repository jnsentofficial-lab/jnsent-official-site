"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { useLayoutStore } from "@/shared/stores/useLayoutStore";
import UI from "@/shared/ui/UIComponent";
import { AdminPanelKey, useAdminSidePanelStore } from "@/widgets/admin/shared/model/useAdminSidePanelStore";
import Image from "next/image";

type AdminWorkspaceProps = {
    // current?: string;
    // title?: string;
    // action?: ReactNode;
    children: ReactNode;
};

type AdminTwoPanelProps = {
    panelKey: AdminPanelKey;
    current: string;
    title: string;
    action?: ReactNode;
    left: ReactNode;
    right?: ReactNode;
};

type AdminPaginationProps = {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
};

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    description: string;
    targetLabel?: string;
    confirmLabel: string;
    tone?: "create" | "delete";
    onCancel: () => void;
    onConfirm: () => void;
};

type AdminEmptyStateProps = {
    message: string;
};

type AdminSidePanelProps = {
    title: string;
    description?: string;
    children: ReactNode;
};

export function AdminWorkspace({ children }: AdminWorkspaceProps) {
    return (
        <article className="h-[100dvh] bg-[#F9F9F9]">
            <div className="mx-auto h-full flex flex-col gap-[5.2rem]">{children}</div>
            {/* <div className="mx-auto min-w-[var(--size-pc)] h-full flex flex-col gap-[5.2rem]">{children}</div> */}
        </article>
    );
}

export function AdminTwoPanel({ panelKey, current, title, action, left, right }: AdminTwoPanelProps) {
    const sidePanelOpenState = useAdminSidePanelStore((state) => state.openedPanels[panelKey]);
    const closePanel = useAdminSidePanelStore((state) => state.closePanel);
    const isMobileNavOpen = useLayoutStore((state) => state.isMobileNavOpen);
    const setIsMobileNavOpen = useLayoutStore((state) => state.setIsMobileNavOpen);

    return (
        <div className={`grid mobile:grid-cols-1 ${sidePanelOpenState ? "pc:grid-cols-2" : "pc:grid-cols-1"} h-full`}>
            <section className="flex flex-col h-[100dvh] overflow-auto">
                <section className="flex justify-between items-center gap-[1.6rem] mobile:p-[1.6rem] pc:p-[5.2rem]">
                    <div className="flex flex-col gap-[1.6rem]">
                        <section className="flex items-center gap-[0.4rem]">
                            <h6 className="text-[1.8rem] font-[700] text-[var(--adaptive-black300)]">메인</h6>

                            <Image
                                src={"/images/icon/outlined/ico-outlined-arrow-right.svg"}
                                alt=""
                                width={28}
                                height={28}
                            />

                            <h6 className="text-[1.8rem] font-[700]">{current}</h6>
                        </section>

                        <h1 className="text-[3.2rem]">{title}</h1>
                    </div>

                    <div className="flex items-center gap-[1.2rem]">
                        {action}
                        <UI.Button
                            className="bg-transparent px-0 text-[2.8rem] leading-none pc:hidden"
                            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                            type="button"
                        >
                            {isMobileNavOpen ? "×" : "☰"}
                        </UI.Button>
                    </div>
                </section>

                {left}
            </section>

            {sidePanelOpenState ? (
                <aside className="bg-white h-[100dvh] overflow-auto mobile:absolute mobile:left-0 mobile:top-0 mobile:w-full pc:w-auto pc:relative">
                    <div className="absolute top-[5.2rem] right-[5.2rem] z-10 px-[1.4rem] rounded-full bg-[var(--adaptive-black100)]">
                        <UI.Button
                            // className="bg-transparent px-0 text-[1.6rem] text-[var(--adaptive-black400)] hover:text-[var(--adaptive-red500)]"
                            className="text-[3.2rem] text-[var(--adaptive-black300)] font-[300]"
                            onClick={() => closePanel(panelKey)}
                            type="button"
                        >
                            ×
                        </UI.Button>
                    </div>

                    {right}
                </aside>
            ) : null}
        </div>
    );
}

export function AdminPagination({ page, totalPages, onChange }: AdminPaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-center gap-[3.2rem]">
            <button
                className="border border-[var(--adaptive-black500)] w-[3.2rem] h-[3.2rem] text-[2.4rem] flex justify-center items-center cursor-pointer"
                disabled={page === 1}
                onClick={() => onChange(Math.max(1, page - 1))}
                type="button"
            >
                ‹
            </button>

            <section className="flex items-center gap-[1.6rem]">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        className={`${page === index + 1 ? "border-black text-black" : "border-transparent text-[var(--adaptive-grey500)]"} border-b-2 text-[2.0rem] cursor-pointer`}
                        key={index}
                        onClick={() => onChange(index + 1)}
                        type="button"
                    >
                        {index + 1}
                    </button>
                ))}
            </section>

            <button
                className="border border-[var(--adaptive-black500)] w-[3.2rem] h-[3.2rem] text-[2.4rem] flex justify-center items-center cursor-pointer"
                disabled={page === totalPages}
                onClick={() => onChange(Math.min(totalPages, page + 1))}
                type="button"
            >
                ›
            </button>
        </div>
    );
}

export function AdminEmptyState({ message }: AdminEmptyStateProps) {
    return <p className="m-0 text-2xl font-[700] text-[var(--adaptive-grey500)]">{message}</p>;
}

export function AdminSidePanel({ title, description, children }: AdminSidePanelProps) {
    return (
        <section className="flex flex-col gap-[5.2rem] mobile:p-[1.6rem] pc:p-[5.2rem]">
            <h2 className="text-[3.2rem]">{title}</h2>

            {children}
        </section>
    );
}

export function ConfirmDialog({ open, title, description, targetLabel, confirmLabel, tone = "create", onCancel, onConfirm }: ConfirmDialogProps) {
    // if (!open) {
    //     return null;
    // }

    return (
        <AnimatePresence mode="popLayout">
            {open ? (
                <motion.div
                    className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-6 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        delay: 0.1,
                        type: "spring",
                        mass: 0.1,
                        stiffness: 100,
                        damping: 10,
                    }}
                >
                    <motion.div
                        className="w-[min(42rem,100%)] bg-white shadow-[0_2rem_6rem_rgba(0,0,0,0.2)] overflow-hidden"
                        initial={{ opacity: 0, transform: "translateY(100px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        // exit={{ opacity: 0, transform: "translateY(100px)" }}
                        transition={{
                            delay: 0.1,
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10,
                        }}
                    >
                        {/* 헤더 */}
                        <motion.section
                            className="p-[2.4rem] flex flex-col gap-[1.6rem]"
                            initial={{ opacity: 0, transform: "translateY(100px)" }}
                            animate={{ opacity: 1, transform: "translateY(0px)" }}
                            // exit={{ opacity: 0, transform: "translateY(100px)" }}
                            transition={{
                                delay: 0.1,
                                type: "spring",
                                mass: 0.1,
                                stiffness: 100,
                                damping: 10,
                            }}
                        >
                            <h2 className="text-[2.0rem]">{title}</h2>

                            <p className="leading-[1.5] whitespace-break-spaces">{description}</p>
                        </motion.section>
                        {/* 헤더 END */}

                        {/* 바디 */}
                        {targetLabel ? (
                            <motion.section
                                className="bg-[var(--adaptive-grey100)] p-[1.6rem_2.4rem] flex flex-col gap-[1.2rem]"
                                initial={{ opacity: 0, transform: "translateY(100px)" }}
                                animate={{ opacity: 1, transform: "translateY(0px)" }}
                                // exit={{ opacity: 0, transform: "translateY(100px)" }}
                                transition={{
                                    delay: 0.1 * 2,
                                    type: "spring",
                                    mass: 0.1,
                                    stiffness: 100,
                                    damping: 10,
                                }}
                            >
                                <p className="text-[var(--adaptive-black300)] text-[1.4rem] font-[NanumSquare]">삭제 대상</p>

                                <h6 className="text-[2.0rem] leading-[1.5]">{targetLabel}</h6>
                            </motion.section>
                        ) : null}
                        {/* 바디 END */}

                        {/* 푸터 */}
                        <motion.section
                            className="grid grid-cols-2"
                            initial={{ opacity: 0, transform: "translateY(100px)" }}
                            animate={{ opacity: 1, transform: "translateY(0px)" }}
                            // exit={{ opacity: 0, transform: "translateY(100px)" }}
                            transition={{
                                delay: 0.1 * 3,
                                type: "spring",
                                mass: 0.1,
                                stiffness: 100,
                                damping: 10,
                            }}
                        >
                            <UI.Button
                                className=""
                                onClick={onCancel}
                                type="button"
                            >
                                취소
                            </UI.Button>
                            <UI.Button
                                className={`text-white font-[500] ${tone === "delete" ? "bg-[var(--adaptive-red500)]" : "bg-[var(--adaptive-blue500)]"}`}
                                onClick={onConfirm}
                                type="button"
                            >
                                {confirmLabel}
                            </UI.Button>
                        </motion.section>
                        {/* 푸터 END */}
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
