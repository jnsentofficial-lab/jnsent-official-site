import { z } from "zod";

import { INQUIRY_EMAIL_REQUIRED_CATEGORIES } from "@/entities/inquiry/lib/formFields";

const optionalString = z.string().trim().optional().nullable();

export const createInquirySchema = z
    .object({
        name: z.string().trim().min(1, "이름을 입력해주세요.").max(20),
        phone: z.string().trim().min(1, "연락처를 입력해주세요.").max(20),
        message: z.string().trim().min(1, "문의 내용을 입력해주세요."),
        email: optionalString,
        category: z.string().trim().min(1).default("bj_support"),
        source: z.string().trim().min(1).default("bj_support"),
        gender: optionalString,
        age: optionalString,
        region: optionalString,
        province: optionalString,
        city: optionalString,
        town: optionalString,
        available_time: optionalString,
        available_period: optionalString,
        available_hour: optionalString,
        support_label: optionalString,
        message_body: z.record(z.string(), z.unknown()).nullable().optional(),
    })
    .superRefine((data, ctx) => {
        if (INQUIRY_EMAIL_REQUIRED_CATEGORIES.has(data.category) && !data.email) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "이메일을 입력해주세요.",
                path: ["email"],
            });
        }
    });

export const updateInquiryStatusSchema = z.object({
    status: z.enum(["new", "in_progress", "done", "spam"], {
        message: "유효하지 않은 문의 상태입니다.",
    }),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
export type UpdateInquiryStatusInput = z.infer<typeof updateInquiryStatusSchema>;
