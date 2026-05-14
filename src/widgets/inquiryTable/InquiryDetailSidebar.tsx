"use client";

import { FormEvent } from "react";
import { useCreateInquiryCommentMutation, useInquiryCommentsQuery } from "@/entities/inquiry/api/inquiry.query";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";

type InquiryDetailSidebarProps = {
    inquiry: Inquiry | null;
};

function formatDate(value: string) {
    return new Intl.DateTimeFormat("ko-KR", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

export function InquiryDetailSidebar({ inquiry }: InquiryDetailSidebarProps) {
    const { data: comments = [], isLoading } = useInquiryCommentsQuery(inquiry?.id);
    const createComment = useCreateInquiryCommentMutation();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!inquiry) {
            return;
        }

        const formData = new FormData(event.currentTarget);
        await createComment.mutateAsync({
            inquiry_id: inquiry.id,
            manager_name: String(formData.get("managerName") ?? "").trim(),
            message: String(formData.get("message") ?? "").trim(),
        });
        event.currentTarget.reset();
    }

    if (!inquiry) {
        return (
            <aside className="rounded-lg border border-slate-200 bg-white p-6 text-slate-500">
                문의를 선택하면 상세 내용과 담당자 답변을 확인할 수 있습니다.
            </aside>
        );
    }

    return (
        <aside className="sticky top-6 grid max-h-[calc(100vh-4.8rem)] gap-4 overflow-auto rounded-lg border border-slate-200 bg-white p-6">
            <section>
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                        <p className="m-0 text-sm font-bold text-blue-700">문의 내용</p>
                        <h3 className="mt-1 mb-0 text-xl text-slate-900">{inquiry.name}</h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{inquiry.status}</span>
                </div>
                <dl className="grid gap-3 text-sm">
                    <div>
                        <dt className="font-bold text-slate-500">연락처</dt>
                        <dd className="m-0 text-slate-800">{inquiry.phone}</dd>
                    </div>
                    <div>
                        <dt className="font-bold text-slate-500">분류</dt>
                        <dd className="m-0 text-slate-800">{inquiry.category}</dd>
                    </div>
                    <div>
                        <dt className="font-bold text-slate-500">접수일</dt>
                        <dd className="m-0 text-slate-800">{formatDate(inquiry.created_at)}</dd>
                    </div>
                    <div>
                        <dt className="font-bold text-slate-500">메세지</dt>
                        <dd className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-50 p-4 leading-[1.7] text-slate-800">{inquiry.message}</dd>
                    </div>
                </dl>
            </section>

            <section className="border-t border-slate-200 pt-4">
                <p className="m-0 mb-3 text-sm font-bold text-blue-700">담당자 답변</p>
                <form
                    className="grid gap-3"
                    onSubmit={(event) => {
                        void handleSubmit(event);
                    }}
                >
                    <label className="grid gap-2 text-sm font-bold text-slate-700">
                        담당자 이름
                        <input
                            className="min-h-11 rounded-lg border border-slate-300 px-3"
                            name="managerName"
                            placeholder="담당자 이름"
                            required
                            type="text"
                        />
                    </label>
                    <label className="grid gap-2 text-sm font-bold text-slate-700">
                        답변 내용
                        <textarea
                            className="min-h-28 resize-y rounded-lg border border-slate-300 px-3 py-3"
                            name="message"
                            placeholder="문의에 대한 코멘트를 작성하세요."
                            required
                        />
                    </label>
                    <button
                        className="min-h-11 rounded-lg bg-blue-600 px-4 font-bold text-white disabled:bg-slate-300"
                        disabled={createComment.isPending}
                        type="submit"
                    >
                        {createComment.isPending ? "저장 중" : "답변 저장"}
                    </button>
                </form>

                <div className="mt-5 grid gap-3">
                    {isLoading ? <p className="m-0 text-sm text-slate-500">답변을 불러오는 중입니다.</p> : null}
                    {!isLoading && comments.length === 0 ? <p className="m-0 text-sm text-slate-500">아직 작성된 담당자 답변이 없습니다.</p> : null}
                    {comments.map((comment) => (
                        <article
                            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                            key={comment.id}
                        >
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <strong className="text-sm text-slate-900">{comment.manager_name}</strong>
                                <span className="text-xs text-slate-500">{formatDate(comment.created_at)}</span>
                            </div>
                            <p className="m-0 whitespace-pre-wrap text-sm leading-[1.7] text-slate-700">{comment.message}</p>
                        </article>
                    ))}
                </div>
            </section>
        </aside>
    );
}
