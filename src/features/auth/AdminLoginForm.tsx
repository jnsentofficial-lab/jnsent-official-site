"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useLoginAdminMutation } from "@/entities/auth/api/auth.query";
import UI from "@/shared/ui/UIComponent";
import Image from "next/image";

const inputClassName = "h-[5.2rem] border-b border-b-[var(--adaptive-grey200)] hover:border-[var(--adaptive-grey700)] text-[2.0rem] text-black font-semibold";
const labelClassName = "flex flex-col gap-[0.8rem] font-[NanumSquare]";

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
            router.replace("/admin/inquiries");
        } catch {
            setErrorMessage("로그인 정보를 확인해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            className="flex flex-col gap-[5.2rem]"
            onSubmit={handleSubmit}
        >
            <section className="flex flex-col gap-[1.6rem]">
                <label className={labelClassName}>
                    아이디
                    <input
                        className={inputClassName}
                        autoComplete="username"
                        name="email"
                        placeholder="아이디를 입력해주세요"
                        type="text"
                    />
                </label>
                <label className={labelClassName}>
                    비밀번호
                    <input
                        className={inputClassName}
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
                    className="mt-2 min-h-16 bg-black text-white disabled:cursor-not-allowed disabled:bg-[var(--adaptiveGrey400)]"
                    disabled={isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? "로그인 중" : "로그인"}
                </UI.Button>
            </section>

            <UI.Linker
                className="flex justify-center items-center w-full"
                href="/"
            >
                <Image
                    src={"/images/icon/outlined/ico-outlined-arrow-single-up.svg"}
                    alt=""
                    width={16}
                    height={16}
                    className="rotate-270 brightness-0"
                />
                <p>메인으로 돌아가기</p>
            </UI.Linker>
        </form>
    );
}
