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
        const email = String(formData.get("email") ?? "").trim();
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
            className="grid gap-6"
            onSubmit={handleSubmit}
        >
            <label className="grid gap-3 text-xl font-black text-black">
                아이디
                <input
                    className="h-14 w-full border-0 border-b border-black px-0 text-xl font-semibold outline-none placeholder:text-[var(--adaptiveGrey500)]"
                    autoComplete="username"
                    name="email"
                    placeholder="아이디를 입력해주세요"
                    type="text"
                />
            </label>
            <label className="grid gap-3 text-xl font-black text-black">
                비밀번호
                <input
                    className="h-14 w-full border-0 border-b border-black px-0 text-xl font-semibold outline-none placeholder:text-[var(--adaptiveGrey500)]"
                    autoComplete="current-password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
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
                className="mt-2 min-h-16 bg-black text-xl font-black text-white disabled:cursor-not-allowed disabled:bg-[var(--adaptiveGrey400)]"
                disabled={isSubmitting}
                type="submit"
            >
                {isSubmitting ? "로그인 중" : "로그인"}
            </UI.Button>
            <UI.Link
                className="mt-10 text-center text-lg font-black text-black"
                href="/"
            >
                ‹ 메인으로 돌아가기
            </UI.Link>
        </form>
    );
}
