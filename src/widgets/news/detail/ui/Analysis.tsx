"use client";

import { usePublishedNewsDetailQuery, usePublishedNewsQuery } from "@/entities/news/api/news.query";
import { RichTextRenderer } from "@/shared/ui/richText/RichTextRenderer";
import Skeleton from "@/shared/ui/kit/Skeleton";
import UI from "@/shared/ui/UIComponent";
import { motion } from "framer-motion";

type AnalysisProps = {
    slug: string;
};

function formatViewCount(value?: number) {
    return new Intl.NumberFormat("ko-KR").format(value ?? 0);
}

export function Analysis({ slug }: AnalysisProps) {
    const { data: news, isLoading } = usePublishedNewsDetailQuery(slug);
    const { data: newsList } = usePublishedNewsQuery();
    const currentIndex = newsList.findIndex((item) => item.slug === slug);
    const prevNews = currentIndex > 0 ? newsList[currentIndex - 1] : null;
    const nextNews = currentIndex >= 0 && currentIndex < newsList.length - 1 ? newsList[currentIndex + 1] : null;

    return (
        // <div className="mx-auto w-[min(68rem,calc(100%_-_3.2rem))] pt-[calc(50dvh-1.6rem-17.4rem-3.2rem)] pb-[3.2rem] mx-[1.6rem]">
        <div className="mx-auto w-[min(68rem,calc(100%_-_3.2rem))] pt-[calc(50dvh-1.6rem-17.4rem-3.2rem)] pb-[3.2rem] mx-[1.6rem] flex flex-col gap-[5.2rem]">
            <motion.section
                className="flex flex-col gap-[0.8rem]"
                initial={{ opacity: 0, transform: "translateY(100px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transform: "translateY(100px)" }}
                transition={{
                    delay: 0.1,
                    type: "spring",
                    mass: 0.1,
                    stiffness: 100,
                    damping: 10,
                }}
            >
                <h1 className="text-[3.8rem] font-[700]">{news?.title}</h1>
                <p className="text-[var(--adaptive-grey500)]">
                    {news?.published_at ? new Intl.DateTimeFormat("ko-KR").format(new Date(news.published_at)) : "날짜 미정"}
                    <span className="mx-3">|</span>
                    조회 {formatViewCount(news?.view_count)}
                </p>
            </motion.section>

            <motion.section
                className="flex flex-col gap-[1.6rem]"
                initial={{ opacity: 0, transform: "translateY(100px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transform: "translateY(100px)" }}
                transition={{
                    delay: 0.2,
                    type: "spring",
                    mass: 0.1,
                    stiffness: 100,
                    damping: 10,
                }}
            >
                {news?.thumbnail_url ? (
                    <img
                        alt={news.title}
                        className="aspect-square w-full rounded-[5.2rem] object-cover"
                        // className="mb-14 aspect-square w-full rounded-[5.2rem] object-cover"
                        src={news.thumbnail_url}
                    />
                ) : null}

                {news ? (
                    <RichTextRenderer
                        // className="text-lg font-semibold leading-[1.5] text-black"
                        className="leading-[1.5]"
                        content={news.body}
                        fallback={news.summary ?? "등록된 본문이 없습니다."}
                    />
                ) : (
                    <p className="text-lg font-semibold leading-[1.5] text-black">공개 상태의 뉴스가 없거나 주소가 올바르지 않습니다.</p>
                )}
            </motion.section>

            <section className="flex justify-center">
                <UI.Linker
                    className="bg-[var(--adaptive-grey100)] rounded-full p-[1.4rem_2.0rem]"
                    // className="mx-auto  min-h-12 items-center justify-center rounded-full bg-[var(--adaptiveGrey100)] px-7 text-lg font-[700] text-[var(--adaptiveGrey700)]"
                    href="/news"
                >
                    = 목록으로
                </UI.Linker>
            </section>

            <div className="w-full h-[0.1rem] bg-[var(--adaptive-black100)]" />

            {/* <div className="mt-16 grid gap-8 border-t border-[var(--adaptiveGrey200)] pt-10"> */}
            <section className="flex flex-col gap-[3.2rem]">
                <UI.Linker
                    href={`/news/${prevNews?.slug}`}
                    className="flex flex-col gap-[0.8rem] hover:text-[var(--adaptive-red500)]"
                >
                    <p className="text-left text-[var(--adaptive-black300)]">이전글</p>

                    <h6 className="text-[2.4rem]">{prevNews ? prevNews.title : "이전글이 없습니다."}</h6>
                </UI.Linker>

                <UI.Linker
                    href={`/news/${nextNews?.slug}`}
                    className="flex flex-col gap-[0.8rem] hover:text-[var(--adaptive-red500)]"
                >
                    <p className="text-left text-[var(--adaptive-black300)]">다음글</p>

                    <h6 className="text-[2.4rem]">{nextNews ? nextNews.title : "이전글이 없습니다."}</h6>
                </UI.Linker>
            </section>
        </div>
    );
}
