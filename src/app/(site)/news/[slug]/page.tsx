import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/shared/api/SupabaseServer";
import type { News } from "@/entities/news/model/news.type";
import { NewsDetailView } from "@/views/news/detail/NewsDetailView";
import Main from "@/widgets/layout/Main";
import { createArticleJsonLd } from "@/shared/lib/JsonLd";
import { buildPageMetadata, getDefaultOgImageUrl } from "@/shared/lib/seo";
import { getSiteUrl } from "@/shared/lib/siteUrl";

export const revalidate = 60;

type NewsDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

const defaultTitle = "NEWS 상세 | 제이엔에스 엔터테인먼트";
const defaultDescription = "제이엔에스 엔터테인먼트의 NEWS 상세 페이지입니다.";

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
        return getDefaultOgImageUrl();
    }

    return url.startsWith("http") ? url : `${getSiteUrl()}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const news = await getPublishedNewsBySlug(slug);
    const title = news?.seo_title || news?.title || defaultTitle;
    const description = news?.seo_description || news?.summary || defaultDescription;
    const image = getAbsoluteImageUrl(news?.thumbnail_url);

    return buildPageMetadata({
        title,
        description,
        path: `/news/${slug}`,
        ogType: "article",
        image,
    });
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const cookieStore = await cookies();
    void cookieStore;
    const { slug } = await params;
    const news = await getPublishedNewsBySlug(slug);
    const jsonLd = news
        ? createArticleJsonLd({
              title: news.seo_title || news.title,
              description: news.seo_description || news.summary || defaultDescription,
              slug,
              image: news.thumbnail_url,
              publishedAt: news.published_at,
              updatedAt: news.updated_at,
          })
        : null;

    return (
        <>
            {jsonLd ? (
                <script
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    suppressHydrationWarning
                    type="application/ld+json"
                />
            ) : null}
            <Main
                id="news-detail"
                className={{ inner: "", container: "min-h-[calc(100svh-10.8rem)]" }}
            >
                <NewsDetailView slug={slug} />
            </Main>
        </>
    );
}
