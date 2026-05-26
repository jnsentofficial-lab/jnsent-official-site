"use client";

import { ReactNode } from "react";
import UI from "@/shared/ui/UIComponent";
import Image from "next/image";

type AdminWorkspaceProps = {
    // current?: string;
    // title?: string;
    // action?: ReactNode;
    children: ReactNode;
};

type AdminTwoPanelProps = {
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
            <div className="mx-auto min-w-[var(--size-pc)] h-full flex flex-col gap-[5.2rem]">{children}</div>
        </article>
    );
}

export function AdminTwoPanel({ current, title, action, left, right }: AdminTwoPanelProps) {
    return (
        <div className="grid grid-cols-2 h-full">
            <section className="flex flex-col h-[100dvh] overflow-auto">
                <section className="flex justify-between items-center gap-[1.6rem] p-[5.2rem]">
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

                    {action}
                </section>

                {left}
            </section>

            <aside className="bg-white h-[100dvh] overflow-auto relative">{right}</aside>
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
        <section className="flex flex-col gap-[5.2rem] p-[5.2rem]">
            <h2 className="text-[3.2rem]">{title}</h2>

            {children}
        </section>
    );
}

export function ConfirmDialog({ open, title, description, targetLabel, confirmLabel, tone = "create", onCancel, onConfirm }: ConfirmDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-6 backdrop-blur-sm">
            <div className="w-[min(42rem,100%)] bg-white shadow-[0_2rem_6rem_rgba(0,0,0,0.2)]">
                <div className="p-8">
                    <h2 className="mt-0 mb-5 text-3xl font-[700] text-black">{title}</h2>
                    <p className="m-0 text-lg font-semibold leading-[1.5] text-black">{description}</p>
                </div>
                {targetLabel ? (
                    <div className="bg-[var(--adaptiveGrey100)] px-8 py-5">
                        <p className="mb-2 text-base font-[700] text-[var(--adaptiveGrey500)]">대상</p>
                        <strong className="text-2xl font-[700] text-black">{targetLabel}</strong>
                    </div>
                ) : null}
                <div className="grid grid-cols-2">
                    <UI.Button
                        className="min-h-16 bg-white text-lg font-[700] text-black"
                        onClick={onCancel}
                        type="button"
                    >
                        취소
                    </UI.Button>
                    <UI.Button
                        className={`min-h-16 text-lg font-[700] text-white ${tone === "delete" ? "bg-[var(--adaptiveRed500)]" : "bg-[var(--adaptiveBlue500)]"}`}
                        onClick={onConfirm}
                        type="button"
                    >
                        {confirmLabel}
                    </UI.Button>
                </div>
            </div>
        </div>
    );
}
