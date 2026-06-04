"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useUploadImageMutation } from "@/entities/asset/api/asset.query";
import { buildPublicInquiryPath } from "@/entities/inquiry/lib/publicPath";
import { useCreateInquiryCommentMutation, useInquiryCommentsQuery, useUpdateInquiryCommentMutation } from "@/entities/inquiry/api/inquiry.query";
import type { Inquiry } from "@/entities/inquiry/model/inquiry.type";
import { emptyRichTextContent, extractRichTextPlainText, toJsonContent, toRichTextContent } from "@/shared/lib/richText/richText";
import type { RichTextContent } from "@/shared/lib/richText/richText";
import { RichTextEditor } from "@/shared/ui/richText/RichTextEditor";
import { useToastStore } from "@/shared/model/stores/useToastStore";
import { InquiryAnswerSection, InquiryQuestionSection } from "@/widgets/admin/inquiries/ui/InquiryDetailContent";
import UI from "@/shared/ui/UIComponent";

type InquiryDetailSidebarProps = {
    inquiry: Inquiry | null;
};

export function InquiryDetailSidebar({ inquiry }: InquiryDetailSidebarProps) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [commentBody, setCommentBody] = useState<RichTextContent>(emptyRichTextContent);
    const [isEditing, setIsEditing] = useState(false);
    const uploadImage = useUploadImageMutation();
    const { setToast } = useToastStore();
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

    async function handleCopyShareLink() {
        if (!inquiry || typeof window === "undefined") {
            return;
        }

        const shareUrl = `${window.location.origin}${buildPublicInquiryPath(inquiry.id)}`;

        try {
            await navigator.clipboard.writeText(shareUrl);
            setToast({ msg: "공유 링크를 복사했어요", time: 3, type: "success" });
        } catch {
            setToast({ msg: "링크 복사에 실패했어요", time: 3, type: "fail" });
        }
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
            <InquiryQuestionSection inquiry={inquiry} />

            {/* 답변 */}
            {latestComment && !isEditing ? (
                <InquiryAnswerSection comment={latestComment} />
            ) : (
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
            )}
            {/* 답변 END */}

            {latestComment && !isEditing ? (
                <div className="sticky bottom-0 flex w-full bg-white">
                    <UI.Button
                        className="text-white bg-black flex-1"
                        onClick={() => {
                            setCommentBody(toRichTextContent(latestComment.message_body));
                            setIsEditing(true);
                        }}
                        type="button"
                    >
                        답변 수정하기
                    </UI.Button>

                    <UI.Button
                        className="px-[2.0rem] bg-[var(--adaptive-blue400)] text-[var(--adaptive-grey50)]"
                        onClick={() => {
                            void handleCopyShareLink();
                        }}
                        type="button"
                    >
                        공유하기
                    </UI.Button>
                </div>
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
