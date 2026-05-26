"use client";

import { motion } from "framer-motion";
import { useToastStore } from "@/shared/model/stores/useToastStore";
import { AnimatePresence } from "framer-motion";

export function Toast() {
    const toastList = useToastStore((state) => state.toastList);
    const removeToastById = useToastStore((state) => state.removeToastById);

    // if (!toastList.length) {
    //     return null;
    // }

    return (
        <div className="fixed left-[50%] transform translate-x-[-50%] top-[3.2rem] z-[1000] grid w-[min(36rem,calc(100vw-2.4rem))] gap-2">
            <AnimatePresence>
                {toastList.map((toast) => (
                    <motion.div
                        // className={`flex items-start gap-3 rounded-lg border bg-slate-950/95 px-4 py-3 text-sm font-bold text-white shadow-xl backdrop-blur`}
                        className={`flex items-center gap-3 rounded-full border border-[var(--adaptive-black50)] bg-[var(--adaptive-grey50)] px-[2.6rem_1.2rem] py-[1.2rem] shadow-[0_0_200px_0_#000000] backdrop-blur`}
                        key={toast.id}
                        role="status"
                        initial={{ opacity: 0, scale: 0.5, transform: "translateY(-100px)" }}
                        animate={{ opacity: 1, scale: 1, transform: "translateY(0px)" }}
                        exit={{ opacity: 0, scale: 0.5, transform: "translateY(-100px)" }}
                        transition={{
                            delay: 0.1 * 2,
                            type: "spring",
                            mass: 0.1,
                            stiffness: 100,
                            damping: 10,
                        }}
                    >
                        <div
                            className={`${toast.type === "success" ? "bg-emerald-500" : toast.type === "fail" ? "bg-rose-500" : toast.type === "warning" ? "bg-amber-500" : "bg-slate-700"} w-[0.8rem] h-[0.8rem]`}
                        />
                        <div className="min-w-0 flex-1">
                            <p className="text-[1.6rem] break-words text-[var(--adaptive-black900)]">{toast.msg}</p>
                        </div>
                        <button
                            aria-label="토스트 닫기"
                            className="cursor-pointer text-lg leading-none text-[var(--adaptive-black500)] transition bg-[var(--adaptive-grey300)] w-[2.4rem] h-[2.4rem] rounded-full"
                            onClick={() => removeToastById(toast.id)}
                            type="button"
                        >
                            ×
                        </button>
                    </motion.div>
                    // <div
                    //     className={`${toast.type === "success" ? "border-emerald-500" : toast.type === "fail" ? "border-rose-500" : toast.type === "warning" ? "border-amber-500" : "border-slate-700"} flex items-start gap-3 rounded-lg border bg-slate-950/95 px-4 py-3 text-sm font-bold text-white shadow-xl backdrop-blur`}
                    //     key={toast.id}
                    //     role="status"
                    // >
                    //     <div className="min-w-0 flex-1">
                    //         <p className="break-words">{toast.msg}</p>
                    //     </div>
                    //     <button
                    //         aria-label="토스트 닫기"
                    //         className="text-lg leading-none text-white/70 transition hover:text-white"
                    //         onClick={() => removeToastById(toast.id)}
                    //         type="button"
                    //     >
                    //         ×
                    //     </button>
                    // </div>
                ))}
            </AnimatePresence>
        </div>
    );
}
