export const BJ_SUPPORT_REFERRAL_OPTIONS = ["인스타", "블로그", "파워링크", "인터넷기사", "지인소개", "기타"] as const;

export type BjSupportReferralSource = (typeof BJ_SUPPORT_REFERRAL_OPTIONS)[number];

export const BJ_SUPPORT_REFERRAL_OTHER: BjSupportReferralSource = "기타";
