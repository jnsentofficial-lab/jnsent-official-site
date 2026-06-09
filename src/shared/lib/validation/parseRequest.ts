import type { ZodSchema } from "zod";

import { apiError } from "@/shared/lib/api/server";

type ParseSuccess<T> = { success: true; data: T };
type ParseFailure = { success: false; response: ReturnType<typeof apiError> };

export async function parseJsonBody<T>(request: Request, schema: ZodSchema<T>): Promise<ParseSuccess<T> | ParseFailure> {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return { success: false, response: apiError("요청 본문이 올바르지 않습니다.", 400) };
    }

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
        const message = parsed.error.issues[0]?.message ?? "요청 값을 다시 확인해주세요.";
        return { success: false, response: apiError(message, 400) };
    }

    return { success: true, data: parsed.data };
}
