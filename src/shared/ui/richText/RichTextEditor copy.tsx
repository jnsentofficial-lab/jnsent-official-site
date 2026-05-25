"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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

export function RichTextEditor({ value = emptyRichTextContent, onChange, onImageUpload, placeholder = "본문을 입력하세요." }: RichTextEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3],
                },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https",
            }),
            Image.configure({
                allowBase64: false,
                inline: false,
            }),
        ],
        content: value,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "min-h-[18rem] rounded-b-lg border border-t-0 border-slate-300 bg-white px-4 py-3 text-base leading-[1.8] outline-none [&_a]:text-blue-700 [&_a]:underline [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-bold [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6",
                "data-placeholder": placeholder,
            },
        },
        onUpdate: ({ editor: currentEditor }) => {
            onChange(currentEditor.getJSON());
        },
    });

    useEffect(() => {
        if (!editor) {
            return;
        }

        const current = JSON.stringify(editor.getJSON());
        const next = JSON.stringify(value);

        if (current !== next) {
            editor.commands.setContent(value);
        }
    }, [editor, value]);

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
            editor.chain().focus().unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
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
            editor.chain().focus().setImage({ src: url, alt: file.name }).run();
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div>
            <div className="flex flex-wrap gap-1 rounded-t-lg border border-slate-300 bg-slate-50 p-2">
                {toolbarButtons.map((button) => (
                    <button
                        className={`min-h-9 rounded-md border px-3 text-sm font-bold ${editor?.isActive(button.action === "heading" ? "heading" : button.action, button.action === "heading" ? { level: 2 } : undefined) ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-700"}`}
                        key={button.action}
                        onClick={() => {
                            if (button.action === "bold") editor?.chain().focus().toggleBold().run();
                            if (button.action === "italic") editor?.chain().focus().toggleItalic().run();
                            if (button.action === "underline") editor?.chain().focus().toggleUnderline().run();
                            if (button.action === "heading") editor?.chain().focus().toggleHeading({ level: 2 }).run();
                            if (button.action === "bulletList") editor?.chain().focus().toggleBulletList().run();
                            if (button.action === "orderedList") editor?.chain().focus().toggleOrderedList().run();
                        }}
                        type="button"
                    >
                        {button.label}
                    </button>
                ))}
                <button
                    className={`min-h-9 rounded-md border px-3 text-sm font-bold ${editor?.isActive("link") ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-700"}`}
                    onClick={setLink}
                    type="button"
                >
                    Link
                </button>
                <button
                    className="min-h-9 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 disabled:bg-slate-100 disabled:text-slate-400"
                    disabled={!onImageUpload || isUploading}
                    onClick={() => fileInputRef.current?.click()}
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
                    className="min-h-9 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700"
                    onClick={() => editor?.chain().focus().setParagraph().run()}
                    type="button"
                >
                    P
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
