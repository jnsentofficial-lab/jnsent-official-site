"use client";

import { Fragment, useState } from "react";
import { usePublishedNewsQuery } from "@/entities/news/api/news.query";
import Skeleton from "@/shared/ui/kit/Skeleton";
import UI from "@/shared/ui/UIComponent";
import { SubPageHero } from "@/widgets/layout/ui";
import { motion } from "framer-motion";

function formatDate(value: string | null) {
    if (!value) {
        return "날짜 미정";
    }

    return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(value));
}

function formatViewCount(value?: number) {
    return new Intl.NumberFormat("ko-KR").format(value ?? 0);
}

export function Analysis() {
    const { data: news, isLoading } = usePublishedNewsQuery();
    const [page, setPage] = useState(1);
    const pageSize = 9;
    const totalPages = Math.max(1, Math.ceil(news.length / pageSize));
    const visibleNews = news.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <SubPageHero
                current="뉴스"
                title="뉴스"
                description={`변화하는 엔터테인먼트 시장 속에서\n제이엔에스가 나아가는 방향을 공유합니다.`}
            />

            <motion.section
                className="mx-auto max-w-[var(--size-pc)] w-full"
                initial={{ opacity: 0, transform: "translateY(100px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transform: "translateY(100px)" }}
                transition={{
                    delay: 0.4,
                    type: "spring",
                    mass: 0.1,
                    stiffness: 100,
                    damping: 10,
                }}
            >
                {news.length ? (
                    <Fragment>
                        <div className="mx-[1.6rem] grid pc:grid-cols-3 mobile:grid-cols-2 mobile:gap-[3.2rem_1.6rem] pc:gap-[5.2rem_1.6rem]">
                            {visibleNews.map((item) => (
                                <UI.Linker
                                    className="flex flex-col justify-start gap-[2.4rem]"
                                    href={`/news/${item.slug}`}
                                    key={item.slug}
                                >
                                    {item.thumbnail_url ? (
                                        <img
                                            alt={item.title}
                                            className="aspect-square w-full rounded-[5.2rem] object-cover transition duration-300 group-hover:scale-[1.02] select-none border border-[var(--adaptive-grey200)]"
                                            src={item.thumbnail_url}
                                        />
                                    ) : (
                                        <span className="flex aspect-square w-full items-center justify-center rounded-[3rem] bg-[var(--adaptiveGrey100)] text-lg font-[700] text-[var(--adaptiveGrey500)]">
                                            이미지 없음
                                        </span>
                                    )}

                                    <div className="flex flex-col gap-[0.8rem]">
                                        <section className="flex items-center gap-[1.2rem]">
                                            <p>{formatDate(item.published_at)}</p>

                                            <div className="h-[1.2rem] w-[0.1rem] bg-[var(--adaptive-black300)]" />

                                            <p>조회 {formatViewCount(item.view_count)}</p>
                                        </section>

                                        <section>
                                            <h6 className="text-[2.4rem] leading-[1.5] text-left">{item.title}</h6>
                                        </section>
                                    </div>
                                </UI.Linker>
                            ))}
                        </div>

                        <div className="mt-24 flex items-center justify-center gap-4">
                            <button
                                className="grid h-12 w-12 place-items-center rounded-full bg-[var(--adaptiveGrey100)] text-2xl font-[700] text-[var(--adaptiveGrey500)] disabled:opacity-40"
                                disabled={page === 1}
                                onClick={() => setPage((value) => Math.max(1, value - 1))}
                                type="button"
                            >
                                ‹
                            </button>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    className={`h-12 w-12 text-2xl font-[700] ${page === index + 1 ? "text-black" : "text-[var(--adaptiveGrey500)]"}`}
                                    key={index}
                                    onClick={() => setPage(index + 1)}
                                    type="button"
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                className="grid h-12 w-12 place-items-center rounded-full bg-[var(--adaptiveGrey100)] text-2xl font-[700] text-[var(--adaptiveGrey500)] disabled:opacity-40"
                                disabled={page === totalPages}
                                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                                type="button"
                            >
                                ›
                            </button>
                        </div>
                    </Fragment>
                ) : (
                    <div className="rounded-[2.4rem] bg-[var(--adaptiveGrey100)] px-8 py-16 text-center text-2xl font-[700] text-[var(--adaptiveGrey600)]">현재 공개된 뉴스가 없습니다.</div>
                )}
            </motion.section>
        </>
    );
}
