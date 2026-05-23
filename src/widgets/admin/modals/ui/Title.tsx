"use client";

import { AdminHeader } from "@/widgets/layout/ui/AdminHeader";

export function Title() {
    return (
        <AdminHeader
            description="전체 사용자 페이지에 노출되는 전역 모달의 내용, 위치, 닫기 정책을 관리합니다."
            title="전역 모달 관리"
        />
    );
}
