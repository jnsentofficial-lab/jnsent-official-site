import Link from "next/link";
import type { Banner } from "@/entities/banner/model/banner.type";
import type { PageContent } from "@/entities/pageContent/model/pageContent.type";
import UI from "@/shared/ui/UIComponent";

type HomeHeroProps = {
    banner: Banner | null;
    content: PageContent | null;
};

export function HomeHero({ banner, content }: HomeHeroProps) {
    return (
        <section className="bg-slate-900 text-slate-50">
            <div className="mx-auto grid min-h-[56rem] w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-[minmax(0,1.05fr)_minmax(32rem,0.95fr)] items-center gap-14 max-[86rem]:min-h-0 max-[86rem]:grid-cols-1 max-[86rem]:py-18">
                <div>
                    <p className="mb-3 text-[1.3rem] font-bold text-teal-500">Entertainment Operation Partner</p>
                    <h1 className="m-0 max-w-[68rem] text-[5.6rem] leading-[1.08] max-[86rem]:text-[4rem]">{banner?.title ?? content?.title ?? "콘텐츠 운영 정보가 준비되지 않았습니다"}</h1>
                    <p className="mt-6 max-w-[60rem] text-lg leading-[1.7] text-slate-300">{banner?.subtitle ?? content?.description ?? "관리자에서 공개 콘텐츠를 입력하면 이 영역에 반영됩니다."}</p>
                    <div className="mt-[3.4rem] flex flex-wrap gap-3">
                        <UI.Link
                            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-teal-500 px-5 font-bold text-teal-950"
                            href="/bjSupport"
                        >
                            상담 문의
                        </UI.Link>
                        <UI.Link
                            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-600 px-5 font-bold text-slate-50"
                            href="/consulting"
                        >
                            창업컨설팅 보기
                        </UI.Link>
                    </div>
                </div>
                <div
                    className="flex min-h-[36rem] items-center justify-center border border-slate-800 bg-slate-800 bg-[linear-gradient(135deg,rgba(20,184,166,0.24),transparent_46%)] max-[86rem]:min-h-[30rem]"
                    aria-hidden="true"
                >
                    <div className="flex aspect-[4/3] w-[min(32rem,82%)] flex-col justify-end border border-slate-500 bg-slate-950 p-7">
                        <span className="mb-auto w-fit rounded-full bg-red-600 px-2.5 py-1.5 text-xs font-bold">LIVE</span>
                        <strong className="text-[3.2rem]">Studio Ops</strong>
                        <p className="mt-2 mb-0 text-slate-400">Setup / Rental / Consulting</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
