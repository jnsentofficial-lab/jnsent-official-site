"use client";

import { FormEvent, useEffect, useState } from "react";
import { useUploadImageMutation } from "@/entities/asset/api/asset.query";
import { useCreateGlobalModalMutation, useUpdateGlobalModalMutation } from "@/entities/globalModal/api/globalModal.query";
import type { GlobalModal } from "@/entities/globalModal/model/globalModal.type";
import UI from "@/shared/ui/UIComponent";

type Position = {
    col: number;
    row: number;
};

const positions = Array.from({ length: 9 }, (_, index) => ({
    col: (index % 3) + 1,
    row: Math.floor(index / 3) + 1,
}));
const formClassName = "grid gap-3.5";
const labelClassName = "grid gap-2 font-bold text-slate-800";
const inputClassName = "min-h-11 rounded-lg border border-slate-300 px-3.5";
const textareaClassName = "min-h-[13.2rem] resize-y rounded-lg border border-slate-300 px-3.5 py-3";
const statusClassName = "m-0 text-sm font-bold text-green-700";
const buttonClassName = "min-h-11 rounded-lg bg-blue-500 font-bold text-white";

function toIsoDateTime(value: FormDataEntryValue | null) {
    const text = String(value ?? "").trim();

    return text ? new Date(text).toISOString() : null;
}

type GlobalModalEditorProps = {
    modal?: GlobalModal | null;
    onSaved?: () => void;
};

export function GlobalModalEditor({ modal, onSaved }: GlobalModalEditorProps) {
    const [position, setPosition] = useState<Position>({ col: 2, row: 2 });
    const [statusMessage, setStatusMessage] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrlValue, setImageUrlValue] = useState("");
    const [startsAt, setStartsAt] = useState("");
    const [endsAt, setEndsAt] = useState("");
    const [dismissType, setDismissType] = useState<GlobalModal["dismiss_type"]>("none");
    const [dismissDays, setDismissDays] = useState(1);
    const [stackOrder, setStackOrder] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const createGlobalModal = useCreateGlobalModalMutation();
    const updateGlobalModal = useUpdateGlobalModalMutation();
    const uploadImage = useUploadImageMutation();

    useEffect(() => {
        setTitle(modal?.title ?? "");
        setContent(modal?.content ?? "");
        setImageUrlValue(modal?.image_url ?? "");
        setPosition({ col: modal?.col ?? 2, row: modal?.row ?? 2 });
        setStartsAt(modal?.starts_at ? modal.starts_at.slice(0, 16) : "");
        setEndsAt(modal?.ends_at ? modal.ends_at.slice(0, 16) : "");
        setDismissType(modal?.dismiss_type ?? "none");
        setDismissDays(modal?.dismiss_days ?? 1);
        setStackOrder(modal?.stack_order ?? 0);
        setIsVisible(modal?.is_visible ?? true);
        setStatusMessage("");
    }, [modal]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatusMessage("저장 중입니다.");

        const formData = new FormData(event.currentTarget);
        const file = formData.get("image");
        let imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;

        try {
            if (file instanceof File && file.size > 0) {
                imageUrl = (await uploadImage.mutateAsync(file)).result.url;
            }

            const payload = {
                title: title.trim(),
                content: content.trim(),
                image_url: imageUrl,
                col: position.col,
                row: position.row,
                stack_order: stackOrder,
                dismiss_type: dismissType,
                dismiss_days: dismissType === "days" ? dismissDays : null,
                starts_at: toIsoDateTime(formData.get("startsAt")),
                ends_at: toIsoDateTime(formData.get("endsAt")),
                is_visible: isVisible,
            };

            if (modal) {
                await updateGlobalModal.mutateAsync({ id: modal.id, ...payload });
            } else {
                await createGlobalModal.mutateAsync(payload);
            }

            event.currentTarget.reset();
            setPosition({ col: 2, row: 2 });
            setStatusMessage("모달이 저장되었습니다.");
            onSaved?.();
        } catch {
            setStatusMessage("모달 저장에 실패했습니다.");
        }
    }

    return (
        <form
            className={formClassName}
            onSubmit={handleSubmit}
        >
            <label className="grid gap-3 text-xl font-black text-black">
                제목
                <input
                    className="h-14 border border-black px-4 text-lg font-semibold"
                    name="title"
                    placeholder="모달 제목"
                    onChange={(event) => setTitle(event.target.value)}
                    required
                    type="text"
                    value={title}
                />
            </label>
            <label className="grid gap-3 text-xl font-black text-black">
                내용
                <textarea
                    className="min-h-[13.2rem] resize-y border border-black px-4 py-3 text-lg font-semibold"
                    name="content"
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="모달 내용을 입력하세요."
                    required
                    value={content}
                />
            </label>
            <label className={labelClassName}>
                이미지 업로드
                <input
                    className={inputClassName}
                    accept="image/jpeg,image/png,image/webp"
                    name="image"
                    type="file"
                />
            </label>
            <label className={labelClassName}>
                이미지 URL
                <input
                    className="h-14 border border-black px-4 text-lg font-semibold"
                    name="imageUrl"
                    onChange={(event) => setImageUrlValue(event.target.value)}
                    placeholder="이미 업로드된 이미지 URL"
                    type="url"
                    value={imageUrlValue}
                />
            </label>
            <fieldset className="m-0 grid gap-2.5 border-0 p-0">
                <legend className="font-bold text-slate-800">노출 위치</legend>
                <div className="grid aspect-square w-[min(24rem,100%)] grid-cols-3 grid-rows-3 gap-2">
                    {positions.map((item) => (
                        <UI.Button
                            aria-pressed={position.col === item.col && position.row === item.row}
                            className={`min-h-0 rounded-lg border font-bold ${position.col === item.col && position.row === item.row ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-300 bg-slate-50 text-slate-700"}`}
                            key={`${item.col}-${item.row}`}
                            onClick={() => setPosition(item)}
                            type="button"
                        >
                            {item.col},{item.row}
                        </UI.Button>
                    ))}
                </div>
            </fieldset>
            <label className={labelClassName}>
                Stack 순서
                <input
                    className={inputClassName}
                    onChange={(event) => setStackOrder(Number(event.target.value))}
                    value={stackOrder}
                    min="0"
                    name="stackOrder"
                    type="number"
                />
            </label>
            <label className={labelClassName}>
                노출 시작
                <input
                    className={inputClassName}
                    name="startsAt"
                    onChange={(event) => setStartsAt(event.target.value)}
                    type="datetime-local"
                    value={startsAt}
                />
            </label>
            <label className={labelClassName}>
                노출 종료
                <input
                    className={inputClassName}
                    name="endsAt"
                    onChange={(event) => setEndsAt(event.target.value)}
                    type="datetime-local"
                    value={endsAt}
                />
            </label>
            <label className={labelClassName}>
                닫기 정책
                <select
                    className={inputClassName}
                    name="dismissType"
                    onChange={(event) => setDismissType(event.target.value as GlobalModal["dismiss_type"])}
                    value={dismissType}
                >
                    <option value="none">닫기만</option>
                    <option value="today">오늘 하루 동안 닫기</option>
                    <option value="days">n일 동안 닫기</option>
                </select>
            </label>
            <label className={labelClassName}>
                n일
                <input
                    className={inputClassName}
                    onChange={(event) => setDismissDays(Number(event.target.value))}
                    value={dismissDays}
                    min="1"
                    name="dismissDays"
                    type="number"
                />
            </label>
            <label className="flex items-center gap-2.5 font-bold text-slate-800">
                <input
                    className="min-h-0"
                    checked={isVisible}
                    name="isVisible"
                    onChange={(event) => setIsVisible(event.target.checked)}
                    type="checkbox"
                />
                표시
            </label>
            {statusMessage ? (
                <p
                    className={statusClassName}
                    role="status"
                >
                    {statusMessage}
                </p>
            ) : null}
            <UI.Button
                className={buttonClassName}
                type="submit"
            >
                {modal ? "수정하기" : "답변 등록하기"}
            </UI.Button>
        </form>
    );
}
