"use client";

import { useApiPendingStore } from "@/shared/model/stores/useApiPendingStore";

export function ApiPendingOverlay() {
    const pendingCount = useApiPendingStore((state) => state.pendingCount);

    if (pendingCount < 1) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/35 backdrop-blur-[2px]">
            <div
                aria-live="polite"
                className="flex min-w-[18rem] flex-col items-center gap-[1.2rem] rounded-[2rem] bg-white px-[2.4rem] py-[2rem] shadow-[0_0_80px_0_#00000040]"
                role="status"
            >
                <div className="h-[3.2rem] w-[3.2rem] animate-spin rounded-full border-[0.3rem] border-[var(--adaptive-grey200)] border-t-[var(--adaptive-red500)]" />
                <p className="text-[1.6rem] font-[700] text-[var(--adaptive-black900)]">처리중입니다...</p>
            </div>
        </div>
    );
}
