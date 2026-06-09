import { describe, expect, it } from "vitest";

import { formatPriceWithCommas } from "@/shared/utils/formatPrice";

describe("formatPriceWithCommas", () => {
    it("숫자에 천 단위 콤마를 추가한다", () => {
        expect(formatPriceWithCommas(2500000)).toBe("2,500,000");
    });

    it("문자열 숫자도 처리한다", () => {
        expect(formatPriceWithCommas("1234")).toBe("1,234");
    });

    it("숫자가 아니면 0을 반환한다", () => {
        expect(formatPriceWithCommas("abc")).toBe("0");
    });
});
