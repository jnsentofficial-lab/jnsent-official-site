"use client";

import { useRouter } from "next/navigation";
import UI from "@/shared/ui/UIComponent";

type InquiryResultProps = {
    title: string;
    description: string;
};

export function InquiryResult({ title, description }: InquiryResultProps) {
    const router = useRouter();

    return (
        <section className="mx-[1.6rem] flex min-h-[calc(100svh-10.8rem)] items-center justify-center py-[6.4rem]">
            <div className="flex w-full max-w-[72rem] justify-center items-center flex-col gap-[2.4rem] rounded-[2.4rem] bg-white text-center">
                <div className="flex flex-col gap-[1.2rem]">
                    <h1 className="m-0 whitespace-break-spaces font-[900] leading-[1.4] mobile:text-[2.8rem] pc:text-[4rem]">{title}</h1>
                    <p className="m-0 whitespace-break-spaces leading-[1.6] text-[var(--adaptive-grey700)] mobile:text-[1.6rem] pc:text-[2rem]">{description}</p>
                </div>

                <UI.Button
                    className="rounded-[1.6rem] bg-[var(--adaptive-black900)] px-[2rem] py-[1.6rem] font-[700] text-white"
                    onClick={() => {
                        if (window.history.length > 1) {
                            router.back();
                            return;
                        }

                        router.push("/");
                    }}
                >
                    이전 페이지로 돌아가기
                </UI.Button>
            </div>
        </section>
    );
}
