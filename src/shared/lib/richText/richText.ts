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

    function hasImage(node: JSONContent): boolean {
        if (node.type === "image" && typeof node.attrs?.src === "string" && node.attrs.src) {
            return true;
        }

        return (node.content ?? []).some(hasImage);
    }

    return extractRichTextPlainText(richText).length > 0 || hasImage(richText);
}
