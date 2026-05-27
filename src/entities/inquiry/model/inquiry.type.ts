import type { Database } from "@/shared/types/Database";

export type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];
export type AdminInquiry = Inquiry & {
    hasAnswer: boolean;
};
export type InquiryComment = Database["public"]["Tables"]["inquiry_comments"]["Row"];
export type CreateInquiryPayload = Pick<Inquiry, "name" | "phone" | "message"> &
    Partial<Pick<Inquiry, "email" | "category" | "gender" | "age" | "region" | "available_time" | "support_label" | "source">> &
    Pick<Database["public"]["Tables"]["inquiries"]["Insert"], "message_body">;
export type UpdateInquiryStatusPayload = Pick<Inquiry, "id" | "status">;
export type DeleteInquiryPayload = Pick<Inquiry, "id">;
export type CreateInquiryCommentPayload = Pick<InquiryComment, "inquiry_id" | "manager_name" | "message"> & Pick<Database["public"]["Tables"]["inquiry_comments"]["Insert"], "message_body">;
