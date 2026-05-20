"use client";

import { AdminHeader } from "@/widgets/layout/ui/AdminHeader";

export function Title() {
    return (
        <AdminHeader
            description="NEWS 목록과 상세 콘텐츠를 slug 기준으로 작성하고 관리합니다."
            title="NEWS 관리"
        />
    );
}
