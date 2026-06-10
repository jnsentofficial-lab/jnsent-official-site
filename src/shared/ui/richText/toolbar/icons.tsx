import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const iconClassName = "h-[1.8rem] w-[1.8rem]";

export function IconBold(props: IconProps) {
    return (
        <svg
            aria-hidden
            className={iconClassName}
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M5 3.5h5.2a3.2 3.2 0 0 1 0 6.4H5V3.5Zm0 6.9h5.8a3.4 3.4 0 0 1 0 6.8H5v-6.8Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function IconItalic(props: IconProps) {
    return (
        <svg
            aria-hidden
            className={iconClassName}
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M10.5 3.5h-4l-.8 1.5h2.1L7.2 13H5l-.8 1.5h6.8l.8-1.5H9.7l2.6-9H12l.8-1.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function IconUnderline(props: IconProps) {
    return (
        <svg
            aria-hidden
            className={iconClassName}
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M5 3.5v4.8a4 4 0 0 0 8 0V3.5h1.8v4.8a5.8 5.8 0 0 1-11.6 0V3.5H5ZM4 14.8h10v1.2H4v-1.2Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function IconStrike(props: IconProps) {
    return (
        <svg
            aria-hidden
            className={iconClassName}
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M4 9.2h10v1.2H4V9.2Zm2.2-3.1a3.4 3.4 0 0 1 5.6-1.1l1.1 1.1-1.3 1-1-.9a1.8 1.8 0 0 0-2.9.7H6.2Zm5.6 5.8a3.4 3.4 0 0 1-5.6 1.1l-1.1-1.1 1.3-1 1 .9a1.8 1.8 0 0 0 2.9-.7h1.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function IconAlign(props: IconProps) {
    return (
        <svg
            aria-hidden
            className={iconClassName}
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M3.5 4h11v1.2H3.5V4Zm0 3.2h8v1.2h-8V7.2Zm0 3.2h11v1.2H3.5v-1.2Zm0 3.2h6v1.2h-6v-1.2Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function IconLineHeight(props: IconProps) {
    return (
        <svg
            aria-hidden
            className={iconClassName}
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M9 3.2 6.4 5.8 7.5 7l1.5-1.5V11l-1.5-1.5L6.4 10l2.6 2.6L11.6 10l-1.1-1.1-1.5 1.5V5.5l1.5 1.5 1.1-1.1L9 3.2ZM4 4.2h1.2v9.6H4V4.2Zm8.8 0H14v9.6h-1.2V4.2Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function IconList(props: IconProps) {
    return (
        <svg
            aria-hidden
            className={iconClassName}
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M4.2 5.2a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 4.8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 4.8a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM7 4.5h8v1.2H7V4.5Zm0 4.8h8v1.2H7V9.3Zm0 4.8h8v1.2H7v-1.2Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function IconSuperscript(props: IconProps) {
    return (
        <svg
            aria-hidden
            className={iconClassName}
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M5.2 12.2 8.4 8.8 5.6 5.6h3.1l1.8 2.2 1.8-2.2h3l-2.8 3.2 3.2 3.4H10l-1.6-2-1.6 2H5.2ZM12.2 4.2h2.2l-1.1 2.2h-1.5l.4-2.2Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function IconSubscript(props: IconProps) {
    return (
        <svg
            aria-hidden
            className={iconClassName}
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M5.2 10.8 8.4 7.4 5.6 4.2h3.1l1.8 2.2 1.8-2.2h3l-2.8 3.2 3.2 3.4H10l-1.6-2-1.6 2H5.2ZM12.2 12.8h2.2l-1.1 2.2h-1.5l.4-2.2Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function IconSpecialChar(props: IconProps) {
    return (
        <svg
            aria-hidden
            className={iconClassName}
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M9 3.2a5.8 5.8 0 1 0 0 11.6A5.8 5.8 0 0 0 9 3.2Zm0 1.4a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Zm-.2 2.4h1.4l-.3 4.2H8.5l-.3-4.2Zm.7 6.1a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function IconLink(props: IconProps) {
    return (
        <svg
            aria-hidden
            className={iconClassName}
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M7.2 10.8a2.8 2.8 0 0 0 3.9 0l2.2-2.2a2.8 2.8 0 1 0-4-4L9.2 6.1l-.8-.8 1.7-1.7a4.2 4.2 0 0 1 5.9 5.9l-2.2 2.2a4.2 4.2 0 0 1-5.9 0l-.4-.4.8-.8.4.4a2.8 2.8 0 0 0 3.9 0ZM10.8 7.2a2.8 2.8 0 0 0-3.9 0L4.7 9.4a2.8 2.8 0 1 0 4 4l2.1-2.1.8.8-1.7 1.7a4.2 4.2 0 0 1-5.9-5.9l2.2-2.2a4.2 4.2 0 0 1 5.9 0l.4.4-.8.8-.4-.4Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function IconImage(props: IconProps) {
    return (
        <svg
            aria-hidden
            className={iconClassName}
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <path
                d="M4.2 4.2h9.6v9.6H4.2V4.2Zm1.2 1.2v5.9l2.1-2.2 1.8 2.1 2.4-3.1 1.7 2.1V5.4H5.4Zm1.2 1.4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function IconChevronDown(props: IconProps) {
    return (
        <svg
            aria-hidden
            className="h-[1.2rem] w-[1.2rem]"
            fill="none"
            viewBox="0 0 12 12"
            {...props}
        >
            <path
                d="M2.5 4.5 6 8l3.5-3.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.4"
            />
        </svg>
    );
}
