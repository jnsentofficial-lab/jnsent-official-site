"use client";

import { useState } from "react";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { InquiryDetailSidebar } from "@/widgets/admin/inquiries/ui/InquiryDetailSidebar";
import { InquiryTable } from "@/widgets/admin/inquiries/ui/InquiryTable";

export function Analysis() {
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    return (
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
    );
}
