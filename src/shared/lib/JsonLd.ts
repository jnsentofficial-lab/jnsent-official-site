const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export function createJsonLd() {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                name: "New Project 2",
                url: siteUrl,
            },
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                name: "New Project 2",
                url: siteUrl,
                publisher: {
                    "@id": `${siteUrl}/#organization`,
                },
            },
        ],
    };
}
