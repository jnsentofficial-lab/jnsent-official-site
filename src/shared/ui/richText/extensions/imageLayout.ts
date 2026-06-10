export type ImageAlign = "left" | "center" | "right";

export function normalizeImageAlign(value: unknown): ImageAlign {
    if (value === "center" || value === "right") {
        return value;
    }

    return "left";
}

export function normalizeImageWidth(value: unknown) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return `${Math.min(100, Math.max(20, value))}%`;
    }

    if (typeof value === "string" && value.trim()) {
        if (value.endsWith("%")) {
            const percent = Number.parseInt(value, 10);

            if (Number.isFinite(percent)) {
                return `${Math.min(100, Math.max(20, percent))}%`;
            }
        }

        if (value.endsWith("px")) {
            return value;
        }
    }

    return "100%";
}

export function getImageWrapperStyle(align: ImageAlign) {
    return {
        textAlign: align,
        lineHeight: 0,
        margin: "1.6rem 0",
    } as const;
}

export function getImageFrameStyle(width: string) {
    return {
        width,
        maxWidth: "100%",
        display: "inline-block",
        verticalAlign: "top",
    } as const;
}

export function getImageElementStyle() {
    return {
        width: "100%",
        height: "auto",
        display: "block",
    } as const;
}
