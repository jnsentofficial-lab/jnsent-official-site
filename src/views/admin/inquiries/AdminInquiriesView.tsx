"use client";

import { useState } from "react";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { AdminHeader } from "@/widgets/adminHeader/AdminHeader";
import { AdminSidebar } from "@/widgets/adminSidebar/AdminSidebar";
import { InquiryDetailSidebar } from "@/widgets/inquiryTable/InquiryDetailSidebar";
import { InquiryTable } from "@/widgets/inquiryTable/InquiryTable";

export function AdminInquiriesView() {
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    return (
        <main className="grid min-h-screen grid-cols-[24rem_minmax(0,1fr)] bg-slate-100 max-[86rem]:grid-cols-1">
            <AdminSidebar />
            <section className="p-8 max-[86rem]:px-4 max-[86rem]:py-6">
                <AdminHeader
                    description="상담 문의를 확인하고 처리 상태를 관리합니다."
                    title="문의 관리"
                />
                <div className="grid grid-cols-[minmax(0,1fr)_38rem] gap-6 max-[120rem]:grid-cols-1">
                    <section className="rounded-lg border border-slate-200 bg-white p-6">
                        <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">문의 목록</h2>
                        <InquiryTable
                            selectedInquiryId={selectedInquiry?.id}
                            onSelectInquiry={setSelectedInquiry}
                        />
                    </section>
                    <InquiryDetailSidebar inquiry={selectedInquiry} />
                </div>
            </section>
        </main>
    );
}
