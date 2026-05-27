"use client";

import { ChangeEvent, DragEvent, FormEvent, Fragment, useEffect, useRef, useState } from "react";
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
const uploadZoneBaseClassName = "group relative overflow-hidden rounded-[2.4rem] border border-dashed px-6 py-8 text-center transition-all duration-200 cursor-pointer";

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
    const [isDragActive, setIsDragActive] = useState(false);
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

    function handleDragOver(event: DragEvent<HTMLLabelElement>) {
        event.preventDefault();
        setIsDragActive(true);
    }

    function handleDragLeave(event: DragEvent<HTMLLabelElement>) {
        event.preventDefault();
        setIsDragActive(false);
    }

    function handleDrop(event: DragEvent<HTMLLabelElement>) {
        event.preventDefault();
        setIsDragActive(false);

        const nextFile = event.dataTransfer.files?.[0];
        if (!nextFile || !nextFile.type.startsWith("image/")) {
            return;
        }

        setSelectedImageFile(nextFile);

        if (fileInputRef.current) {
            const transfer = new DataTransfer();
            transfer.items.add(nextFile);
            fileInputRef.current.files = transfer.files;
        }
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
            <h1 className="text-[3.2rem] mobile:px-[1.6rem] pc:px-[5.2rem] pt-[5.2rem]">편집하기</h1>

            <form
                className="flex flex-col mobile:px-[1.6rem] pc:px-[5.2rem] flex-1"
                // className={formClassName}
                onSubmit={handleSubmit}
                ref={formRef}
            >
                <label className={labelClassName}>
                    현재 설정 이미지
                    <span className="text-sm font-bold text-[var(--adaptive-grey600)]">
                        {selectedImageFile ? "새로 선택한 이미지가 저장됩니다" : effectiveImageUrl ? "저장된 이미지가 유지됩니다" : "설정된 이미지가 없습니다"}
                    </span>
                    {effectiveImageUrl ? (
                        <img
                            alt={title ? `${title} 이미지 미리보기` : "모달 이미지 미리보기"}
                            className=""
                            // className="h-40 w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            src={effectiveImageUrl}
                        />
                    ) : (
                        <p className="m-0 text-sm font-semibold text-[var(--adaptive-grey600)]">이미지를 업로드하면 여기에서 바로 확인할 수 있습니다.</p>
                    )}
                </label>

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
                <div className={labelClassName}>
                    <span>이미지 업로드</span>
                    <label
                        className={`${uploadZoneBaseClassName} ${isDragActive ? "border-[var(--adaptive-blue500)] bg-[linear-gradient(180deg,#f7fbff_0%,#edf5ff_100%)] shadow-[0_1.6rem_4rem_rgba(46,126,255,0.12)]" : "border-[var(--adaptive-grey300)] bg-[linear-gradient(180deg,#fcfcfc_0%,#f4f4f4_100%)] hover:border-[var(--adaptive-grey700)] hover:shadow-[0_1.2rem_3rem_rgba(15,23,42,0.08)]"}`}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <input
                            accept="image/jpeg,image/png,image/webp"
                            className="sr-only"
                            onChange={handleImageChange}
                            name="image"
                            ref={fileInputRef}
                            type="file"
                        />
                        <div
                            className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${isDragActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"} bg-[radial-gradient(circle_at_top,rgba(46,126,255,0.14),transparent_58%)]`}
                        />
                        <div className="relative z-[1] flex flex-col items-center gap-5">
                            {/* <span className="flex h-[7.2rem] w-[7.2rem] items-center justify-center rounded-[2rem] border border-[var(--adaptive-grey300)] bg-white shadow-[0_1rem_2.4rem_rgba(15,23,42,0.08)]">
                            </span> */}
                            <img
                                alt=""
                                className="h-[3.2rem] w-[3.2rem]"
                                src="/images/icon/outlined/ico-outlined-image.svg"
                            />

                            <div className="space-y-2">
                                <p className="font-[NanumSquare] text-[var(--adaptive-black500)]">{isDragActive ? "여기에 이미지를 놓아주세요" : "파일을 끌어 놓거나 클릭해 업로드"}</p>
                                <p className="text-[1.4rem] text-[var(--adaptive-black400)]">
                                    PNG, JPG, WEBP 파일을 지원합니다.
                                    {selectedImageFile ? ` 현재 선택: ${selectedImageFile.name}` : ""}
                                </p>
                            </div>
                        </div>
                    </label>
                </div>

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

                {/* <label className={labelClassName}>
                    Stack 순서
                    <input
                        className={inputClassName}
                        onChange={(event) => setStackOrder(Number(event.target.value))}
                        value={stackOrder}
                        min="0"
                        name="stackOrder"
                        type="number"
                    />
                </label> */}
                <section className="flex gap-[0.4rem]">
                    <label className={labelClassName}>
                        시작 일자
                        <UI.Calendar
                            className={inputClassName}
                            name="startsAt"
                            onChange={(event) => setStartsAt(event.target.value)}
                            value={startsAt}
                        />
                    </label>
                    <label className={labelClassName}>
                        종료 일자
                        <UI.Calendar
                            className={inputClassName}
                            name="endsAt"
                            onChange={(event) => setEndsAt(event.target.value)}
                            value={endsAt}
                        />
                    </label>
                </section>

                <label className={labelClassName}>
                    닫기 정책
                    <UI.Select
                        className={inputClassName}
                        name="dismissType"
                        onChange={(event) => setDismissType(event.target.value as GlobalModal["dismiss_type"])}
                        options={[
                            { label: "닫기만", value: "none" },
                            { label: "오늘 하루 동안 닫기", value: "today" },
                            { label: "n일 동안 닫기", value: "days" },
                        ]}
                        value={dismissType}
                    />
                </label>

                {dismissType === "days" ? (
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
                ) : null}

                <label className={labelClassName}>
                    노출 위치
                    <div className="grid aspect-square w-[min(24rem,100%)] grid-cols-3 grid-rows-3 gap-2">
                        {positions.map((item) => (
                            <UI.Button
                                aria-pressed={position.col === item.col && position.row === item.row}
                                className={`min-h-0 rounded-[1.6rem] font-bold ${position.col === item.col && position.row === item.row ? "bg-[var(--adaptive-blue100)] text-[var(--adaptive-blue500)]" : "bg-[var(--adaptive-grey200)] hover:-[var(--adaptive-grey300)] text-[var(--adaptive-grey500)]"}`}
                                key={`${item.col}-${item.row}`}
                                onClick={() => setPosition(item)}
                                type="button"
                            >
                                {item.col},{item.row}
                            </UI.Button>
                        ))}
                    </div>
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
