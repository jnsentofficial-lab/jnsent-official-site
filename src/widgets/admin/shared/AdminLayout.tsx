"use client";

import { ReactNode } from "react";
import UI from "@/shared/ui/UIComponent";

type AdminWorkspaceProps = {
    current: string;
    title: string;
    action?: ReactNode;
    children: ReactNode;
};

type AdminTwoPanelProps = {
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

export function AdminWorkspace({ current, title, action, children }: AdminWorkspaceProps) {
    return (
        <div className="min-h-screen bg-[var(--adaptiveGrey50)]">
            <div className="mx-auto max-w-[154rem] px-10 py-14 max-[86rem]:px-5 max-[86rem]:py-8">
                <div className="mb-16 flex items-start justify-between gap-8 max-[86rem]:mb-10 max-[86rem]:flex-col">
                    <div>
                        <p className="mb-9 text-3xl font-black text-[var(--adaptiveGrey500)] max-[86rem]:text-2xl">
                            메인 <span className="mx-4 text-[var(--adaptiveRed400)]">-&gt;</span> <span className="text-black">{current}</span>
                        </p>
                        <h1 className="m-0 text-5xl font-black leading-[1.2] text-black max-[86rem]:text-4xl">{title}</h1>
                    </div>
                    {action}
                </div>
                {children}
            </div>
        </div>
    );
}

export function AdminTwoPanel({ left, right }: AdminTwoPanelProps) {
    return (
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(44rem,0.72fr)] gap-0 max-[120rem]:grid-cols-1">
            <section className="min-h-[calc(100vh-18rem)] pr-12 max-[120rem]:pr-0">{left}</section>
            <aside className="min-h-[calc(100vh-18rem)] bg-white pl-12 max-[120rem]:mt-10 max-[120rem]:pl-0">{right}</aside>
        </div>
    );
}

export function AdminPagination({ page, totalPages, onChange }: AdminPaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-14 flex items-center justify-center gap-5">
            <button
                className="grid h-11 w-11 place-items-center border border-[var(--adaptiveGrey200)] bg-white text-2xl font-black text-[var(--adaptiveRed300)] disabled:opacity-40"
                disabled={page === 1}
                onClick={() => onChange(Math.max(1, page - 1))}
                type="button"
            >
                ‹
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
                <button
                    className={`h-11 w-11 text-2xl font-black ${page === index + 1 ? "border-b-2 border-black text-black" : "text-[var(--adaptiveGrey500)]"}`}
                    key={index}
                    onClick={() => onChange(index + 1)}
                    type="button"
                >
                    {index + 1}
                </button>
            ))}
            <button
                className="grid h-11 w-11 place-items-center border border-[var(--adaptiveGrey200)] bg-white text-2xl font-black text-[var(--adaptiveRed300)] disabled:opacity-40"
                disabled={page === totalPages}
                onClick={() => onChange(Math.min(totalPages, page + 1))}
                type="button"
            >
                ›
            </button>
        </div>
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
                    <h2 className="mt-0 mb-5 text-3xl font-black text-black">{title}</h2>
                    <p className="m-0 text-lg font-semibold leading-[1.8] text-black">{description}</p>
                </div>
                {targetLabel ? (
                    <div className="bg-[var(--adaptiveGrey100)] px-8 py-5">
                        <p className="mb-2 text-base font-black text-[var(--adaptiveGrey500)]">대상</p>
                        <strong className="text-2xl font-black text-black">{targetLabel}</strong>
                    </div>
                ) : null}
                <div className="grid grid-cols-2">
                    <UI.Button
                        className="min-h-16 bg-white text-lg font-black text-black"
                        onClick={onCancel}
                        type="button"
                    >
                        취소
                    </UI.Button>
                    <UI.Button
                        className={`min-h-16 text-lg font-black text-white ${tone === "delete" ? "bg-[var(--adaptiveRed500)]" : "bg-[var(--adaptiveBlue500)]"}`}
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
