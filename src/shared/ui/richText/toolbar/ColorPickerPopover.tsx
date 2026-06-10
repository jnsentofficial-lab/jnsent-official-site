"use client";

import { useEffect, useRef } from "react";
import { HIGHLIGHT_COLOR_PALETTE, isSameColor, TEXT_COLOR_PALETTE } from "@/shared/ui/richText/toolbar/colorPalette";

type ColorPickerPopoverProps = {
    open: boolean;
    mode: "text" | "highlight";
    currentColor: string | null;
    recentColors: string[];
    onClose: () => void;
    onSelect: (color: string | null) => void;
};

const paletteClassName = "grid grid-cols-10 gap-[0.1rem]";

function ColorSwatch({ color, selected, onSelect }: { color: string | null; selected: boolean; onSelect: (color: string | null) => void }) {
    const isReset = color === null;

    return (
        <button
            aria-label={isReset ? "색상 없음" : `색상 ${color}`}
            className={`relative h-[2.2rem] w-[2.2rem] border ${selected ? "border-[#333333] ring-2 ring-[#333333]/20" : "border-[var(--adaptive-grey200)]"} ${isReset ? "bg-white" : ""}`}
            onPointerDown={(event) => {
                event.preventDefault();
                onSelect(color);
            }}
            style={color ? { backgroundColor: color } : undefined}
            type="button"
        >
            {isReset ? <span className="absolute inset-0 flex items-center justify-center text-[1.4rem] leading-none text-[var(--adaptive-red500)]">/</span> : null}
        </button>
    );
}

export function ColorPickerPopover({ open, mode, currentColor, recentColors, onClose, onSelect }: ColorPickerPopoverProps) {
    const popoverRef = useRef<HTMLDivElement>(null);
    const palette = mode === "text" ? TEXT_COLOR_PALETTE : HIGHLIGHT_COLOR_PALETTE;
    const recentLabel = mode === "text" ? "최근 사용한 글자색" : "최근 사용한 배경색";

    useEffect(() => {
        if (!open) {
            return;
        }

        function handlePointerDown(event: MouseEvent) {
            if (!popoverRef.current?.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handlePointerDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
        };
    }, [onClose, open]);

    if (!open) {
        return null;
    }

    return (
        <div
            className="absolute left-0 top-[calc(100%+0.4rem)] z-30 w-[28rem] border border-[var(--adaptive-grey200)] bg-white p-[1.2rem] shadow-[0_1.2rem_2.4rem_rgba(0,0,0,0.12)]"
            ref={popoverRef}
        >
            {recentColors.length > 0 ? (
                <section className="mb-[1.2rem]">
                    <p className="mb-[0.8rem] text-[1.2rem] font-[600] text-[var(--adaptive-grey600)]">{recentLabel}</p>
                    <div className="flex flex-wrap gap-[0.4rem]">
                        {recentColors.map((color) => (
                            <ColorSwatch
                                color={color}
                                key={color}
                                onSelect={onSelect}
                                selected={isSameColor(currentColor, color)}
                            />
                        ))}
                    </div>
                </section>
            ) : null}

            <div className={paletteClassName}>
                {palette.map((color, index) => (
                    <ColorSwatch
                        color={color}
                        key={color ?? `reset-${index}`}
                        onSelect={onSelect}
                        selected={color === null ? currentColor === null : isSameColor(currentColor, color)}
                    />
                ))}
            </div>
        </div>
    );
}
