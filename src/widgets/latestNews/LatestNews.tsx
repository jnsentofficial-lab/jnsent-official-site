import Link from "next/link";
import type { News } from "@/entities/news/model/news.type";
import UI from "@/shared/ui/UIComponent";

type LatestNewsProps = {
    news: News[];
};

export function LatestNews({ news }: LatestNewsProps) {
    return (
        <section className="bg-slate-50 py-[8.8rem]">
            <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                <div className="mb-8 max-w-[64rem]">
                    <p className="mb-3 text-[1.3rem] font-bold text-teal-500">News</p>
                    <h2 className="m-0 text-[3.4rem] leading-[1.25]">최근 소식</h2>
                </div>
                <div className="grid gap-4">
                    {news.length ? (
                        news.map((item) => (
                            <UI.Link
                                className="flex min-h-[12rem] flex-col justify-between rounded-lg border border-slate-200 bg-white p-6"
                                href={`/news/${item.slug}`}
                                key={item.id}
                            >
                                <strong className="text-xl leading-[1.35]">{item.title}</strong>
                                <span className="leading-[1.6] text-slate-600">{item.summary ?? "상세 내용을 확인하세요."}</span>
                            </UI.Link>
                        ))
                    ) : (
                        <p>등록된 공개 NEWS가 없습니다.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
