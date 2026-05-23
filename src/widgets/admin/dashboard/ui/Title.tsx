"use client";

import { AdminHeader } from "@/widgets/layout/ui/AdminHeader";

export function Title() {
    return (
        <AdminHeader
            description="콘텐츠 운영 상태와 주요 관리 항목을 한눈에 확인합니다."
            title="관리자 대시보드"
        />
    );
}
