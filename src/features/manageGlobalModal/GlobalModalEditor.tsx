"use client";

import { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from "react";
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
const formClassName = "flex flex-col gap-[2.4rem]";
const labelClassName = "flex flex-col gap-[0.8rem] font-[NanumSquare]";
const inputClassName = "h-[5.2rem] border border-[var(--adaptive-grey200)] hover:border-[var(--adaptive-grey700)] px-4 text-lg font-semibold";
const textareaClassName = "min-h-[13.2rem] resize-y rounded-lg border border-slate-300 px-3.5 py-3";
const statusClassName = "m-0 text-sm font-bold text-green-700";
const buttonClassName = "";
// const buttonClassName = "min-h-11 rounded-lg bg-blue-500 font-bold text-white";
const previewButtonClassName = "grid gap-3 rounded-lg border border-[var(--adaptive-grey200)] bg-white p-3 text-left";

function toIsoDateTime(value: FormDataEntryValue | null) {
    const text = String(value ?? "").trim();

    return text ? new Date(text).toISOString() : null;
}

type GlobalModalEditorProps = {
    modal?: GlobalModal | null;
    onSaved?: () => void;
};

export function GlobalModalEditor({ modal, onSaved }: GlobalModalEditorProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
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
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const [selectedImagePreviewUrl, setSelectedImagePreviewUrl] = useState<string | null>(null);
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
        setSelectedImageFile(null);
        setSelectedImagePreviewUrl(null);
        setStatusMessage("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [modal]);

    useEffect(() => {
        if (!selectedImageFile) {
            setSelectedImagePreviewUrl(null);
            return;
        }

        const nextPreviewUrl = URL.createObjectURL(selectedImageFile);
        setSelectedImagePreviewUrl(nextPreviewUrl);

        return () => {
            URL.revokeObjectURL(nextPreviewUrl);
        };
    }, [selectedImageFile]);

    const effectiveImageUrl = selectedImagePreviewUrl ?? imageUrlValue;

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const nextFile = event.target.files?.[0] ?? null;
        setSelectedImageFile(nextFile);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatusMessage("저장 중입니다.");
        const form = event.currentTarget;

        let imageUrl = imageUrlValue.trim() || null;

        try {
            if (selectedImageFile) {
                imageUrl = (await uploadImage.mutateAsync(selectedImageFile)).result.url;
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
                starts_at: toIsoDateTime(startsAt),
                ends_at: toIsoDateTime(endsAt),
                is_visible: isVisible,
            };

            if (modal) {
                await updateGlobalModal.mutateAsync({ id: modal.id, ...payload });
            } else {
                await createGlobalModal.mutateAsync(payload);
            }

            form.reset();
            setPosition({ col: 2, row: 2 });
            setImageUrlValue("");
            setSelectedImageFile(null);
            setSelectedImagePreviewUrl(null);
            setStatusMessage("모달이 저장되었습니다.");
            onSaved?.();
        } catch {
            setStatusMessage("모달 저장에 실패했습니다.");
        }
    }

    return (
        <Fragment>
            <h1 className="text-[3.2rem] mobile:px-[1.6rem] pc:px-[5.2rem] pt-[5.2rem]">계정 편집</h1>

            <form
                className="grid gap-10 mobile:px-[1.6rem] pc:px-[5.2rem]"
                // className={formClassName}
                onSubmit={handleSubmit}
                ref={formRef}
            >
                <label className={labelClassName}>
                    제목
                    <input
                        className={inputClassName}
                        name="title"
                        placeholder="모달 제목"
                        onChange={(event) => setTitle(event.target.value)}
                        required
                        type="text"
                        value={title}
                    />
                </label>
                {/* <label className="grid gap-3 text-xl font-[700] text-black">
                    내용
                    <textarea
                        className="min-h-[13.2rem] resize-y border border-black px-4 py-3 text-lg font-semibold"
                        name="content"
                        onChange={(event) => setContent(event.target.value)}
                        placeholder="모달 내용을 입력하세요."
                        required
                        value={content}
                    />
                </label> */}
                <label className={labelClassName}>
                    이미지 업로드
                    <input
                        className={inputClassName}
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        name="image"
                        ref={fileInputRef}
                        type="file"
                    />
                </label>
                <section className="grid gap-3 rounded-lg border border-[var(--adaptive-grey200)] bg-[var(--adaptive-grey50)] p-4">
                    <div className="flex items-center justify-between gap-3">
                        <strong className="text-lg font-[700] text-black">현재 설정 이미지</strong>
                        <span className="text-sm font-bold text-[var(--adaptive-grey600)]">
                            {selectedImageFile ? "새로 선택한 이미지가 저장됩니다" : effectiveImageUrl ? "저장된 이미지가 유지됩니다" : "설정된 이미지가 없습니다"}
                        </span>
                    </div>
                    {effectiveImageUrl ? (
                        <div className={previewButtonClassName}>
                            <img
                                alt={title ? `${title} 이미지 미리보기` : "모달 이미지 미리보기"}
                                className="h-40 w-full rounded-lg object-cover"
                                src={effectiveImageUrl}
                            />
                            <span className="truncate text-sm font-bold text-[var(--adaptive-grey700)]">{selectedImageFile?.name ?? imageUrlValue}</span>
                        </div>
                    ) : (
                        <p className="m-0 text-sm font-semibold text-[var(--adaptive-grey600)]">이미지를 업로드하면 여기에서 바로 확인할 수 있습니다.</p>
                    )}
                </section>
                {/* <label className={labelClassName}>
                    이미지 URL
                    <input
                        className={inputClassName}
                        name="imageUrl"
                        onChange={(event) => setImageUrlValue(event.target.value)}
                        placeholder="이미 업로드된 이미지 URL"
                        type="url"
                        value={imageUrlValue}
                    />
                </label> */}
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
                <section className="flex gap-[0.4rem]">
                    <label className={labelClassName}>
                        시작 일자
                        <input
                            className={inputClassName}
                            name="startsAt"
                            onChange={(event) => setStartsAt(event.target.value)}
                            type="datetime-local"
                            value={startsAt}
                        />
                    </label>
                    <label className={labelClassName}>
                        종료 일자
                        <input
                            className={inputClassName}
                            name="endsAt"
                            onChange={(event) => setEndsAt(event.target.value)}
                            type="datetime-local"
                            value={endsAt}
                        />
                    </label>
                </section>
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
                    몇일동안 닫을까요?
                    <input
                        className={inputClassName}
                        onChange={(event) => setDismissDays(Number(event.target.value))}
                        value={dismissDays}
                        min="1"
                        name="dismissDays"
                        type="number"
                    />
                </label>
                {/* <label className="flex items-center gap-2.5 font-bold text-slate-800">
                    <input
                        className="min-h-0"
                        checked={isVisible}
                        name="isVisible"
                        onChange={(event) => setIsVisible(event.target.checked)}
                        type="checkbox"
                    />
                    표시
                </label> */}
                {statusMessage ? (
                    <p
                        className={statusClassName}
                        role="status"
                    >
                        {statusMessage}
                    </p>
                ) : null}
            </form>

            <section className="flex w-full">
                <UI.Button
                    className="bg-black hover:bg-[var(--adaptive-blue500)] text-white w-full"
                    onClick={() => formRef.current?.requestSubmit()}
                    type="button"
                >
                    {modal ? "편집" : "생성"}하기
                </UI.Button>
            </section>
        </Fragment>
    );
}
