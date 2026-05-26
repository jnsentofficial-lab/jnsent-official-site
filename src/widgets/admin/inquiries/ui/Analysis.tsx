"use client";

import { useState } from "react";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { AdminWorkspace, AdminTwoPanel } from "@/widgets/admin/shared/AdminLayout";
import { InquiryDetailSidebar } from "@/widgets/admin/inquiries/ui/InquiryDetailSidebar";
import { InquiryTable } from "@/widgets/admin/inquiries/ui/InquiryTable";

export function Analysis() {
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    return (
        <AdminWorkspace>
            <AdminTwoPanel
                sidePanelOpenState={!!selectedInquiry}
                current="문의 관리"
                title="문의 관리"
                left={
                    <InquiryTable
                        selectedInquiryId={selectedInquiry?.id}
                        onSelectInquiry={setSelectedInquiry}
                    />
                }
                right={
                    <InquiryDetailSidebar
                        inquiry={selectedInquiry}
                        onDeleted={() => setSelectedInquiry(null)}
                    />
                }
            />
        </AdminWorkspace>
    );
}
