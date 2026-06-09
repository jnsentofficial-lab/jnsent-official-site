import { z } from "zod";

const ratioSchema = z.number().min(0).max(1);

export const createReportSchema = z
    .object({
        pathname: z.string().trim().min(1),
        report_id: z.string().trim().min(1),
        report_type: z.enum(["group", "item"]),
        message: z.string().trim().min(1),
        x_ratio: ratioSchema,
        y_ratio: ratioSchema,
        element_x_ratio: ratioSchema.nullable().optional(),
        element_y_ratio: ratioSchema.nullable().optional(),
        scroll_y: z.number().int().min(0),
        document_y: z.number().int().min(0),
        viewport_width: z.number().int().positive(),
        viewport_height: z.number().int().positive(),
        design_width: z.number().int().positive().optional(),
        design_height: z.number().int().positive().optional(),
    })
    .superRefine((data, ctx) => {
        const hasElementX = data.element_x_ratio !== null && data.element_x_ratio !== undefined;
        const hasElementY = data.element_y_ratio !== null && data.element_y_ratio !== undefined;

        if (hasElementX !== hasElementY) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "리포트 요소 좌표를 다시 확인해주세요.",
            });
        }
    });

export type CreateReportInput = z.infer<typeof createReportSchema>;
