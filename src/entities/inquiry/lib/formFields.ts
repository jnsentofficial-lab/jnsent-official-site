export { REGION_OPTIONS } from "@/entities/inquiry/constants/regionOptions";

export const CONTACT_PERIOD_OPTIONS = ["오전", "오후"] as const;
export const CONTACT_HOUR_OPTIONS = Array.from({ length: 12 }, (_, index) => `${index + 1}시`);

export function sanitizeNameInput(value: string) {
    return value.replace(/[^A-Za-zㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "").replace(/\s{2,}/g, " ");
}

export function sanitizeAgeInput(value: string) {
    return value.replace(/\D/g, "").slice(0, 3);
}

export function formatPhoneNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    return digits.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "");
}

export function buildAvailableTime(period: string, hour: string) {
    return period && hour ? `${period} ${hour}` : "";
}

export function buildRegion(province: string, city: string, detailAddress = "") {
    if (!province || !city) {
        return "";
    }

    return [province, city, detailAddress.trim()].filter(Boolean).join(" ");
}
