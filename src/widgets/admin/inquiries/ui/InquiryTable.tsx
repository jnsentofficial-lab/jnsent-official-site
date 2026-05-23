"use client";

import { useState } from "react";
import { useAdminInquiriesQuery, useUpdateInquiryStatusMutation } from "@/entities/inquiry/api/inquiry.query";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { AdminPagination } from "@/widgets/admin/shared/AdminLayout";

type InquiryTableProps = {
    selectedInquiryId?: string;
    onSelectInquiry: (inquiry: Inquiry) => void;
};

export function InquiryTable({ selectedInquiryId, onSelectInquiry }: InquiryTableProps) {
    const { data: inquiries = [] } = useAdminInquiriesQuery();
    const updateStatus = useUpdateInquiryStatusMutation();
    const pageSize = 5;
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(inquiries.length / pageSize));
    const visibleInquiries = inquiries.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="grid gap-0">
            {inquiries.length ? (
                visibleInquiries.map((inquiry) => (
                    <button
                        className={`grid w-full grid-cols-[minmax(0,1fr)_13rem] items-center gap-6 border-b border-[var(--adaptiveGrey200)] py-8 text-left transition hover:bg-white max-[86rem]:grid-cols-1 ${selectedInquiryId === inquiry.id ? "text-[var(--adaptiveRed300)]" : "text-black"}`}
                        key={`${inquiry.name}-${inquiry.category}`}
                        onClick={() => onSelectInquiry(inquiry)}
                        type="button"
                    >
                        <span className="grid gap-5">
                            <strong className="text-2xl font-black leading-[1.35]">{inquiry.message}</strong>
                            <span className="flex flex-wrap items-center gap-4 text-lg font-semibold text-black">
                                <span>{inquiry.name}</span>
                                <span>|</span>
                                <span>{new Intl.DateTimeFormat("ko-KR").format(new Date(inquiry.created_at))}</span>
                                <span>~</span>
                                <span>{new Intl.DateTimeFormat("ko-KR").format(new Date(inquiry.updated_at))}</span>
                            </span>
                            <select
                                className="h-10 w-fit bg-black px-4 text-base font-black text-white"
                                aria-label={`${inquiry.name} 문의 상태`}
                                onChange={(event) => void updateStatus.mutate({ id: inquiry.id, status: event.target.value as Inquiry["status"] })}
                                onClick={(event) => event.stopPropagation()}
                                value={inquiry.status}
                            >
                                <option value="new">new</option>
                                <option value="in_progress">in_progress</option>
                                <option value="done">done</option>
                                <option value="spam">spam</option>
                            </select>
                        </span>
                        <span className="flex items-center justify-end gap-8 text-center text-xl font-black">
                            <span>♧<br /><small>50+</small></span>
                            <span className="h-10 w-px bg-black" />
                            <span>◉<br /><small>50+</small></span>
                        </span>
                    </button>
                ))
            ) : (
                <p className="py-16 text-2xl font-black text-[var(--adaptiveGrey500)]">등록된 문의가 없습니다.</p>
            )}
            <AdminPagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
    );
}
