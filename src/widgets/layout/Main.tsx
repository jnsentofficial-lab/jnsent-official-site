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
    const reportIdMap: Record<string, string> = {
        "/": "사이트 메인 영역",
        "/consulting": "엔터창업 메인 영역",
        "/bjSupport": "BJ 지원 메인 영역",
        "/equipmentRental": "장비렌탈 메인 영역",
        "/studioRental": "스튜디오 대여 대관 메인 영역",
        "/news": "뉴스 메인 영역",
        "/admin/inquiries": "관리자 문의 관리 메인 영역",
        "/admin/account/manager": "관리자 계정 관리 메인 영역",
        "/admin/modals": "관리자 팝업 관리 메인 영역",
        "/admin/news": "관리자 뉴스 관리 메인 영역",
        "/admin/login": "관리자 로그인 메인 영역",
    };
    const reportId = reportIdMap[pathname] ?? `${pathname.replaceAll("/", " ").trim()} 메인 영역`;
    // const containerClassName = ["flex-1", isAdmin ? "bg-[var(--adaptiveGrey50)] mobile:pl-0 pc:pl-[24rem]" : "", className?.container ?? ""].join(" ");
    const containerClassName = ["flex-1", isAdmin ? "bg-[var(--adaptiveGrey50)] mobile:pl-0 pc:pl-[24rem]" : "overflow-hidden", className?.container ?? ""].join(" ");
    const innerClassName = [isAdmin ? "" : "", className?.inner ?? ""].join(" ");
    // flex-1 bg-[var(--adaptiveGrey50)] pl-[24rem] max-[86rem]:pl-0 min-h-[calc(100dvh-10.8rem)]
    return (
        <main
            className={containerClassName}
            id={id}
            data-report-id={reportId}
            data-report-type="group"
        >
            <div className={innerClassName}>{children}</div>
        </main>
    );
}
