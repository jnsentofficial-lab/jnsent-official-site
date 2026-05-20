import { AdminLoginForm } from "@/features/auth/AdminLoginForm";

export function Analysis() {
    return (
        <>
            <section className="grid w-[min(92rem,100%)] grid-cols-[minmax(0,0.9fr)_minmax(32rem,1fr)] gap-8 rounded-lg border border-slate-200 bg-white p-8 max-[86rem]:grid-cols-1">
                <div className="flex flex-col justify-center">
                    <p className="mb-3 text-[1.3rem] font-bold text-blue-700">Admin</p>
                    <h1 className="m-0 text-4xl text-slate-900">관리자 로그인</h1>
                    <span className="mt-4 leading-[1.7] text-slate-700">콘텐츠와 문의 관리를 위해 인증된 계정으로 로그인하세요.</span>
                </div>
                <AdminLoginForm />
            </section>
        </>
    );
}
