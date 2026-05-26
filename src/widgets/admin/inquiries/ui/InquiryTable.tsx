"use client";

import { Fragment, useState } from "react";
import { useAdminInquiriesQuery, useDeleteInquiryMutation } from "@/entities/inquiry/api/inquiry.query";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { AdminListRow, AdminListSection, AdminPagination, ConfirmDialog } from "@/widgets/admin/shared/AdminLayout";
import UI from "@/shared/ui/UIComponent";
import { Text } from "@/shared/ui/kit/Text";
import Image from "next/image";

type InquiryTableProps = {
    selectedInquiryId?: string;
    onSelectInquiry: (inquiry: Inquiry) => void;
};

export function InquiryTable({ selectedInquiryId, onSelectInquiry }: InquiryTableProps) {
    const { data: inquiries = [], isLoading } = useAdminInquiriesQuery();
    const deleteInquiry = useDeleteInquiryMutation();
    const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null);
    const pageSize = 5;
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(inquiries.length / pageSize));
    const visibleInquiries = inquiries.slice((page - 1) * pageSize, page * pageSize);

    return (
        <AdminListSection
            className="gap-[5.2rem]"
            empty={<p className="py-16 text-2xl font-[700] text-[var(--adaptiveGrey500)]">등록된 문의가 없습니다.</p>}
            hasItems={inquiries.length > 0}
            isLoading={isLoading}
            pagination={
                <AdminPagination
                    page={page}
                    totalPages={totalPages}
                    onChange={setPage}
                />
            }
        >
            <section className="flex flex-col justify-center">
                {visibleInquiries.map((inquiry, mappedIdx) => {
                    const SELECTED = selectedInquiryId === inquiry.id;

                    return (
                        <Fragment key={`${inquiry.name}-${inquiry.category}`}>
                            <AdminListRow
                                actions={
                                    <UI.Button
                                        className="h-full px-[3.2rem] bg-transparent hover:bg-[var(--adaptive-red500)]"
                                        onClick={() => setDeleteTarget(inquiry)}
                                        type="button"
                                    >
                                        <Image
                                            src={"/images/icon/outlined/ico-outlined-trash.svg"}
                                            alt=""
                                            width={32}
                                            height={32}
                                        />

                                        <p>삭제</p>
                                    </UI.Button>
                                }
                                contentClassName="flex-col items-start"
                                description={
                                    <div className="flex flex-wrap items-center gap-4 text-lg font-semibold text-black">
                                        <p className="text-[var(--adaptive-black300)] text-[1.4rem]">{inquiry.name}</p>
                                        <p className="text-[var(--adaptive-black300)] text-[1.4rem]">|</p>
                                        <p className="text-[var(--adaptive-black300)] text-[1.4rem]">{new Intl.DateTimeFormat("ko-KR").format(new Date(inquiry.created_at))}</p>
                                        <p className="text-[var(--adaptive-black300)] text-[1.4rem]">~</p>
                                        <p className="text-[var(--adaptive-black300)] text-[1.4rem]">{new Intl.DateTimeFormat("ko-KR").format(new Date(inquiry.updated_at))}</p>
                                    </div>
                                }
                                onClick={() => onSelectInquiry(inquiry)}
                                selected={SELECTED}
                                title={
                                    SELECTED ? (
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
                                    )
                                }
                            />

                            {visibleInquiries.length !== mappedIdx + 1 ? <div className="w-full h-[0.1rem] bg-[var(--adaptive-grey200)]" /> : null}
                        </Fragment>
                    );
                })}
            </section>

            <ConfirmDialog
                open={Boolean(deleteTarget)}
                title="선택한 문의를 삭제 할까요?"
                description="선택하신 문의를 삭제합니다. 신중하게 선택해주세요."
                targetLabel={deleteTarget?.message}
                confirmLabel="삭제하기"
                tone="delete"
                onCancel={() => setDeleteTarget(null)}
                onConfirm={() => {
                    if (deleteTarget) {
                        deleteInquiry.mutate({ id: deleteTarget.id });
                    }
                    setDeleteTarget(null);
                }}
            />
        </AdminListSection>
    );
}
