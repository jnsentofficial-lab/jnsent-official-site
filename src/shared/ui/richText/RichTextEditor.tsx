"use client";

import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Placeholder } from "@tiptap/extensions/placeholder";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import type { RichTextContent } from "@/shared/lib/richText/richText";
import { emptyRichTextContent } from "@/shared/lib/richText/richText";

type RichTextEditorProps = {
    value?: RichTextContent;
    onChange: (value: RichTextContent) => void;
    onImageUpload?: (file: File) => Promise<string>;
    placeholder?: string;
};

const toolbarButtons = [
    { label: "B", action: "bold" },
    { label: "I", action: "italic" },
    { label: "U", action: "underline" },
    { label: "H2", action: "heading" },
    { label: "•", action: "bulletList" },
    { label: "1.", action: "orderedList" },
] as const;

const textAlignButtons = [
    { label: "←", align: "left" as const },
    { label: "↔", align: "center" as const },
    { label: "→", align: "right" as const },
];

const textColorPresets = ["#000000", "#FF6B75", "#2563EB", "#16A34A", "#CA8A04", "#9333EA"];

const toolbarButtonClassName = "flex flex-1 h-[5.2rem] items-center justify-center text-[1.4rem] font-semibold transition-colors select-none bg-[var(--adaptive-black200)]";
const toolbarButtonIdleClassName = "border-slate-200 bg-white text-slate-700 hover:bg-[var(--adaptive-grey100)]";
const toolbarButtonActiveClassName = "border-blue-500 bg-blue-50 text-blue-700";
const editorContentClassName =
    "min-h-[18rem] bg-white text-base leading-[1.5] outline-none [&_.is-editor-empty:first-child::before]:pointer-events-none [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:h-0 [&_.is-editor-empty:first-child::before]:text-slate-400 [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_a]:text-blue-700 [&_a]:underline [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-bold [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6";

export function RichTextEditor({ value = emptyRichTextContent, onChange, onImageUpload, placeholder = "본문을 입력하세요." }: RichTextEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const colorInputRef = useRef<HTMLInputElement>(null);
    const lastSyncedValueRef = useRef(JSON.stringify(value));
    const [isUploading, setIsUploading] = useState(false);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3],
                },
                link: {
                    openOnClick: false,
                    autolink: true,
                    defaultProtocol: "https",
                },
                underline: {},
            }),
            TextStyle,
            Color,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({
                placeholder,
            }),
            Image.configure({
                allowBase64: false,
                inline: false,
            }),
        ],
        content: value,
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
        editorProps: {
            attributes: {
                class: editorContentClassName,
                "data-placeholder": placeholder,
            },
            handleDOMEvents: {
                mousedown: (_view, event) => {
                    const target = event.target;

                    if (!(target instanceof HTMLElement)) {
                        return false;
                    }

                    return Boolean(target.closest("[data-rich-text-toolbar]"));
                },
            },
        },
        onUpdate: ({ editor: currentEditor }) => {
            const nextValue = currentEditor.getJSON();
            lastSyncedValueRef.current = JSON.stringify(nextValue);
            onChange(nextValue);
        },
    });
    const editorState = useEditorState({
        editor,
        selector: ({ editor: currentEditor }) => ({
            isBold: currentEditor?.isActive("bold") ?? false,
            isItalic: currentEditor?.isActive("italic") ?? false,
            isUnderline: currentEditor?.isActive("underline") ?? false,
            isHeading: currentEditor?.isActive("heading", { level: 2 }) ?? false,
            isBulletList: currentEditor?.isActive("bulletList") ?? false,
            isOrderedList: currentEditor?.isActive("orderedList") ?? false,
            isLink: currentEditor?.isActive("link") ?? false,
            textAlign: currentEditor?.isActive({ textAlign: "left" })
                ? "left"
                : currentEditor?.isActive({ textAlign: "center" })
                  ? "center"
                  : currentEditor?.isActive({ textAlign: "right" })
                    ? "right"
                    : null,
            textColor: (currentEditor?.getAttributes("textStyle").color as string | undefined) ?? null,
        }),
    });

    useEffect(() => {
        if (!editor) {
            return;
        }

        const next = JSON.stringify(value);
        if (next === lastSyncedValueRef.current) {
            return;
        }

        const current = JSON.stringify(editor.getJSON());
        if (current !== next) {
            editor.commands.setContent(value, { emitUpdate: false });
            lastSyncedValueRef.current = next;
        }
    }, [editor, value]);

    function runToolbarCommand(command: () => void) {
        if (!editor) {
            return;
        }

        command();
        editor.commands.focus(undefined, { scrollIntoView: false });
    }

    function setLink() {
        if (!editor) {
            return;
        }

        const previousUrl = editor.getAttributes("link").href as string | undefined;
        const url = window.prompt("링크 URL", previousUrl ?? "");

        if (url === null) {
            return;
        }

        if (!url.trim()) {
            editor.chain().focus(undefined, { scrollIntoView: false }).unsetLink().run();
            return;
        }

        editor.chain().focus(undefined, { scrollIntoView: false }).extendMarkRange("link").setLink({ href: url.trim() }).run();
    }

    function setTextColor(color: string) {
        runToolbarCommand(() => {
            if (!color) {
                editor?.chain().unsetColor().run();
                return;
            }

            editor?.chain().setColor(color).run();
        });
    }

    async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        event.target.value = "";

        if (!file || !editor || !onImageUpload) {
            return;
        }

        setIsUploading(true);

        try {
            const url = await onImageUpload(file);
            editor.chain().focus(undefined, { scrollIntoView: false }).setImage({ src: url, alt: file.name }).run();
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div>
            <div
                className="sticky z-10 bg-white flex flex-wrap border-b border-b-[var(--adaptive-black100)]"
                data-rich-text-toolbar
            >
                {toolbarButtons.map((button) => (
                    <Fragment key={button.action}>
                        <button
                            className={`${toolbarButtonClassName} ${
                                (button.action === "bold" && editorState?.isBold) ||
                                (button.action === "italic" && editorState?.isItalic) ||
                                (button.action === "underline" && editorState?.isUnderline) ||
                                (button.action === "heading" && editorState?.isHeading) ||
                                (button.action === "bulletList" && editorState?.isBulletList) ||
                                (button.action === "orderedList" && editorState?.isOrderedList)
                                    ? toolbarButtonActiveClassName
                                    : toolbarButtonIdleClassName
                            }`}
                            key={button.action}
                            onPointerDown={(event) => {
                                event.preventDefault();
                                runToolbarCommand(() => {
                                    if (button.action === "bold") editor?.chain().toggleBold().run();
                                    if (button.action === "italic") editor?.chain().toggleItalic().run();
                                    if (button.action === "underline") editor?.chain().toggleUnderline().run();
                                    if (button.action === "heading") editor?.chain().toggleHeading({ level: 2 }).run();
                                    if (button.action === "bulletList") editor?.chain().toggleBulletList().run();
                                    if (button.action === "orderedList") editor?.chain().toggleOrderedList().run();
                                });
                            }}
                            type="button"
                        >
                            {button.label}
                        </button>

                        <div className="h-[3.2rem] w-[0.1rem] my-auto bg-[var(--adaptive-black100)]" />
                    </Fragment>
                ))}
                {textAlignButtons.map((button) => (
                    <Fragment key={button.align}>
                        <button
                            aria-label={`${button.align} 정렬`}
                            className={`${toolbarButtonClassName} ${editorState?.textAlign === button.align ? toolbarButtonActiveClassName : toolbarButtonIdleClassName}`}
                            onPointerDown={(event) => {
                                event.preventDefault();
                                runToolbarCommand(() => {
                                    editor?.chain().setTextAlign(button.align).run();
                                });
                            }}
                            type="button"
                        >
                            {button.label}
                        </button>

                        <div className="h-[3.2rem] w-[0.1rem] my-auto bg-[var(--adaptive-black100)]" />
                    </Fragment>
                ))}
                <div className="flex items-center gap-[0.4rem] px-[0.8rem]">
                    {textColorPresets.map((color) => (
                        <button
                            aria-label={`글자 색상 ${color}`}
                            className={`h-[2.4rem] w-[2.4rem] rounded-full border ${editorState?.textColor === color ? "border-blue-500 ring-2 ring-blue-200" : "border-[var(--adaptive-grey300)]"}`}
                            key={color}
                            onPointerDown={(event) => {
                                event.preventDefault();
                                setTextColor(color);
                            }}
                            style={{ backgroundColor: color }}
                            type="button"
                        />
                    ))}
                    <button
                        aria-label="사용자 지정 글자 색상"
                        className={`${toolbarButtonClassName} relative min-w-[5.2rem] ${toolbarButtonIdleClassName}`}
                        onPointerDown={(event) => {
                            event.preventDefault();
                            colorInputRef.current?.click();
                        }}
                        type="button"
                    >
                        A
                        <input
                            className="pointer-events-none absolute inset-0 opacity-0"
                            onChange={(event) => {
                                setTextColor(event.target.value);
                            }}
                            ref={colorInputRef}
                            type="color"
                            value={editorState?.textColor ?? "#000000"}
                        />
                    </button>
                    <button
                        aria-label="글자 색상 제거"
                        className={`${toolbarButtonClassName} min-w-[5.2rem] ${toolbarButtonIdleClassName}`}
                        onPointerDown={(event) => {
                            event.preventDefault();
                            setTextColor("");
                        }}
                        type="button"
                    >
                        A×
                    </button>
                </div>
                <div className="h-[3.2rem] w-[0.1rem] my-auto bg-[var(--adaptive-black100)]" />
                <button
                    className={`${toolbarButtonClassName} ${editorState?.isLink ? toolbarButtonActiveClassName : toolbarButtonIdleClassName}`}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        setLink();
                    }}
                    type="button"
                >
                    Link
                </button>
                <button
                    className={`${toolbarButtonClassName} ${toolbarButtonIdleClassName} disabled:bg-slate-100 disabled:text-slate-400`}
                    disabled={!onImageUpload || isUploading}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        fileInputRef.current?.click();
                    }}
                    type="button"
                >
                    {isUploading ? "업로드 중" : "Image"}
                </button>
                <input
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(event) => {
                        void handleImageChange(event);
                    }}
                    ref={fileInputRef}
                    type="file"
                />
                <button
                    className={`${toolbarButtonClassName} ${toolbarButtonIdleClassName}`}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        runToolbarCommand(() => {
                            editor?.chain().setParagraph().run();
                        });
                    }}
                    type="button"
                >
                    P
                </button>
            </div>

            <EditorContent
                editor={editor}
                className="p-[1.6rem]"
            />
        </div>
    );
}
