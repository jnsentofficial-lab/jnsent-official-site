"use client";

import { InquiryResult } from "@/widgets/send/ui/InquiryResult";

export default function Panel() {
    return (
        <InquiryResult
            title="예기치 않은 오류가 발생하였습니다"
            description={"서버와 통신 중 오류가 발생해 전송에 실패하였습니다.\n오류가 계속될경우 관지라에게 문의 부탁드립니다."}
        />
    );
}
