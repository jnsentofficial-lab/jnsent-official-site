"use client";

import { useEffect, useState } from "react";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { useAdminSidePanelStore } from "@/widgets/admin/shared/model/useAdminSidePanelStore";
import { AdminWorkspace, AdminTwoPanel } from "@/widgets/admin/shared/AdminLayout";
import { InquiryDetailSidebar } from "@/widgets/admin/inquiries/ui/InquiryDetailSidebar";
import { InquiryTable } from "@/widgets/admin/inquiries/ui/InquiryTable";

const PANEL_KEY = "/admin/inquiries";

export function Analysis() {
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const openPanel = useAdminSidePanelStore((state) => state.openPanel);
    const closePanel = useAdminSidePanelStore((state) => state.closePanel);

    useEffect(() => {
        closePanel(PANEL_KEY);
    }, [closePanel]);

    return (
        <AdminWorkspace>
            <AdminTwoPanel
                panelKey={PANEL_KEY}
                current="문의 관리"
                title="문의 관리"
                left={
                    <InquiryTable
                        selectedInquiryId={selectedInquiry?.id}
                        onSelectInquiry={(inquiry) => {
                            setSelectedInquiry(inquiry);
                            openPanel(PANEL_KEY);
                        }}
                    />
                }
                right={
                    <InquiryDetailSidebar inquiry={selectedInquiry} />
                }
            />
        </AdminWorkspace>
    );
}
