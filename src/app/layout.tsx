import { AuthProvider } from "@/app/providers/AuthProvider";
import { PopupProvider } from "@/app/providers/PopupProvider";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { GlobalErrorBoundary } from "@/app/providers/GlobalErrorBoundary";
import { GlobalErrorListener } from "@/app/providers/GlobalErrorListener";
import localFont from "next/font/local";

import { Toast } from "@/widgets/layout/Toast";
import { ApiPendingOverlay } from "@/widgets/layout/ApiPendingOverlay";
import { Header } from "@/widgets/layout/Header";
import { Sidebar } from "@/widgets/layout/Sidebar";
import { Progress } from "@/widgets/layout/Progress";
import { Footer } from "@/widgets/layout/Footer";
import { Report } from "@/widgets/layout/Report";
import { QuickMenu } from "@/widgets/layout/QuickMenu";

import { buildRootMetadata } from "@/shared/lib/seo";
import {
    GoogleTagManager,
    GoogleTagManagerNoscript,
} from "@/shared/lib/analytics/GoogleTagManager";

import "@/shared/style/scss/index.scss";
import "./globals.css";

export const metadata = buildRootMetadata();

const suit = localFont({
    src: "../../public/fonts/suit/woff2/SUIT-Variable.woff2",
    weight: "100 900",
    variable: "--font-suit",
    display: "swap",
    preload: false,
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ko"
            className={suit.variable}
        >
            <head>
                <GoogleTagManager />
            </head>
            <body>
                <GoogleTagManagerNoscript />
                <GlobalErrorBoundary>
                    <QueryProvider>
                        <AuthProvider>
                            <GlobalErrorListener />
                            <Header />
                            <Sidebar />
                            <PopupProvider>{children}</PopupProvider>
                            <Footer />
                            <Progress />
                            <Toast />
                            <ApiPendingOverlay />
                            {/* <Report /> */}
                            <QuickMenu />
                        </AuthProvider>
                    </QueryProvider>
                </GlobalErrorBoundary>
            </body>
        </html>
    );
}
