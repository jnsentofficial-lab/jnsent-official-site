import type { Editor } from "@tiptap/core";
import { NodeSelection } from "@tiptap/pm/state";
import { normalizeImageAlign, type ImageAlign } from "@/shared/ui/richText/extensions/imageLayout";

export function getSelectedImagePosition(editor: Editor | null) {
    if (!editor) {
        return null;
    }

    const { selection } = editor.state;

    if (selection instanceof NodeSelection && selection.node.type.name === "image") {
        return selection.from;
    }

    return null;
}

export function getImagePositionsInRange(editor: Editor, from: number, to: number) {
    const positions: number[] = [];

    editor.state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === "image") {
            positions.push(pos);
        }
    });

    return positions;
}

export function getImagePositionsInSelection(editor: Editor) {
    const { from, to } = editor.state.selection;

    return getImagePositionsInRange(editor, from, to);
}

export function applyImageAlign(editor: Editor, position: number, align: ImageAlign) {
    const node = editor.state.doc.nodeAt(position);

    if (!node || node.type.name !== "image") {
        return false;
    }

    return editor.chain().setNodeSelection(position).setImageAlign(align).focus(undefined, { scrollIntoView: false }).run();
}

export function applyAlignmentToSelection(editor: Editor, value: string) {
    const textAlign = value as "left" | "center" | "right" | "justify";
    const imageAlign = normalizeImageAlign(value === "justify" ? "left" : value);
    const imagePositions = getImagePositionsInSelection(editor);

    return editor
        .chain()
        .command(({ tr, state }) => {
            imagePositions.forEach((position) => {
                const node = state.doc.nodeAt(position);

                if (!node || node.type.name !== "image") {
                    return;
                }

                tr.setNodeMarkup(position, undefined, {
                    ...node.attrs,
                    align: imageAlign,
                });
            });

            return true;
        })
        .setTextAlign(textAlign)
        .focus(undefined, { scrollIntoView: false })
        .run();
}
