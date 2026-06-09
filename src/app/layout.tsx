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
import { Report } from "@/widgets/layout/Report";
import { QuickMenu } from "@/widgets/layout/QuickMenu";

import { buildRootMetadata } from "@/shared/lib/seo";

import "@/shared/style/scss/index.scss";
import "./globals.css";

export const metadata = buildRootMetadata();

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
