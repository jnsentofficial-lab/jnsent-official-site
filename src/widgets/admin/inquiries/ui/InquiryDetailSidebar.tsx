"use client";

import { FormEvent, useRef, useState } from "react";
import { useUploadImageMutation } from "@/entities/asset/api/asset.query";
import { useCreateInquiryCommentMutation } from "@/entities/inquiry/api/inquiry.query";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { emptyRichTextContent, extractRichTextPlainText, toJsonContent } from "@/shared/lib/richText/richText";
import type { RichTextContent } from "@/shared/lib/richText/richText";
import { RichTextEditor } from "@/shared/ui/richText/RichTextEditor";
import { RichTextRenderer } from "@/shared/ui/richText/RichTextRenderer";
import UI from "@/shared/ui/UIComponent";

type InquiryDetailSidebarProps = {
    inquiry: Inquiry | null;
};

export function InquiryDetailSidebar({ inquiry }: InquiryDetailSidebarProps) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [commentBody, setCommentBody] = useState<RichTextContent>(emptyRichTextContent);
    const uploadImage = useUploadImageMutation();
    const createComment = useCreateInquiryCommentMutation();

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

    if (!inquiry) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="whitespace-break-spaces leading-[1.5] text-center text-[var(--adaptive-grey500)] font-[500] select-none">{`왼쪽의 항목을 선택하시면\n상세 내용 및 담당자 답변을 작성 할 수 있어요`}</p>
            </div>
        );
    }

    return (
        <aside className="relative grid grid-rows-[1fr_1fr_auto] flex-col h-full">
            {/* 질문 */}
            <section className="flex-1 flex flex-col mobile:gap-[2.4rem] pc:gap-[5.2rem] bg-[#F3F3F3] mobile:p-[2.4rem_1.6rem] pc:p-[5.2rem]">
                {/* 게시물 정보 */}
                <div className="flex flex-col gap-[1.6rem]">
                    <h6 className="text-[var(--adaptive-black300)] text-[1.8rem]">선택한 질문</h6>

                    <h2 className="mobile:text-[2.4rem] pc:text-[3.2rem]">{inquiry.message}</h2>

                    <p className="text-[1.4rem] text-[var(--adaptive-black400)]">
                        {new Intl.DateTimeFormat("ko-KR").format(new Date(inquiry.created_at))} ~ {new Intl.DateTimeFormat("ko-KR").format(new Date(inquiry.updated_at))}
                    </p>
                </div>
                {/* 게시물 정보 END */}

                {/* 게시물 내용 */}
                <RichTextRenderer
                    className="mobile:text-[1.6rem] pc:text-[2.0rem]"
                    content={inquiry.message_body}
                    fallback={inquiry.message}
                />
                {/* 게시물 내용 END */}
            </section>
            {/* 질문 END */}

            {/* 답변 */}
            <section className="flex-1 block mobile:p-[2.4rem_1.6rem] pc:p-[5.2rem]">
                <h6 className="mb-[1.6rem] text-[1.8rem] text-[var(--adaptive-black300)]">관리자 답변</h6>

                <form
                    onSubmit={(event) => {
                        void handleSubmit(event);
                    }}
                    ref={formRef}
                >
                    <RichTextEditor
                        value={commentBody}
                        onChange={setCommentBody}
                        onImageUpload={handleImageUpload}
                        placeholder="이곳을 눌러 답변을 작성해주세요"
                    />
                </form>
            </section>
            {/* 답변 END */}

            <UI.Button
                className="sticky bottom-0 text-white bg-black"
                // className="fixed right-0 bottom-0 min-h-16 w-[calc((100vw-24rem)*0.42)] bg-black px-4 text-xl font-[700] text-white disabled:bg-[var(--adaptiveGrey400)] max-[120rem]:static max-[120rem]:w-full"
                disabled={createComment.isPending}
                onClick={() => formRef.current?.requestSubmit()}
                type="button"
            >
                {createComment.isPending ? "저장 중" : "답변 등록하기"}
            </UI.Button>
        </aside>
    );
}
