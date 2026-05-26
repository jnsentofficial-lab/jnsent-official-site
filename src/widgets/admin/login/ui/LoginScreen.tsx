import { AdminLoginForm } from "@/features/auth/AdminLoginForm";

export function LoginScreen() {
    return (
        <section className="grid min-h-screen place-items-center bg-white px-6">
            <div className="w-[min(38rem,100%)]">
                <strong className="mb-5 block text-center text-6xl font-[700] leading-none text-black">JNS</strong>
                <h1 className="m-0 text-center text-3xl font-[700] text-black">어드민 로그인</h1>
                <p className="mt-6 mb-16 text-center text-lg font-semibold leading-[1.5] text-[var(--adaptive-grey600)]">콘텐츠와 문의 관리를 위해 인증된 계정으로 로그인하세요.</p>
                <AdminLoginForm />
            </div>
        </section>
    );
}
