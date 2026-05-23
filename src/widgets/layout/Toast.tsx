"use client";

import { useToastStore } from "@/shared/model/stores/useToastStore";

export function Toast() {
    const toastList = useToastStore((state) => state.toastList);

    if (!toastList.length) {
        return null;
    }

    return (
        <div className="fixed right-5 bottom-5 z-[1000] grid max-w-[36rem] gap-2">
            {toastList.map((toast) => (
                <div
                    className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-xl"
                    key={toast.id}
                >
                    {toast.msg}
                </div>
            ))}
        </div>
    );
}
