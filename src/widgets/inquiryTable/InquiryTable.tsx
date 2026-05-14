"use client";

import { useAdminInquiriesQuery, useUpdateInquiryStatusMutation } from "@/entities/inquiry/api/inquiry.query";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";

type InquiryTableProps = {
    selectedInquiryId?: string;
    onSelectInquiry: (inquiry: Inquiry) => void;
};

export function InquiryTable({ selectedInquiryId, onSelectInquiry }: InquiryTableProps) {
    const { data: inquiries = [] } = useAdminInquiriesQuery();
    const updateStatus = useUpdateInquiryStatusMutation();

    return (
        <div
            className="grid overflow-hidden rounded-lg border border-slate-200"
            role="table"
            aria-label="문의 목록"
        >
            <div
                className="grid grid-cols-[1fr_1fr_minmax(22rem,2fr)_0.8fr] bg-slate-50 font-bold max-[86rem]:grid-cols-1"
                role="row"
            >
                <span
                    className="px-4 py-3.5 leading-[1.5] text-slate-700"
                    role="columnheader"
                >
                    이름
                </span>
                <span
                    className="px-4 py-3.5 leading-[1.5] text-slate-700"
                    role="columnheader"
                >
                    분류
                </span>
                <span
                    className="px-4 py-3.5 leading-[1.5] text-slate-700"
                    role="columnheader"
                >
                    내용
                </span>
                <span
                    className="px-4 py-3.5 leading-[1.5] text-slate-700"
                    role="columnheader"
                >
                    상태
                </span>
            </div>
            {inquiries.length ? (
                inquiries.map((inquiry) => (
                    <div
                        className={`grid w-full cursor-pointer grid-cols-[1fr_1fr_minmax(22rem,2fr)_0.8fr] border-t border-slate-200 bg-white text-left transition hover:bg-slate-50 max-[86rem]:grid-cols-1 ${selectedInquiryId === inquiry.id ? "bg-blue-50" : ""}`}
                        key={`${inquiry.name}-${inquiry.category}`}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                onSelectInquiry(inquiry);
                            }
                        }}
                        onClick={() => onSelectInquiry(inquiry)}
                        role="row"
                        tabIndex={0}
                    >
                        <span
                            className="px-4 py-3.5 leading-[1.5] text-slate-700"
                            role="cell"
                        >
                            {inquiry.name}
                        </span>
                        <span
                            className="px-4 py-3.5 leading-[1.5] text-slate-700"
                            role="cell"
                        >
                            {inquiry.category}
                        </span>
                        <span
                            className="px-4 py-3.5 leading-[1.5] text-slate-700"
                            role="cell"
                        >
                            {inquiry.message}
                        </span>
                        <span
                            className="px-4 py-3.5 leading-[1.5] text-slate-700"
                            role="cell"
                        >
                            <select
                                className="min-h-10 rounded-lg border border-slate-300 px-3"
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
                    </div>
                ))
            ) : (
                <div
                    className="grid grid-cols-[1fr_1fr_minmax(22rem,2fr)_0.8fr] border-t border-slate-200 max-[86rem]:grid-cols-1"
                    role="row"
                >
                    <span
                        className="px-4 py-3.5 leading-[1.5] text-slate-700"
                        role="cell"
                    >
                        등록된 문의가 없습니다.
                    </span>
                    <span
                        className="px-4 py-3.5 leading-[1.5] text-slate-700"
                        role="cell"
                    >
                        -
                    </span>
                    <span
                        className="px-4 py-3.5 leading-[1.5] text-slate-700"
                        role="cell"
                    >
                        -
                    </span>
                    <span
                        className="px-4 py-3.5 leading-[1.5] text-slate-700"
                        role="cell"
                    >
                        -
                    </span>
                </div>
            )}
        </div>
    );
}
