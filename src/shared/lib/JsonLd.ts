import { getSiteUrl } from "@/shared/lib/siteUrl";
import { SITE_NAME } from "@/shared/lib/seo";

export function createSiteJsonLd() {
    const siteUrl = getSiteUrl();

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                name: SITE_NAME,
                url: siteUrl,
            },
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                name: SITE_NAME,
                url: siteUrl,
                inLanguage: "ko-KR",
                publisher: {
                    "@id": `${siteUrl}/#organization`,
                },
            },
        ],
    };
}

type ArticleJsonLdInput = {
    title: string;
    description: string;
    slug: string;
    image?: string | null;
    publishedAt?: string | null;
    updatedAt?: string | null;
};

export function createArticleJsonLd({ title, description, slug, image, publishedAt, updatedAt }: ArticleJsonLdInput) {
    const siteUrl = getSiteUrl();
    const pageUrl = `${siteUrl}/news/${slug}`;
    const imageUrl = image?.startsWith("http") ? image : image ? `${siteUrl}${image.startsWith("/") ? image : `/${image}`}` : `${siteUrl}/images/seo/og-default.jpg`;

    return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: title,
        description,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        image: [imageUrl],
        datePublished: publishedAt ?? undefined,
        dateModified: updatedAt ?? publishedAt ?? undefined,
        author: {
            "@type": "Organization",
            name: SITE_NAME,
        },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
        },
    };
}
