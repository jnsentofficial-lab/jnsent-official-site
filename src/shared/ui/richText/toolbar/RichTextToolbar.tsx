"use client";

import type { Editor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { ColorPickerPopover } from "@/shared/ui/richText/toolbar/ColorPickerPopover";
import { isSameColor } from "@/shared/ui/richText/toolbar/colorPalette";
import {
    IconAlign,
    IconBold,
    IconChevronDown,
    IconImage,
    IconItalic,
    IconLineHeight,
    IconLink,
    IconList,
    IconSpecialChar,
    IconStrike,
    IconSubscript,
    IconSuperscript,
    IconUnderline,
} from "@/shared/ui/richText/toolbar/icons";

type RichTextToolbarState = {
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    isStrike: boolean;
    isSuperscript: boolean;
    isSubscript: boolean;
    isBulletList: boolean;
    isOrderedList: boolean;
    isLink: boolean;
    textAlign: "left" | "center" | "right" | "justify" | null;
    textColor: string | null;
    highlightColor: string | null;
    fontFamily: string | null;
    fontSize: string | null;
    lineHeight: string | null;
    blockStyle: "paragraph" | "heading2" | "heading3";
};

type RichTextToolbarProps = {
    editor: Editor | null;
    editorState: RichTextToolbarState | null;
    isUploading: boolean;
    hasImageUpload: boolean;
    onImageUploadClick: () => void;
};

type DropdownKey = "style" | "font" | "size" | "align" | "lineHeight" | "list" | "special" | null;
type ColorPickerKey = "text" | "highlight" | null;

const dividerClassName = "h-[2.4rem] w-[0.1rem] bg-[var(--adaptive-grey200)]";
const toolbarButtonClassName =
    "flex h-[4.4rem] min-w-[4.4rem] items-center justify-center px-[0.8rem] text-[var(--adaptive-grey800)] transition hover:bg-[var(--adaptive-grey100)]";
const toolbarButtonActiveClassName = "bg-[var(--adaptive-grey100)] text-[var(--adaptive-grey900)]";
const dropdownTriggerClassName =
    "flex h-[4.4rem] items-center gap-[0.4rem] px-[1.2rem] text-[1.3rem] font-[600] text-[var(--adaptive-grey800)] transition hover:bg-[var(--adaptive-grey100)]";

const styleOptions = [
    { label: "본문", value: "paragraph" as const },
    { label: "제목1", value: "heading2" as const },
    { label: "제목2", value: "heading3" as const },
];

const fontOptions = [
    { label: "나눔스퀘어", value: "NanumSquare, sans-serif" },
    { label: "맑은 고딕", value: '"Malgun Gothic", sans-serif' },
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
];

const fontSizeOptions = ["11px", "13px", "15px", "16px", "19px", "24px", "28px", "30px", "34px", "38px"];

const alignOptions = [
    { label: "왼쪽 정렬", value: "left" as const },
    { label: "가운데 정렬", value: "center" as const },
    { label: "오른쪽 정렬", value: "right" as const },
    { label: "양쪽 정렬", value: "justify" as const },
];

const lineHeightOptions = [
    { label: "1.0", value: "1" },
    { label: "1.2", value: "1.2" },
    { label: "1.5", value: "1.5" },
    { label: "1.8", value: "1.8" },
    { label: "2.0", value: "2" },
];

const listOptions = [
    { label: "글머리 기호", value: "bullet" as const },
    { label: "번호 매기기", value: "ordered" as const },
];

const specialCharacters = ["※", "•", "…", "—", "©", "®", "™", "°", "±", "×", "÷", "→", "←", "↑", "↓", "★", "☆", "♥", "♡", "○", "●"];

function pushRecentColor(colors: string[], color: string) {
    return [color, ...colors.filter((item) => !isSameColor(item, color))].slice(0, 8);
}

function ToolbarDivider() {
    return <div className={dividerClassName} />;
}

function DropdownMenu({
    open,
    options,
    onSelect,
}: {
    open: boolean;
    options: Array<{ label: string; value: string; selected?: boolean }>;
    onSelect: (value: string) => void;
}) {
    if (!open) {
        return null;
    }

    return (
        <div className="absolute left-0 top-[calc(100%+0.4rem)] z-30 min-w-[14rem] border border-[var(--adaptive-grey200)] bg-white py-[0.4rem] shadow-[0_1.2rem_2.4rem_rgba(0,0,0,0.12)]">
            {options.map((option) => (
                <button
                    className={`flex w-full items-center px-[1.2rem] py-[0.8rem] text-left text-[1.3rem] ${option.selected ? "bg-[var(--adaptive-grey100)] font-[700]" : "font-[500]"} text-[var(--adaptive-grey800)] hover:bg-[var(--adaptive-grey100)]`}
                    key={option.value}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        onSelect(option.value);
                    }}
                    type="button"
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

export function RichTextToolbar({ editor, editorState, isUploading, hasImageUpload, onImageUploadClick }: RichTextToolbarProps) {
    const toolbarRef = useRef<HTMLDivElement>(null);
    const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
    const [openColorPicker, setOpenColorPicker] = useState<ColorPickerKey>(null);
    const [recentTextColors, setRecentTextColors] = useState<string[]>([]);
    const [recentHighlightColors, setRecentHighlightColors] = useState<string[]>([]);

    function closeMenus() {
        setOpenDropdown(null);
        setOpenColorPicker(null);
    }

    useEffect(() => {
        if (!openDropdown && !openColorPicker) {
            return;
        }

        function handlePointerDown(event: MouseEvent) {
            if (!toolbarRef.current?.contains(event.target as Node)) {
                closeMenus();
            }
        }

        document.addEventListener("mousedown", handlePointerDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
        };
    }, [openColorPicker, openDropdown]);

    function runCommand(command: () => void) {
        if (!editor) {
            return;
        }

        command();
        editor.commands.focus(undefined, { scrollIntoView: false });
    }

    function toggleDropdown(key: DropdownKey) {
        setOpenColorPicker(null);
        setOpenDropdown((prev) => (prev === key ? null : key));
    }

    function toggleColorPicker(key: ColorPickerKey) {
        setOpenDropdown(null);
        setOpenColorPicker((prev) => (prev === key ? null : key));
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

    function applyTextColor(color: string | null) {
        runCommand(() => {
            if (!color) {
                editor?.chain().unsetColor().run();
                return;
            }

            editor?.chain().setColor(color).run();
            setRecentTextColors((prev) => pushRecentColor(prev, color));
        });
        closeMenus();
    }

    function applyHighlightColor(color: string | null) {
        runCommand(() => {
            if (!color) {
                editor?.chain().unsetHighlight().run();
                return;
            }

            editor?.chain().setHighlight({ color }).run();
            setRecentHighlightColors((prev) => pushRecentColor(prev, color));
        });
        closeMenus();
    }

    function insertSpecialCharacter(character: string) {
        runCommand(() => {
            editor?.chain().insertContent(character).run();
        });
        closeMenus();
    }

    const currentStyle = styleOptions.find((option) => option.value === editorState?.blockStyle) ?? styleOptions[0];
    const currentFont = fontOptions.find((option) => option.value === editorState?.fontFamily) ?? fontOptions[0];
    const currentFontSize = editorState?.fontSize ?? "16px";
    const currentLineHeight = editorState?.lineHeight ?? "1.5";
    const currentTextColor = editorState?.textColor ?? null;
    const currentHighlightColor = editorState?.highlightColor ?? null;

    return (
        <div
            className="sticky z-10 flex flex-wrap items-center border-b border-b-[var(--adaptive-grey200)] bg-[#f7f8fa]"
            data-rich-text-toolbar
            ref={toolbarRef}
        >
            <div
                className="relative"
                data-toolbar-menu
            >
                <button
                    className={dropdownTriggerClassName}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        toggleDropdown("style");
                    }}
                    type="button"
                >
                    <span>{currentStyle.label}</span>
                    <IconChevronDown />
                </button>
                <DropdownMenu
                    onSelect={(value) => {
                        runCommand(() => {
                            if (value === "paragraph") {
                                editor?.chain().setParagraph().run();
                            }
                            if (value === "heading2") {
                                editor?.chain().setHeading({ level: 2 }).run();
                            }
                            if (value === "heading3") {
                                editor?.chain().setHeading({ level: 3 }).run();
                            }
                        });
                        closeMenus();
                    }}
                    open={openDropdown === "style"}
                    options={styleOptions.map((option) => ({
                        ...option,
                        selected: option.value === editorState?.blockStyle,
                    }))}
                />
            </div>

            <ToolbarDivider />

            <div
                className="relative"
                data-toolbar-menu
            >
                <button
                    className={dropdownTriggerClassName}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        toggleDropdown("font");
                    }}
                    type="button"
                >
                    <span className="max-w-[10rem] truncate">{currentFont.label}</span>
                    <IconChevronDown />
                </button>
                <DropdownMenu
                    onSelect={(value) => {
                        runCommand(() => {
                            editor?.chain().setFontFamily(value).run();
                        });
                        closeMenus();
                    }}
                    open={openDropdown === "font"}
                    options={fontOptions.map((option) => ({
                        label: option.label,
                        value: option.value,
                        selected: option.value === editorState?.fontFamily,
                    }))}
                />
            </div>

            <ToolbarDivider />

            <div
                className="relative"
                data-toolbar-menu
            >
                <button
                    className={dropdownTriggerClassName}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        toggleDropdown("size");
                    }}
                    type="button"
                >
                    <span>{currentFontSize.replace("px", "")}</span>
                    <IconChevronDown />
                </button>
                <DropdownMenu
                    onSelect={(value) => {
                        runCommand(() => {
                            editor?.chain().setFontSize(value).run();
                        });
                        closeMenus();
                    }}
                    open={openDropdown === "size"}
                    options={fontSizeOptions.map((option) => ({
                        label: option.replace("px", ""),
                        value: option,
                        selected: option === editorState?.fontSize,
                    }))}
                />
            </div>

            <ToolbarDivider />

            <button
                aria-label="굵게"
                className={`${toolbarButtonClassName} ${editorState?.isBold ? toolbarButtonActiveClassName : ""}`}
                onPointerDown={(event) => {
                    event.preventDefault();
                    runCommand(() => {
                        editor?.chain().toggleBold().run();
                    });
                }}
                type="button"
            >
                <IconBold />
            </button>
            <button
                aria-label="기울임"
                className={`${toolbarButtonClassName} ${editorState?.isItalic ? toolbarButtonActiveClassName : ""}`}
                onPointerDown={(event) => {
                    event.preventDefault();
                    runCommand(() => {
                        editor?.chain().toggleItalic().run();
                    });
                }}
                type="button"
            >
                <IconItalic />
            </button>
            <button
                aria-label="밑줄"
                className={`${toolbarButtonClassName} ${editorState?.isUnderline ? toolbarButtonActiveClassName : ""}`}
                onPointerDown={(event) => {
                    event.preventDefault();
                    runCommand(() => {
                        editor?.chain().toggleUnderline().run();
                    });
                }}
                type="button"
            >
                <IconUnderline />
            </button>
            <button
                aria-label="취소선"
                className={`${toolbarButtonClassName} ${editorState?.isStrike ? toolbarButtonActiveClassName : ""}`}
                onPointerDown={(event) => {
                    event.preventDefault();
                    runCommand(() => {
                        editor?.chain().toggleStrike().run();
                    });
                }}
                type="button"
            >
                <IconStrike />
            </button>

            <div
                className="relative"
                data-toolbar-menu
            >
                <button
                    aria-label="글자 색상"
                    className={`${toolbarButtonClassName} gap-[0.4rem] ${openColorPicker === "text" ? toolbarButtonActiveClassName : ""}`}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        toggleColorPicker("text");
                    }}
                    type="button"
                >
                    <span className="relative text-[1.6rem] font-[700] leading-none">T</span>
                    <span
                        className="h-[1rem] w-[1rem] border border-[var(--adaptive-grey300)]"
                        style={{ backgroundColor: currentTextColor ?? "#000000" }}
                    />
                </button>
                <ColorPickerPopover
                    currentColor={currentTextColor}
                    mode="text"
                    onClose={closeMenus}
                    onSelect={applyTextColor}
                    open={openColorPicker === "text"}
                    recentColors={recentTextColors}
                />
            </div>

            <div
                className="relative"
                data-toolbar-menu
            >
                <button
                    aria-label="배경 색상"
                    className={`${toolbarButtonClassName} ${openColorPicker === "highlight" ? toolbarButtonActiveClassName : ""}`}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        toggleColorPicker("highlight");
                    }}
                    type="button"
                >
                    <span className="relative flex h-[2rem] w-[2rem] items-center justify-center border border-[var(--adaptive-grey500)] text-[1.4rem] font-[700] leading-none">
                        T
                        <span
                            className="absolute bottom-[0.2rem] right-[0.2rem] h-[0.7rem] w-[0.7rem] border border-[var(--adaptive-grey300)]"
                            style={{ backgroundColor: currentHighlightColor ?? "#ffffff" }}
                        />
                    </span>
                </button>
                <ColorPickerPopover
                    currentColor={currentHighlightColor}
                    mode="highlight"
                    onClose={closeMenus}
                    onSelect={applyHighlightColor}
                    open={openColorPicker === "highlight"}
                    recentColors={recentHighlightColors}
                />
            </div>

            <ToolbarDivider />

            <div
                className="relative"
                data-toolbar-menu
            >
                <button
                    className={dropdownTriggerClassName}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        toggleDropdown("align");
                    }}
                    type="button"
                >
                    <IconAlign />
                    <IconChevronDown />
                </button>
                <DropdownMenu
                    onSelect={(value) => {
                        runCommand(() => {
                            editor?.chain().setTextAlign(value as "left" | "center" | "right" | "justify").run();
                        });
                        closeMenus();
                    }}
                    open={openDropdown === "align"}
                    options={alignOptions.map((option) => ({
                        label: option.label,
                        value: option.value,
                        selected: option.value === editorState?.textAlign,
                    }))}
                />
            </div>

            <div
                className="relative"
                data-toolbar-menu
            >
                <button
                    className={dropdownTriggerClassName}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        toggleDropdown("lineHeight");
                    }}
                    type="button"
                >
                    <IconLineHeight />
                    <IconChevronDown />
                </button>
                <DropdownMenu
                    onSelect={(value) => {
                        runCommand(() => {
                            editor?.chain().setLineHeight(value).run();
                        });
                        closeMenus();
                    }}
                    open={openDropdown === "lineHeight"}
                    options={lineHeightOptions.map((option) => ({
                        label: option.label,
                        value: option.value,
                        selected: option.value === currentLineHeight,
                    }))}
                />
            </div>

            <div
                className="relative"
                data-toolbar-menu
            >
                <button
                    className={dropdownTriggerClassName}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        toggleDropdown("list");
                    }}
                    type="button"
                >
                    <IconList />
                    <IconChevronDown />
                </button>
                <DropdownMenu
                    onSelect={(value) => {
                        runCommand(() => {
                            if (value === "bullet") {
                                editor?.chain().toggleBulletList().run();
                            }
                            if (value === "ordered") {
                                editor?.chain().toggleOrderedList().run();
                            }
                        });
                        closeMenus();
                    }}
                    open={openDropdown === "list"}
                    options={listOptions.map((option) => ({
                        label: option.label,
                        value: option.value,
                        selected: (option.value === "bullet" && editorState?.isBulletList) || (option.value === "ordered" && editorState?.isOrderedList),
                    }))}
                />
            </div>

            <ToolbarDivider />

            <button
                aria-label="위 첨자"
                className={`${toolbarButtonClassName} ${editorState?.isSuperscript ? toolbarButtonActiveClassName : ""}`}
                onPointerDown={(event) => {
                    event.preventDefault();
                    runCommand(() => {
                        editor?.chain().toggleSuperscript().run();
                    });
                }}
                type="button"
            >
                <IconSuperscript />
            </button>
            <button
                aria-label="아래 첨자"
                className={`${toolbarButtonClassName} ${editorState?.isSubscript ? toolbarButtonActiveClassName : ""}`}
                onPointerDown={(event) => {
                    event.preventDefault();
                    runCommand(() => {
                        editor?.chain().toggleSubscript().run();
                    });
                }}
                type="button"
            >
                <IconSubscript />
            </button>

            <div
                className="relative"
                data-toolbar-menu
            >
                <button
                    aria-label="특수문자"
                    className={`${toolbarButtonClassName} ${openDropdown === "special" ? toolbarButtonActiveClassName : ""}`}
                    onPointerDown={(event) => {
                        event.preventDefault();
                        toggleDropdown("special");
                    }}
                    type="button"
                >
                    <IconSpecialChar />
                </button>
                {openDropdown === "special" ? (
                    <div className="absolute left-0 top-[calc(100%+0.4rem)] z-30 grid w-[20rem] grid-cols-5 gap-[0.4rem] border border-[var(--adaptive-grey200)] bg-white p-[0.8rem] shadow-[0_1.2rem_2.4rem_rgba(0,0,0,0.12)]">
                        {specialCharacters.map((character) => (
                            <button
                                className="flex h-[3.2rem] items-center justify-center text-[1.6rem] hover:bg-[var(--adaptive-grey100)]"
                                key={character}
                                onPointerDown={(event) => {
                                    event.preventDefault();
                                    insertSpecialCharacter(character);
                                }}
                                type="button"
                            >
                                {character}
                            </button>
                        ))}
                    </div>
                ) : null}
            </div>

            <button
                aria-label="링크"
                className={`${toolbarButtonClassName} ${editorState?.isLink ? toolbarButtonActiveClassName : ""}`}
                onPointerDown={(event) => {
                    event.preventDefault();
                    setLink();
                }}
                type="button"
            >
                <IconLink />
            </button>

            {hasImageUpload ? (
                <>
                    <ToolbarDivider />
                    <button
                        aria-label="이미지"
                        className={`${toolbarButtonClassName} disabled:text-[var(--adaptive-grey400)]`}
                        disabled={isUploading}
                        onPointerDown={(event) => {
                            event.preventDefault();
                            onImageUploadClick();
                        }}
                        type="button"
                    >
                        <IconImage />
                    </button>
                </>
            ) : null}
        </div>
    );
}
