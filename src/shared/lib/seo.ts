import type { Metadata } from "next";

import { getPublishedPageContentServer } from "@/entities/pageContent/api/pageContent.api";
import { getSiteUrl } from "@/shared/lib/siteUrl";

export const SITE_NAME = "제이엔에스 엔터테인먼트";
export const DEFAULT_DESCRIPTION = "가능성을 현실로 만드는 제이엔에스 엔터테인먼트 입니다.";
export const DEFAULT_OG_IMAGE_PATH = "/images/seo/og-default.jpg";

export function getDefaultOgImageUrl() {
    return `${getSiteUrl()}${DEFAULT_OG_IMAGE_PATH}`;
}

type BuildPageMetadataOptions = {
    title: string;
    description: string;
    path: string;
    ogType?: "website" | "article";
    image?: string;
    noIndex?: boolean;
};

function normalizePath(path: string) {
    return path.startsWith("/") ? path : `/${path}`;
}

export function buildPageMetadata({
    title,
    description,
    path,
    ogType = "website",
    image,
    noIndex = false,
}: BuildPageMetadataOptions): Metadata {
    const canonicalPath = normalizePath(path);
    const url = `${getSiteUrl()}${canonicalPath}`;
    const ogImage = image ?? getDefaultOgImageUrl();

    return {
        title,
        description,
        ...(noIndex ? { robots: { index: false, follow: false } } : {}),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            locale: "ko_KR",
            type: ogType,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}

export function buildNoIndexMetadata(title: string, description?: string): Metadata {
    return {
        title,
        description: description ?? DEFAULT_DESCRIPTION,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export async function buildCmsPageMetadata(
    slug: string,
    fallback: {
        title: string;
        description: string;
        path: string;
    },
) {
    const content = await getPublishedPageContentServer(slug);

    return buildPageMetadata({
        title: content?.seo_title || fallback.title,
        description: content?.seo_description || content?.description || fallback.description,
        path: fallback.path,
    });
}

export function buildRootMetadata(): Metadata {
    const url = getSiteUrl();
    const ogImage = getDefaultOgImageUrl();

    return {
        metadataBase: new URL(url),
        title: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        openGraph: {
            title: SITE_NAME,
            description: DEFAULT_DESCRIPTION,
            url,
            siteName: SITE_NAME,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: SITE_NAME,
                },
            ],
            locale: "ko_KR",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: SITE_NAME,
            description: DEFAULT_DESCRIPTION,
            images: [ogImage],
        },
    };
}
