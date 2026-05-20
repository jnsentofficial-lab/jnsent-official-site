"use client";

import { useDashboardProvider } from "@/features/dashboard/model/SubscriptionContext";

export function Status() {
    const { status } = useDashboardProvider();

    return <section className="rounded-lg border border-slate-200 bg-white p-6 font-bold text-slate-700">상태: {status}</section>;
}
