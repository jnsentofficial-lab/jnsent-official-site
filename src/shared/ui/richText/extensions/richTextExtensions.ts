import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (fontSize: string) => ReturnType;
            unsetFontSize: () => ReturnType;
        };
        lineHeight: {
            setLineHeight: (lineHeight: string) => ReturnType;
            unsetLineHeight: () => ReturnType;
        };
    }
}

export const FontSize = Extension.create({
    name: "fontSize",
    addOptions() {
        return {
            types: ["textStyle"],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) => element.style.fontSize || null,
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) {
                                return {};
                            }

                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize:
                (fontSize) =>
                ({ chain }) =>
                    chain().setMark("textStyle", { fontSize }).run(),
            unsetFontSize:
                () =>
                ({ chain }) =>
                    chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
        };
    },
});

export const LineHeight = Extension.create({
    name: "lineHeight",
    addOptions() {
        return {
            types: ["paragraph", "heading"],
            defaultLineHeight: "1.5",
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: null,
                        parseHTML: (element) => element.style.lineHeight || null,
                        renderHTML: (attributes) => {
                            if (!attributes.lineHeight) {
                                return {};
                            }

                            return {
                                style: `line-height: ${attributes.lineHeight}`,
                            };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setLineHeight:
                (lineHeight) =>
                ({ editor, commands }) => {
                    const blockType = editor.state.selection.$head.parent.type.name;

                    if (blockType === "heading") {
                        return commands.updateAttributes("heading", { lineHeight });
                    }

                    return commands.updateAttributes("paragraph", { lineHeight });
                },
            unsetLineHeight:
                () =>
                ({ editor, commands }) => {
                    const blockType = editor.state.selection.$head.parent.type.name;

                    if (blockType === "heading") {
                        return commands.updateAttributes("heading", { lineHeight: null });
                    }

                    return commands.updateAttributes("paragraph", { lineHeight: null });
                },
        };
    },
});
