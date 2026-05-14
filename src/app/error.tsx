"use client";

import { useEffect } from "react";
import UI from "@/shared/ui/UIComponent";

type AppErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function AppError({ error, reset }: AppErrorProps) {
    useEffect(() => {
        console.error("Application route error", {
            digest: error.digest,
            message: error.message,
        });
    }, [error]);

    return (
        <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-slate-900">
            <section className="w-[min(100%,42rem)] rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_1.6rem_4rem_rgba(15,23,42,0.1)]">
                <span className="mb-2.5 block text-[1.3rem] font-bold text-red-600">Application Error</span>
                <h1 className="mt-0 mb-2.5 text-2xl leading-[1.35]">일시적인 오류가 발생했습니다</h1>
                <p className="mt-0 mb-5 leading-[1.6] text-slate-600">운영 로그에 오류 정보가 기록되었습니다. 잠시 후 다시 시도해주세요.</p>
                <UI.Button
                    className="min-h-11 w-full rounded-xl bg-slate-900 font-bold text-white"
                    onClick={reset}
                    type="button"
                >
                    다시 시도
                </UI.Button>
            </section>
        </main>
    );
}
