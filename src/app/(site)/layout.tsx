import React from "react";
import Script from "next/script";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const jsonLd = {
        // 여기에 실제 JSON-LD 스키마 내용을 넣으세요 (예시)
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "제이엔에스 엔터테인먼트",
        url: "https://도메인주소",
    };

    return (
        <>
            <script
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                suppressHydrationWarning
                type="application/ld+json"
            />
            <Script
                id="smartlog-script"
                strategy="afterInteractive" // 주석 풀고 사용하시는 걸 추천합니다
                dangerouslySetInnerHTML={{
                    __html: `
      var hpt_info={'_account':'UHPT-300051', '_server': 'a300'};
      
      // 외부 스크립트를 동적으로 로드하는 로직
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
