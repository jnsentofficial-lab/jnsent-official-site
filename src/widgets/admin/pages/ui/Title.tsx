"use client";

import { AdminHeader } from "@/widgets/layout/ui/AdminHeader";

export function Title() {
    return (
        <AdminHeader
            description="공개 상세페이지의 문구와 본문 데이터를 slug 기준으로 관리합니다."
            title="상세페이지 콘텐츠 관리"
        />
    );
}
