import { createSiteJsonLd } from "@/shared/lib/JsonLd";
import Script from "next/script";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const jsonLd = createSiteJsonLd();

    return (
        <>
            <script
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                suppressHydrationWarning
                type="application/ld+json"
            />
            <Script
                id="smartlog-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
      var hpt_info={'_account':'UHPT-300051', '_server': 'a300'};
      
      (function() {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//cdn.smlog.co.kr/core/smart_renew.js';
        s.charset = 'utf-8';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      })();
    `,
                }}
            />
            {children}
        </>
    );
}
