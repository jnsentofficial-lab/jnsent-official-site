import { GlobalModalLayer } from "@/widgets/globalModal/GlobalModalLayer";
import { SiteFooter } from "@/widgets/siteFooter/SiteFooter";
import { SiteHeader } from "@/widgets/siteHeader/SiteHeader";

export const revalidate = 60;

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
            <GlobalModalLayer />
        </div>
    );
}
