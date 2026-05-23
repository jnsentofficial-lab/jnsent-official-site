import type { Metadata } from "next";
import localFont from "next/font/local";

import { AuthProvider } from "@/app/providers/AuthProvider";
import { PopupProvider } from "@/app/providers/PopupProvider";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { GlobalErrorBoundary } from "@/app/providers/GlobalErrorBoundary";
import { GlobalErrorListener } from "@/app/providers/GlobalErrorListener";

import { Toast } from "@/widgets/layout/Toast";
import { Header } from "@/widgets/layout/Header";
import { Sidebar } from "@/widgets/layout/Sidebar";
import { Progress } from "@/widgets/layout/Progress";

import { createJsonLd } from "@/shared/lib/JsonLd";

import "./globals.css";
import { Footer } from "@/widgets/layout/Footer";
import Script from "next/script";

const nanumSquare = localFont({
    src: [
        {
            path: "../../public/fonts/NanumSquare/NanumSquareL.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/NanumSquare/NanumSquareR.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/NanumSquare/NanumSquareB.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/NanumSquare/NanumSquareEB.woff2",
            weight: "800",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-nanum-square",
});

export const metadata: Metadata = {
    title: "New Project 2",
    description: "Corporate entertainment CMS site",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = createJsonLd();

    return (
        <html lang="ko">
            <head>
                <script
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            </head>
            <body className={`${nanumSquare.variable} ${nanumSquare.className}`}>
                <GlobalErrorBoundary>
                    <QueryProvider>
                        <AuthProvider>
                            <GlobalErrorListener />
                            <Header />
                            <Sidebar />
                            <PopupProvider>
                                {children}
                                {/* <RouteTransition className="flex min-h-screen flex-col">{children}</RouteTransition> */}
                                {/* <Transition.FadeInOut>{children}</Transition.FadeInOut> */}
                            </PopupProvider>
                            <Footer />
                            <Progress />
                            <Toast />
                        </AuthProvider>
                    </QueryProvider>
                </GlobalErrorBoundary>
            </body>
        </html>
    );
}
