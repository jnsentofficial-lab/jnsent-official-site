"use client";

import { SendSuccessPageProvider } from "@/features/send/success/model/SubscriptionContext";
import { InquiryResult } from "@/widgets/send/ui/InquiryResult";

export default function Panel() {
    return (
        <SendSuccessPageProvider>
            <InquiryResult
                title="문의를 접수하였습니다"
                description={"남겨주신 문의를 꼼꼼하게 확인 후\n남겨주신 연락처/메일을 통해 답변드리겠습니다"}
            />
        </SendSuccessPageProvider>
    );
}
