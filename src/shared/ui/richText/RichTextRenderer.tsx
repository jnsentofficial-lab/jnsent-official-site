import type { JSONContent } from "@tiptap/core";
import type React from "react";
import type { CSSProperties } from "react";
import type { Json } from "@/shared/types/Database";
import { hasRichTextContent, toRichTextContent } from "@/shared/lib/richText/richText";

type RichTextRendererProps = {
    content: Json | null | undefined;
    fallback?: string | null;
    className?: string;
};

function isSafeHref(href: string) {
    return href.startsWith("https://") || href.startsWith("http://") || href.startsWith("mailto:") || href.startsWith("tel:");
}

function isSafeColor(color: string) {
    return /^#[0-9a-fA-F]{3,8}$/.test(color) || /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(color);
}

function getBlockStyle(attrs?: JSONContent["attrs"]): CSSProperties | undefined {
    const style: CSSProperties = {};
    const textAlign = attrs?.textAlign;

    if (textAlign === "center" || textAlign === "right" || textAlign === "left" || textAlign === "justify") {
        style.textAlign = textAlign;
    }

    if (typeof attrs?.lineHeight === "string" && attrs.lineHeight) {
        style.lineHeight = attrs.lineHeight;
    }

    return Object.keys(style).length > 0 ? style : undefined;
}

function getTextStyle(marks: JSONContent["marks"]): CSSProperties | undefined {
    const textStyleMark = marks?.find((mark) => mark.type === "textStyle");
    const colorMark = marks?.find((mark) => mark.type === "color");
    const style: CSSProperties = {};

    if (typeof textStyleMark?.attrs?.fontFamily === "string" && textStyleMark.attrs.fontFamily) {
        style.fontFamily = textStyleMark.attrs.fontFamily;
    }

    if (typeof textStyleMark?.attrs?.fontSize === "string" && textStyleMark.attrs.fontSize) {
        style.fontSize = textStyleMark.attrs.fontSize;
    }

    const color = String(textStyleMark?.attrs?.color ?? colorMark?.attrs?.color ?? "");

    if (color && isSafeColor(color)) {
        style.color = color;
    }

    return Object.keys(style).length > 0 ? style : undefined;
}

function renderMarks(children: React.ReactNode, marks: JSONContent["marks"]) {
    const inlineStyle = getTextStyle(marks);
    let content = inlineStyle ? <span style={inlineStyle}>{children}</span> : children;

    return (marks ?? []).reduce((current, mark) => {
        if (mark.type === "bold") {
            return <strong>{current}</strong>;
        }

        if (mark.type === "italic") {
            return <em>{current}</em>;
        }

        if (mark.type === "underline") {
            return <u>{current}</u>;
        }

        if (mark.type === "strike") {
            return <s>{current}</s>;
        }

        if (mark.type === "superscript") {
            return <sup>{current}</sup>;
        }

        if (mark.type === "subscript") {
            return <sub>{current}</sub>;
        }

        if (mark.type === "highlight") {
            const color = String(mark.attrs?.color ?? "");

            if (color && isSafeColor(color)) {
                return <mark style={{ backgroundColor: color }}>{current}</mark>;
            }
        }

        if (mark.type === "link") {
            const href = String(mark.attrs?.href ?? "");

            return isSafeHref(href) ? (
                <a
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                >
                    {current}
                </a>
            ) : (
                current
            );
        }

        return current;
    }, content);
}

function renderNode(node: JSONContent, index: number): React.ReactNode {
    const children = node.content?.map(renderNode);
    const blockStyle = getBlockStyle(node.attrs);

    if (node.type === "text") {
        return <span key={index}>{renderMarks(node.text ?? "", node.marks)}</span>;
    }

    if (node.type === "paragraph") {
        return (
            <p
                key={index}
                style={blockStyle}
            >
                {children?.length ? children : <br />}
            </p>
        );
    }

    if (node.type === "heading") {
        const level = node.attrs?.level === 3 ? 3 : 2;

        return level === 3 ? (
            <h3
                key={index}
                style={blockStyle}
            >
                {children}
            </h3>
        ) : (
            <h2
                key={index}
                style={blockStyle}
            >
                {children}
            </h2>
        );
    }

    if (node.type === "bulletList") {
        return <ul key={index}>{children}</ul>;
    }

    if (node.type === "orderedList") {
        return <ol key={index}>{children}</ol>;
    }

    if (node.type === "listItem") {
        return <li key={index}>{children}</li>;
    }

    if (node.type === "hardBreak") {
        return <br key={index} />;
    }

    if (node.type === "image") {
        const src = String(node.attrs?.src ?? "");
        const alt = String(node.attrs?.alt ?? "");

        if (!isSafeHref(src)) {
            return null;
        }

        return (
            <img
                alt={alt}
                className="my-5 h-auto max-w-full rounded-lg border border-slate-200 object-contain"
                key={index}
                src={src}
            />
        );
    }

    return children;
}

export function RichTextRenderer({ content, fallback, className = "" }: RichTextRendererProps) {
    const richText = toRichTextContent(content);
    const nodes = richText.content ?? [];

    if (!hasRichTextContent(content) && fallback) {
        return <p className={className}>{fallback}</p>;
    }

    return (
        <div
            className={`text-base leading-[1.5] text-slate-700 [&_a]:font-bold [&_a]:text-blue-700 [&_a]:underline [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-bold [&_li]:mb-1.5 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_p]:mt-0 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 ${className}`}
        >
            {nodes.map(renderNode)}
        </div>
    );
}
