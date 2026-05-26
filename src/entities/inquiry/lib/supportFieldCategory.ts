export const HOME_INQUIRY_SUPPORT_FIELDS = ["BJ지원", "장비 렌탈", "스튜디오 대여", "엑셀 스튜디오 대관", "엔터 창업"] as const;

export type HomeInquirySupportField = (typeof HOME_INQUIRY_SUPPORT_FIELDS)[number];

export const SUPPORT_FIELD_CATEGORY_MAP: Record<HomeInquirySupportField, string> = {
    "BJ지원": "bj_support",
    "장비 렌탈": "equipment_rental",
    "스튜디오 대여": "studio_rental",
    "엑셀 스튜디오 대관": "excel_studio_rental",
    "엔터 창업": "consulting",
};
