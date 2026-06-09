import { describe, expect, it } from "vitest";

import { createInquirySchema, updateInquiryStatusSchema } from "@/shared/lib/validation/schemas/inquiry";

describe("createInquirySchema", () => {
    it("필수 필드가 있으면 통과한다", () => {
        const result = createInquirySchema.safeParse({
            name: "홍길동",
            phone: "010-1234-5678",
            message: "문의합니다",
            category: "bj_support",
        });

        expect(result.success).toBe(true);
    });

    it("이메일 필수 카테고리에서 이메일이 없으면 실패한다", () => {
        const result = createInquirySchema.safeParse({
            name: "홍길동",
            phone: "010-1234-5678",
            message: "문의합니다",
            category: "consulting",
        });

        expect(result.success).toBe(false);
    });
});

describe("updateInquiryStatusSchema", () => {
    it("허용된 상태만 통과한다", () => {
        expect(updateInquiryStatusSchema.safeParse({ status: "done" }).success).toBe(true);
        expect(updateInquiryStatusSchema.safeParse({ status: "invalid" }).success).toBe(false);
    });
});
