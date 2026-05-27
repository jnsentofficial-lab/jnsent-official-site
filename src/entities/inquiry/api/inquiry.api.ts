import { clientApi, type ApiResponse } from "@/shared/lib/api/client";
import type { AdminInquiry, CreateInquiryCommentPayload, CreateInquiryPayload, DeleteInquiryPayload, Inquiry, InquiryComment, UpdateInquiryStatusPayload } from "@/entities/inquiry/model/inquiry.type";

export async function createInquiryFetch(payload: CreateInquiryPayload) {
    return clientApi.post<ApiResponse<Inquiry>>("/api/inquiries", {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        category: payload.category,
        message: payload.message,
        message_body: payload.message_body,
        gender: payload.gender,
        age: payload.age,
        region: payload.region,
        available_time: payload.available_time,
        support_label: payload.support_label,
        source: payload.source,
    });
}

export async function getAdminInquiriesFetch() {
    return clientApi.get<ApiResponse<AdminInquiry[]>>("/api/admin/inquiries");
}

export async function updateInquiryStatusFetch(payload: UpdateInquiryStatusPayload) {
    return clientApi.patch<ApiResponse<Inquiry>>(`/api/admin/inquiries/${payload.id}`, {
        status: payload.status,
    });
}

export async function deleteInquiryFetch(payload: DeleteInquiryPayload) {
    return clientApi.delete<ApiResponse<Inquiry>>(`/api/admin/inquiries/${payload.id}`);
}

export async function getInquiryCommentsFetch(inquiryId: string) {
    return clientApi.get<ApiResponse<InquiryComment[]>>(`/api/admin/inquiries/${inquiryId}/comments`);
}

export async function createInquiryCommentFetch(payload: CreateInquiryCommentPayload) {
    return clientApi.post<ApiResponse<InquiryComment>>(`/api/admin/inquiries/${payload.inquiry_id}/comments`, {
        manager_name: payload.manager_name,
        message: payload.message,
        message_body: payload.message_body,
    });
}
