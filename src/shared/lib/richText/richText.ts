import type { JSONContent } from "@tiptap/core";
import type { Json } from "@/shared/types/Database";

export type RichTextContent = JSONContent;

export const emptyRichTextContent: RichTextContent = {
    type: "doc",
    content: [
        {
            type: "paragraph",
        },
    ],
};

export function isRichTextContent(value: unknown): value is RichTextContent {
    return Boolean(value && typeof value === "object" && !Array.isArray(value) && "type" in value);
}

export function toRichTextContent(value: Json | null | undefined): RichTextContent {
    return isRichTextContent(value) ? value : emptyRichTextContent;
}

export function toJsonContent(value: RichTextContent): Json {
    return value as Json;
}

export function extractRichTextPlainText(value: RichTextContent): string {
    const lines: string[] = [];

    function visit(node: JSONContent): string {
        if (node.type === "text") {
            return node.text ?? "";
        }

        const text = (node.content ?? []).map(visit).join("");

        if (["paragraph", "heading", "listItem"].includes(node.type ?? "") && text.trim()) {
            lines.push(text.trim());
        }

        return text;
    }

    visit(value);

    return lines.join("\n").trim();
}

export function hasRichTextContent(value: Json | null | undefined): boolean {
    const richText = toRichTextContent(value);

    return extractRichTextPlainText(richText).length > 0 || extractRichTextImages(richText).length > 0;
}

export function extractRichTextImages(value: RichTextContent): string[] {
    const images: string[] = [];

    function visit(node: JSONContent) {
        if (node.type === "image" && typeof node.attrs?.src === "string" && node.attrs.src) {
            images.push(node.attrs.src);
        }

        (node.content ?? []).forEach(visit);
    }

    visit(value);

    return Array.from(new Set(images));
}

export function replaceRichTextImageUrls(value: RichTextContent, replace: (src: string) => string): RichTextContent {
    function visit(node: JSONContent): JSONContent {
        const nextNode: JSONContent = { ...node };

        if (node.type === "image" && typeof node.attrs?.src === "string" && node.attrs.src) {
            nextNode.attrs = {
                ...node.attrs,
                src: replace(node.attrs.src),
            };
        }

        if (node.content?.length) {
            nextNode.content = node.content.map(visit);
        }

        return nextNode;
    }

    return visit(value) as RichTextContent;
}
