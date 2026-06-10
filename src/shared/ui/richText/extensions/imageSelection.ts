import type { Editor } from "@tiptap/core";
import { NodeSelection } from "@tiptap/pm/state";

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

export function applyImageAlign(editor: Editor, position: number, align: "left" | "center" | "right") {
    const node = editor.state.doc.nodeAt(position);

    if (!node || node.type.name !== "image") {
        return false;
    }

    return editor.chain().setNodeSelection(position).setImageAlign(align).focus(undefined, { scrollIntoView: false }).run();
}
