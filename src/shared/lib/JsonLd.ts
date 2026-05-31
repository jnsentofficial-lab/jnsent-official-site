const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export function createJsonLd() {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                name: "제이엔에스 엔터테인먼트",
                url: siteUrl,
            },
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                name: "제이엔에스 엔터테인먼트",
                url: siteUrl,
                publisher: {
                    "@id": `${siteUrl}/#organization`,
                },
            },
        ],
    };
}
