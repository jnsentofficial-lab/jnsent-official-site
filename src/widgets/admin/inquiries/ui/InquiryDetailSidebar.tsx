"use client";

import { FormEvent, useState } from "react";
import { useUploadImageMutation } from "@/entities/asset/api/asset.query";
import { useCreateInquiryCommentMutation, useDeleteInquiryMutation, useInquiryCommentsQuery } from "@/entities/inquiry/api/inquiry.query";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { emptyRichTextContent, extractRichTextPlainText, toJsonContent } from "@/shared/lib/richText/richText";
import type { RichTextContent } from "@/shared/lib/richText/richText";
import { RichTextEditor } from "@/shared/ui/richText/RichTextEditor";
import { RichTextRenderer } from "@/shared/ui/richText/RichTextRenderer";

type InquiryDetailSidebarProps = {
    inquiry: Inquiry | null;
    onDeleted?: () => void;
};

function formatDate(value: string) {
    return new Intl.DateTimeFormat("ko-KR", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

export function InquiryDetailSidebar({ inquiry, onDeleted }: InquiryDetailSidebarProps) {
    const { data: comments = [], isLoading } = useInquiryCommentsQuery(inquiry?.id);
    const [commentBody, setCommentBody] = useState<RichTextContent>(emptyRichTextContent);
    const uploadImage = useUploadImageMutation();
    const createComment = useCreateInquiryCommentMutation();
    const deleteInquiry = useDeleteInquiryMutation();

    async function handleImageUpload(file: File) {
        const response = await uploadImage.mutateAsync(file);

        return response.result.url;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!inquiry) {
            return;
        }

        const formData = new FormData(event.currentTarget);
        const commentMessage = extractRichTextPlainText(commentBody);
        await createComment.mutateAsync({
            inquiry_id: inquiry.id,
            manager_name: String(formData.get("managerName") ?? "").trim(),
            message: commentMessage,
            message_body: toJsonContent(commentBody),
        });
        event.currentTarget.reset();
        setCommentBody(emptyRichTextContent);
    }

    async function handleDelete() {
        if (!inquiry || !window.confirm("선택한 문의를 삭제할까요?")) {
            return;
        }

        await deleteInquiry.mutateAsync({ id: inquiry.id });
        onDeleted?.();
    }

    if (!inquiry) {
        return (
            <aside className="p-12 text-2xl font-black text-[var(--adaptiveGrey500)]">
                문의를 선택하면 상세 내용과 담당자 답변을 확인할 수 있습니다.
            </aside>
        );
    }

    return (
        <aside className="sticky top-0 grid max-h-screen overflow-auto">
            <section className="bg-[var(--adaptiveGrey100)] p-12">
                <p className="mb-10 text-3xl font-black text-black">선택한 질문</p>
                <button
                    className="mb-8 min-h-12 rounded-xl border border-[var(--adaptiveGrey300)] bg-white px-5 text-base font-black text-black"
                    disabled={deleteInquiry.isPending}
                    onClick={() => {
                        void handleDelete();
                    }}
                    type="button"
                >
                    {deleteInquiry.isPending ? "삭제 중" : "문의 삭제"}
                </button>
                <h2 className="mt-0 mb-8 text-5xl font-black leading-[1.2] text-black">{inquiry.message}</h2>
                <p className="mb-12 text-lg font-black text-black">{new Intl.DateTimeFormat("ko-KR").format(new Date(inquiry.created_at))} ~ {new Intl.DateTimeFormat("ko-KR").format(new Date(inquiry.updated_at))}</p>
                <div className="text-2xl font-black leading-[1.7] text-black">
                    <RichTextRenderer
                        content={inquiry.message_body}
                        fallback={inquiry.message}
                    />
                </div>
            </section>

            <section className="bg-white p-12">
                <p className="mb-8 text-2xl font-black text-[var(--adaptiveGrey600)]">관리자 답변</p>
                <div className="mb-8 grid gap-4">
                    {isLoading ? <p className="m-0 text-lg font-semibold text-[var(--adaptiveGrey500)]">답변을 불러오는 중입니다.</p> : null}
                    {!isLoading && comments.length === 0 ? <p className="m-0 text-2xl font-black text-black">이곳에 답변을 적어주세요</p> : null}
                    {comments.map((comment) => (
                        <article
                            className="border-b border-[var(--adaptiveGrey200)] pb-5"
                            key={comment.id}
                        >
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <strong className="text-lg font-black text-black">{comment.manager_name}</strong>
                                <span className="text-sm font-semibold text-[var(--adaptiveGrey500)]">{formatDate(comment.created_at)}</span>
                            </div>
                            <RichTextRenderer
                                className="text-lg"
                                content={comment.message_body}
                                fallback={comment.message}
                            />
                        </article>
                    ))}
                </div>
                <form
                    className="grid gap-5"
                    onSubmit={(event) => {
                        void handleSubmit(event);
                    }}
                >
                    <label className="grid gap-2 text-lg font-black text-black">
                        담당자 이름
                        <input
                            className="h-14 border border-black px-4 text-lg font-semibold"
                            name="managerName"
                            placeholder="담당자 이름"
                            required
                            type="text"
                        />
                    </label>
                    <label className="grid gap-2 text-lg font-black text-black">
                        답변 내용
                        <RichTextEditor
                            value={commentBody}
                            onChange={setCommentBody}
                            onImageUpload={handleImageUpload}
                            placeholder="문의에 대한 코멘트를 작성하세요."
                        />
                    </label>
                    <button
                        className="fixed right-0 bottom-0 min-h-16 w-[calc((100vw-24rem)*0.42)] bg-black px-4 text-xl font-black text-white disabled:bg-[var(--adaptiveGrey400)] max-[120rem]:static max-[120rem]:w-full"
                        disabled={createComment.isPending}
                        type="submit"
                    >
                        {createComment.isPending ? "저장 중" : "답변 등록하기"}
                    </button>
                </form>
            </section>
        </aside>
    );
}
