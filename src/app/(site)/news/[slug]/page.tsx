import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/shared/api/SupabaseServer";
import type { News } from "@/entities/news/model/news.type";
import { NewsDetailView } from "@/views/news/detail/NewsDetailView";
import Main from "@/widgets/layout/Main";

export const revalidate = 60;

type NewsDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const defaultTitle = "NEWS 상세 | 제이엔에스 엔터테인먼트";
const defaultDescription = "제이엔에스 엔터테인먼트의 NEWS 상세 페이지입니다.";
const defaultImage = `${siteUrl}/images/seo/og-default.jpg`;

async function getPublishedNewsBySlug(slug: string): Promise<News | null> {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from("news").select("*").eq("slug", slug).eq("is_published", true).neq("title", "NEWS 준비 중입니다").maybeSingle();

    if (error) {
        return null;
    }

    return data;
}

function getAbsoluteImageUrl(url?: string | null) {
    if (!url) {
        return defaultImage;
    }

    return url.startsWith("http") ? url : `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const news = await getPublishedNewsBySlug(slug);
    const title = news?.seo_title || news?.title || defaultTitle;
    const description = news?.seo_description || news?.summary || defaultDescription;
    const image = getAbsoluteImageUrl(news?.thumbnail_url);
    const pageUrl = `${siteUrl}/news/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title,
            description,
            url: pageUrl,
            type: "article",
            locale: "ko_KR",
            images: [
                {
                    url: image,
                    alt: news?.title || title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const cookieStore = await cookies();
    void cookieStore;
    const { slug } = await params;

    return (
        <Main
            id="news-detail"
            className={{ inner: "", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <NewsDetailView slug={slug} />
        </Main>
    );
}
