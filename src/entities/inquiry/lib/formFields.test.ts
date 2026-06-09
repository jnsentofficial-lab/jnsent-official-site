import { describe, expect, it } from "vitest";

import { buildAvailableTime, buildRegion, formatPhoneNumber, requiresInquiryEmail, sanitizeNameInput } from "@/entities/inquiry/lib/formFields";

describe("formFields", () => {
    it("이름 입력에서 허용되지 않은 문자를 제거한다", () => {
        expect(sanitizeNameInput("홍길동123!")).toBe("홍길동");
    });

    it("전화번호를 하이픈 형식으로 포맷한다", () => {
        expect(formatPhoneNumber("01012345678")).toBe("010-1234-5678");
    });

    it("연락 가능 시각을 조합한다", () => {
        expect(buildAvailableTime("오전", "9시")).toBe("오전 9시");
        expect(buildAvailableTime("", "9시")).toBe("");
    });

    it("지역 문자열을 조합한다", () => {
        expect(buildRegion("서울특별시", "강남구", "테헤란로")).toBe("서울특별시 강남구 테헤란로");
        expect(buildRegion("서울특별시", "", "")).toBe("");
    });

    it("이메일 필수 카테고리를 판별한다", () => {
        expect(requiresInquiryEmail("consulting")).toBe(true);
        expect(requiresInquiryEmail("bj_support")).toBe(false);
    });
});
