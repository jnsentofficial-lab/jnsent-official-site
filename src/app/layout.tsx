import type { Metadata } from "next";
import localFont from "next/font/local";
import { createJsonLd } from "@/shared/lib/JsonLd";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { GlobalErrorBoundary } from "@/app/providers/GlobalErrorBoundary";
import { GlobalErrorListener } from "@/app/providers/GlobalErrorListener";
import { PopupProvider } from "@/app/providers/PopupProvider";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { Footer } from "@/widgets/layout/Footer";
import { Header } from "@/widgets/layout/Header";
import { Progress } from "@/widgets/layout/Progress";
import { Sidebar } from "@/widgets/layout/Sidebar";
import { Toast } from "@/widgets/layout/Toast";
import "./globals.css";

const suit = localFont({
    src: [
        {
            path: "../../public/suit/woff2/SUIT-Thin.woff2",
            weight: "100",
            style: "normal",
        },
        {
            path: "../../public/suit/woff2/SUIT-ExtraLight.woff2",
            weight: "200",
            style: "normal",
        },
        {
            path: "../../public/suit/woff2/SUIT-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/suit/woff2/SUIT-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/suit/woff2/SUIT-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/suit/woff2/SUIT-SemiBold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/suit/woff2/SUIT-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/suit/woff2/SUIT-ExtraBold.woff2",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/suit/woff2/SUIT-Heavy.woff2",
            weight: "900",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-suit",
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
                {/* <Script
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
                /> */}
            </head>
            <body className={`${suit.variable} ${suit.className} m-0 min-h-screen bg-white font-sans text-slate-900`}>
                <GlobalErrorBoundary>
                    <QueryProvider>
                        <AuthProvider>
                            <GlobalErrorListener />
                            <Header />
                            <Sidebar />
                            <PopupProvider>
                                <div className="flex min-h-screen flex-col">{children}</div>
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
