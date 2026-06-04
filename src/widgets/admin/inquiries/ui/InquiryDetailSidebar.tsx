"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useUploadImageMutation } from "@/entities/asset/api/asset.query";
import { useCreateInquiryCommentMutation, useInquiryCommentsQuery, useUpdateInquiryCommentMutation } from "@/entities/inquiry/api/inquiry.query";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { emptyRichTextContent, extractRichTextPlainText, toJsonContent, toRichTextContent } from "@/shared/lib/richText/richText";
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
    const [isEditing, setIsEditing] = useState(false);
    const uploadImage = useUploadImageMutation();
    const createComment = useCreateInquiryCommentMutation();
    const updateComment = useUpdateInquiryCommentMutation();
    const { data: comments = [] } = useInquiryCommentsQuery(inquiry?.id);
    const latestComment = comments[0] ?? null;

    useEffect(() => {
        if (!inquiry) {
            setIsEditing(false);
            setCommentBody(emptyRichTextContent);
            return;
        }

        if (latestComment) {
            setIsEditing(false);
            setCommentBody(toRichTextContent(latestComment.message_body));
            return;
        }

        setIsEditing(true);
        setCommentBody(emptyRichTextContent);
    }, [inquiry, latestComment]);

    async function handleImageUpload(file: File) {
        const response = await uploadImage.mutateAsync(file);

        return response.result.url;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!inquiry) {
            return;
        }

        const commentMessage = extractRichTextPlainText(commentBody);
        const payload = {
            inquiry_id: inquiry.id,
            message: commentMessage,
            message_body: toJsonContent(commentBody),
        };

        if (latestComment && isEditing) {
            await updateComment.mutateAsync({
                id: latestComment.id,
                ...payload,
            });
        } else {
            await createComment.mutateAsync(payload);
        }

        event.currentTarget.reset();
        setIsEditing(false);
    }

    if (!inquiry) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="whitespace-break-spaces leading-[1.5] text-center text-[var(--adaptive-grey500)] font-[500] select-none">{`왼쪽의 항목을 선택하시면\n상세 내용 및 담당자 답변을 작성 할 수 있어요`}</p>
            </div>
        );
    }

    return (
        <aside className="relative grid grid-rows-[1fr_1fr_auto] overflow-auto flex-col h-full">
            {/* 질문 */}
            <section className="flex-1 flex flex-col mobile:gap-[2.4rem] pc:gap-[5.2rem] bg-[#F3F3F3] mobile:p-[2.4rem_1.6rem] pc:p-[5.2rem]">
                {/* 게시물 정보 */}
                <div className="flex flex-col gap-[1.6rem]">
                    <h6 className="text-[var(--adaptive-black300)] text-[1.8rem]">선택한 질문</h6>

                    <h2 className="mobile:text-[2.4rem] pc:text-[3.2rem] leading-[1.5]">{inquiry.message}</h2>

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

                {latestComment && !isEditing ? (
                    <div className="flex flex-col gap-[2.0rem]">
                        <div className="flex flex-col gap-[0.8rem]">
                            <p className="text-[1.4rem] font-[700] text-[var(--adaptive-black300)]">{latestComment.manager_name}</p>
                            <p className="text-[1.3rem] text-[var(--adaptive-black400)]">{new Intl.DateTimeFormat("ko-KR").format(new Date(latestComment.created_at))}</p>
                        </div>

                        <RichTextRenderer
                            className="mobile:text-[1.6rem] pc:text-[2.0rem]"
                            content={latestComment.message_body}
                            fallback={latestComment.message}
                        />
                    </div>
                ) : (
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
                )}
            </section>
            {/* 답변 END */}

            {latestComment && !isEditing ? (
                <UI.Button
                    className="sticky bottom-0 text-white bg-black"
                    onClick={() => {
                        setCommentBody(toRichTextContent(latestComment.message_body));
                        setIsEditing(true);
                    }}
                    type="button"
                >
                    답변 수정하기
                </UI.Button>
            ) : (
                <UI.Button
                    className="sticky bottom-0 text-white bg-black"
                    disabled={createComment.isPending || updateComment.isPending}
                    onClick={() => formRef.current?.requestSubmit()}
                    type="button"
                >
                    {createComment.isPending || updateComment.isPending ? "저장 중" : "답변 등록하기"}
                </UI.Button>
            )}
        </aside>
    );
}
