"use client";

import { BJ_SUPPORT_REFERRAL_OTHER } from "@/entities/inquiry/lib/bjSupportReferral";
import type { FieldErrors } from "@/widgets/home/modal/inquiryModal/types";

export function validateInquiryFields(values: {
    name: string;
    age: string;
    region: string;
    phone: string;
    availableTime: string;
    referralSource: string;
    referralDetail: string;
    agreed: boolean;
}): FieldErrors {
    const errors: FieldErrors = {};

    if (!values.name) errors.name = "이름을 입력해 주세요.";
    if (!values.age) errors.age = "나이를 입력해 주세요.";
    if (!values.region) errors.region = "지역을 입력해 주세요.";
    if (!values.phone) errors.phone = "전화번호를 입력해 주세요.";
    if (!values.availableTime) errors.availableTime = "연락 가능한 시각을 입력해 주세요.";
    if (!values.referralSource) errors.referralSource = "유입 경로를 선택해 주세요.";
    if (values.referralSource === BJ_SUPPORT_REFERRAL_OTHER && !values.referralDetail.trim()) {
        errors.referralDetail = "유입 경로를 입력해 주세요.";
    }
    if (!values.agreed) errors.agreed = "개인정보 취급 방침에 동의해 주세요.";

    return errors;
}