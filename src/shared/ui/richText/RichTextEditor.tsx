"use client";

import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Placeholder } from "@tiptap/extensions/placeholder";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import type { RichTextContent } from "@/shared/lib/richText/richText";
import { emptyRichTextContent } from "@/shared/lib/richText/richText";
import { FontSize, LineHeight } from "@/shared/ui/richText/extensions/richTextExtensions";
import { RichTextToolbar } from "@/shared/ui/richText/toolbar/RichTextToolbar";

type RichTextEditorProps = {
    value?: RichTextContent;
    onChange: (value: RichTextContent) => void;
    onImageUpload?: (file: File) => Promise<string>;
    placeholder?: string;
};

const editorContentClassName =
    "min-h-[18rem] bg-white text-base leading-[1.5] outline-none [&_.is-editor-empty:first-child::before]:pointer-events-none [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:h-0 [&_.is-editor-empty:first-child::before]:text-slate-400 [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_a]:text-blue-700 [&_a]:underline [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-bold [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6";

export function RichTextEditor({ value = emptyRichTextContent, onChange, onImageUpload, placeholder = "본문을 입력하세요." }: RichTextEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
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
            FontFamily,
            FontSize,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            Subscript,
            Superscript,
            TextAlign.configure({
                types: ["heading", "paragraph"],
                alignments: ["left", "center", "right", "justify"],
            }),
            LineHeight,
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
        selector: ({ editor: currentEditor }) => {
            const textStyle = currentEditor?.getAttributes("textStyle") ?? {};
            const parentAttrs = currentEditor?.state.selection.$head.parent.attrs ?? {};

            return {
                isBold: currentEditor?.isActive("bold") ?? false,
                isItalic: currentEditor?.isActive("italic") ?? false,
                isUnderline: currentEditor?.isActive("underline") ?? false,
                isStrike: currentEditor?.isActive("strike") ?? false,
                isSuperscript: currentEditor?.isActive("superscript") ?? false,
                isSubscript: currentEditor?.isActive("subscript") ?? false,
                isBulletList: currentEditor?.isActive("bulletList") ?? false,
                isOrderedList: currentEditor?.isActive("orderedList") ?? false,
                isLink: currentEditor?.isActive("link") ?? false,
                textAlign: (currentEditor?.isActive({ textAlign: "justify" })
                    ? "justify"
                    : currentEditor?.isActive({ textAlign: "center" })
                      ? "center"
                      : currentEditor?.isActive({ textAlign: "right" })
                        ? "right"
                        : currentEditor?.isActive({ textAlign: "left" })
                          ? "left"
                          : null) as "left" | "center" | "right" | "justify" | null,
                textColor: (textStyle.color as string | undefined) ?? null,
                highlightColor: (currentEditor?.getAttributes("highlight").color as string | undefined) ?? null,
                fontFamily: (textStyle.fontFamily as string | undefined) ?? null,
                fontSize: (textStyle.fontSize as string | undefined) ?? null,
                lineHeight: (parentAttrs.lineHeight as string | undefined) ?? null,
                blockStyle: (currentEditor?.isActive("heading", { level: 3 })
                    ? "heading3"
                    : currentEditor?.isActive("heading", { level: 2 })
                      ? "heading2"
                      : "paragraph") as "paragraph" | "heading2" | "heading3",
            };
        },
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
            <RichTextToolbar
                editor={editor}
                editorState={editorState}
                hasImageUpload={Boolean(onImageUpload)}
                isUploading={isUploading}
                onImageUploadClick={() => {
                    fileInputRef.current?.click();
                }}
            />

            <input
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(event) => {
                    void handleImageChange(event);
                }}
                ref={fileInputRef}
                type="file"
            />

            <EditorContent
                editor={editor}
                className="p-[1.6rem]"
            />
        </div>
    );
}
