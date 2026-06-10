"use client";

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useRef } from "react";
import { getImageElementStyle, getImageFrameStyle, getImageWrapperStyle, normalizeImageAlign, normalizeImageWidth } from "@/shared/ui/richText/extensions/imageLayout";

function clampWidthPercent(nextWidth: number, parentWidth: number) {
    if (parentWidth <= 0) {
        return 100;
    }

    const percent = Math.round((nextWidth / parentWidth) * 100);

    return Math.min(100, Math.max(20, percent));
}

export function ResizableImageNodeView({ node, selected, updateAttributes }: NodeViewProps) {
    const frameRef = useRef<HTMLDivElement>(null);
    const align = normalizeImageAlign(node.attrs.align);
    const width = normalizeImageWidth(node.attrs.imageWidth);

    function startResize(event: React.PointerEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();

        const frame = frameRef.current;
        const editorElement = frame?.closest(".ProseMirror");

        if (!frame || !editorElement) {
            return;
        }

        const parentWidth = editorElement.clientWidth;
        const startWidth = frame.offsetWidth;
        const startX = event.clientX;

        function handlePointerMove(moveEvent: PointerEvent) {
            const deltaX = moveEvent.clientX - startX;
            const nextWidth = clampWidthPercent(startWidth + deltaX, parentWidth);

            updateAttributes({
                imageWidth: `${nextWidth}%`,
            });
        }

        function handlePointerUp() {
            document.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("pointerup", handlePointerUp);
        }

        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", handlePointerUp);
    }

    return (
        <NodeViewWrapper
            as="div"
            className="rich-text-image-node"
            data-align={align}
            style={getImageWrapperStyle(align)}
        >
            <div
                className={`relative ${selected ? "outline outline-2 outline-[#3b82f6]" : ""}`}
                contentEditable={false}
                ref={frameRef}
                style={getImageFrameStyle(width)}
            >
                <img
                    alt={String(node.attrs.alt ?? "")}
                    draggable={false}
                    src={String(node.attrs.src ?? "")}
                    style={getImageElementStyle()}
                />

                {selected ? (
                    <button
                        aria-label="이미지 크기 조절"
                        className="absolute bottom-[-0.6rem] right-[-0.6rem] h-[1.4rem] w-[1.4rem] cursor-se-resize border border-white bg-[#3b82f6]"
                        onPointerDown={startResize}
                        type="button"
                    />
                ) : null}
            </div>
        </NodeViewWrapper>
    );
}
