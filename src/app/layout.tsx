import type { Metadata } from "next";

import { AuthProvider } from "@/app/providers/AuthProvider";
import { PopupProvider } from "@/app/providers/PopupProvider";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { GlobalErrorBoundary } from "@/app/providers/GlobalErrorBoundary";
import { GlobalErrorListener } from "@/app/providers/GlobalErrorListener";

import { Toast } from "@/widgets/layout/Toast";
import { ApiPendingOverlay } from "@/widgets/layout/ApiPendingOverlay";
import { Header } from "@/widgets/layout/Header";
import { Sidebar } from "@/widgets/layout/Sidebar";
import { Progress } from "@/widgets/layout/Progress";

import { Footer } from "@/widgets/layout/Footer";

import "@/shared/style/scss/index.scss";
import "./globals.css";
import { Report } from "@/widgets/layout/Report";
import { QuickMenu } from "@/widgets/home/ui";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: "제이엔에스 엔터테인먼트",
    description: "가능성을 현실로 만드는 제이엔에스 엔터테인먼트 입니다.",
    openGraph: {
        title: "제이엔에스 엔터테인먼트",
        description: "가능성을 현실로 만드는 제이엔에스 엔터테인먼트 입니다.",
        url: "https://도메인주소",
        siteName: "제이엔에스 엔터테인먼트",
        images: [
            {
                url: "/images/seo/og-default.jpg",
                width: 1200,
                height: 630,
                alt: "제이엔에스 엔터테인먼트",
            },
        ],
        locale: "ko_KR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "제이엔에스 엔터테인먼트",
        description: "가능성을 현실로 만드는 제이엔에스 엔터테인먼트 입니다.",
        images: ["/images/seo/og-default.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <GlobalErrorBoundary>
                    <QueryProvider>
                        <AuthProvider>
                            <GlobalErrorListener />
                            <Header />
                            <Sidebar />
                            <PopupProvider>
                                {children}
                            </PopupProvider>
                            <Footer />
                            <Progress />
                            <Toast />
                            <ApiPendingOverlay />
                            <Report />
                            <QuickMenu />
                        </AuthProvider>
                    </QueryProvider>
                </GlobalErrorBoundary>
            </body>
        </html>
    );
}
