"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type MainProps = {
    children: ReactNode;
    id?: string;
    className?: {
        container?: string;
        inner?: string;
    };
};

export default function Main({ children, id, className }: MainProps) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin") && pathname !== "/admin/login";
    const containerClassName = ["flex-1", isAdmin ? "bg-[var(--adaptiveGrey50)] mobile:pl-0 pc:pl-[24rem]" : "overflow-hidden", className?.container ?? ""].join(" ");
    const innerClassName = [isAdmin ? "" : "", className?.inner ?? ""].join(" ");
    // flex-1 bg-[var(--adaptiveGrey50)] pl-[24rem] max-[86rem]:pl-0 min-h-[calc(100dvh-10.8rem)]
    return (
        <main
            className={containerClassName}
            id={id}
        >
            <div className={innerClassName}>{children}</div>
        </main>
    );
}
