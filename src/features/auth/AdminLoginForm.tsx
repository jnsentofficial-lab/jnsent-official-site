"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useLoginAdminMutation } from "@/entities/auth/api/auth.query";
import UI from "@/shared/ui/UIComponent";

export function AdminLoginForm() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const loginAdmin = useLoginAdminMutation();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");

        try {
            await loginAdmin.mutateAsync({ email, password });
            router.replace("/admin/dashboard");
        } catch {
            setErrorMessage("로그인 정보를 확인해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            className="grid gap-4"
            onSubmit={handleSubmit}
        >
            <label className="grid gap-2 font-bold text-slate-800">
                이메일
                <input
                    className="min-h-12 w-full rounded-lg border border-slate-300 px-3.5"
                    autoComplete="email"
                    name="email"
                    placeholder="admin@example.com"
                    type="email"
                />
            </label>
            <label className="grid gap-2 font-bold text-slate-800">
                비밀번호
                <input
                    className="min-h-12 w-full rounded-lg border border-slate-300 px-3.5"
                    autoComplete="current-password"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                />
            </label>
            {errorMessage ? (
                <p
                    className="m-0 text-sm font-bold text-red-700"
                    role="alert"
                >
                    {errorMessage}
                </p>
            ) : null}
            <UI.Button
                className="min-h-12 rounded-lg bg-blue-500 font-bold text-white disabled:cursor-not-allowed disabled:bg-blue-300"
                disabled={isSubmitting}
                type="submit"
            >
                {isSubmitting ? "로그인 중" : "로그인"}
            </UI.Button>
        </form>
    );
}
