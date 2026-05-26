"use client";

import { useState } from "react";
import { useAdminInquiriesQuery, useUpdateInquiryStatusMutation } from "@/entities/inquiry/api/inquiry.query";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { AdminPagination } from "@/widgets/admin/shared/AdminLayout";
import UI from "@/shared/ui/UIComponent";
import { Text } from "@/shared/ui/kit/Text";

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
        <div className="flex flex-col gap-[5.2rem]">
            <section className="flex flex-col">
                {inquiries.length ? (
                    visibleInquiries.map((inquiry) => {
                        const SELECTED = selectedInquiryId === inquiry.id;

                        return (
                            <UI.Button
                                className={`grid w-full grid-cols-[minmax(0,1fr)_13rem] items-center gap-6 border-b border-[var(--adaptive-grey200)] py-8 text-left transition hover:bg-white max-[86rem]:grid-cols-1 `}
                                key={`${inquiry.name}-${inquiry.category}`}
                                onClick={() => onSelectInquiry(inquiry)}
                                type="button"
                            >
                                <div className="flex flex-col gap-[0.8rem]">
                                    {SELECTED ? (
                                        <Text.Shimmer
                                            color={{
                                                start: "#780B12",
                                                end: "#FF6B75",
                                            }}
                                            duration={4}
                                            className="text-[2.0rem]"
                                        >
                                            {inquiry.message}
                                        </Text.Shimmer>
                                    ) : (
                                        <h6 className="text-[2.0rem]">{inquiry.message}</h6>
                                    )}

                                    {/* <strong className="text-2xl font-[700] leading-[1.35]">{inquiry.message}</strong> */}
                                    <section className="flex flex-wrap items-center gap-4 text-lg font-semibold text-black">
                                        <p className="text-[var(--adaptive-black300)] text-[1.4rem]">{inquiry.name}</p>
                                        <p className="text-[var(--adaptive-black300)] text-[1.4rem]">|</p>
                                        <p className="text-[var(--adaptive-black300)] text-[1.4rem]">{new Intl.DateTimeFormat("ko-KR").format(new Date(inquiry.created_at))}</p>
                                        <p className="text-[var(--adaptive-black300)] text-[1.4rem]">~</p>
                                        <p className="text-[var(--adaptive-black300)] text-[1.4rem]">{new Intl.DateTimeFormat("ko-KR").format(new Date(inquiry.updated_at))}</p>
                                    </section>

                                    {/* <select
                                    className="h-10 w-fit bg-black px-4 text-base font-[700] text-white"
                                    aria-label={`${inquiry.name} 문의 상태`}
                                    onChange={(event) => void updateStatus.mutate({ id: inquiry.id, status: event.target.value as Inquiry["status"] })}
                                    onClick={(event) => event.stopPropagation()}
                                    value={inquiry.status}
                                >
                                    <option value="new">new</option>
                                    <option value="in_progress">in_progress</option>
                                    <option value="done">done</option>
                                    <option value="spam">spam</option>
                                </select> */}
                                </div>
                            </UI.Button>
                        );
                    })
                ) : (
                    <p className="py-16 text-2xl font-[700] text-[var(--adaptiveGrey500)]">등록된 문의가 없습니다.</p>
                )}
            </section>

            <AdminPagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
            />
        </div>
    );
}
