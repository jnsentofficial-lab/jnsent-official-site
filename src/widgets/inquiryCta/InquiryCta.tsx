import UI from "@/shared/ui/UIComponent";

export function InquiryCta() {
    return (
        <section className="bg-amber-100 py-[7.2rem]">
            <div className="mx-auto flex w-[min(112rem,calc(100%_-_3.2rem))] items-center justify-between gap-6 max-[86rem]:flex-col max-[86rem]:items-start">
                <div>
                    <p className="mb-3 text-[1.3rem] font-bold text-teal-500">Contact</p>
                    <h2 className="m-0 text-[3.4rem] leading-[1.25]">운영에 필요한 준비를 함께 정리해보세요</h2>
                </div>
                <UI.Link
                    className="bg-red-500 w-[3.2rem]"
                    // className="inline-flex min-h-12 items-center justify-center rounded-lg bg-teal-500 px-5 font-bold text-teal-950"
                    href="/bjSupport"
                >
                    상담 시작하기
                </UI.Link>
            </div>
        </section>
    );
}
