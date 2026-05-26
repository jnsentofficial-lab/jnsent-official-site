import { AdminLoginForm } from "@/features/auth/AdminLoginForm";
import Image from "next/image";

export function Analysis() {
    return (
        <section className="grid min-h-screen place-items-center bg-white px-6">
            <div className="w-[min(38rem,100%)] flex flex-col gap-[5.2rem]">
                <section className="flex flex-col gap-[1.6rem]">
                    <Image
                        src={"/images/common/ico-logo.svg"}
                        width={42}
                        height={42}
                        alt=""
                    />
                    <section className="flex flex-col gap-[1.2rem]">
                        <h1 className="text-[2.4rem]">어드민 로그인</h1>
                        <p className="leading-[1.5] text-[var(--adaptive-black300)]">콘텐츠와 문의 관리를 위해 인증된 계정으로 로그인하세요.</p>
                    </section>
                </section>

                <AdminLoginForm />
            </div>
        </section>
    );
}
