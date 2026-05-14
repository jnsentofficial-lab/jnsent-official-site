import { AnimatePresence, motion } from "motion/react";
import { ReactNode, ElementType, ComponentPropsWithoutRef, RefObject, useEffect, useRef, useState, cloneElement, isValidElement } from "react";

/**
 * @issue
 * motion.* tag 쓰면 img의 onLoad 등 native 이벤트들이 motion에서 제대로 proxy되지 않으므로
 * Skeleton.Section 내에 <img ... onLoad={...}/> 쓰면 onLoad 안됨.
 * 해결: Skeleton.Image 컴포넌트를 따로 내장해 아래처럼 사용해야 함.
 *
 * <Skeleton.Image
 *   src="..."
 *   alt="..."
 *   target={로딩완료여부}
 *   onLoad={handleImageLoad}
 *   ...props
 * />
 */

const tagMap = {
    article: "article",
    section: "section",
    header: "header",
    footer: "footer",
    main: "main",
    aside: "aside",
    nav: "nav",
    ul: "ul",
    li: "li",
    span: "span",
    div: "div",
    p: "p",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
};

const motionTagMap = {
    article: motion.article,
    section: motion.section,
    header: motion.header,
    footer: motion.footer,
    main: motion.main,
    aside: motion.aside,
    nav: motion.nav,
    ul: motion.ul,
    li: motion.li,
    span: motion.span,
    div: motion.div,
    p: motion.p,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    h4: motion.h4,
    h5: motion.h5,
    h6: motion.h6,
};

type TypeProps = "text" | "title" | "item" | "avatar" | "thumbnail" | "container" | "button" | "fit-content";

// 태그에 맞는 속성을 합쳐주는 타입
type SkeletonProps<T extends ElementType> = SkeletonBaseProps & {
    as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof SkeletonBaseProps | "as">;

interface SkeletonBaseProps {
    children?: ReactNode;
    target: boolean;
    error?: boolean;
    ref?: RefObject<HTMLElement | null>;
    onError?: () => void;
    className?: {
        common?: string;
        element?: string;
        skeleton?: string;
    };
    pointerEvents?: boolean;
    desc_no?: string;
    minWidth?: string;
    minHeight?: string;
    type?: TypeProps;
    onExitComplete?: () => void;
    delay?: number; // 추가된 delay 옵션 (초 단위)
}

// motion.* tag 사용 시 img onLoad 등의 네이티브 이벤트가 제대로 전달되지 않는 이슈 대응
const SkeletonBase = <T extends ElementType = "div">({
    children,
    target,
    error,
    type,
    ref,
    className,

    onError,
    onExitComplete,

    as,
    delay,
    pointerEvents = true,
    ...rest
}: SkeletonProps<T>) => {
    const Tag = as || "div";
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // 실제 Skeleton이 보여지는지 여부를 관리
    const [delayedTarget, setDelayedTarget] = useState<boolean>(() => {
        if (delay && target) {
            return false;
        }
        return target;
    });

    const getTypeOfStyle = (type: TypeProps) => {
        switch (type) {
            case "container":
                return "rounded-[1.6rem]";
            case "text":
                return "rounded-[0.4rem]";
            default:
                break;
        }
    };

    useEffect(() => {
        if (!delay) {
            setDelayedTarget(target);
            return;
        }
        if (target) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                setDelayedTarget(true);
            }, delay * 1000);
        } else {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            setDelayedTarget(false);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [target, delay]);

    return (
        <AnimatePresence
            onExitComplete={onExitComplete}
            mode="popLayout"
        >
            {!error && delayedTarget ? (
                <Tag
                    key="content"
                    {...(rest as any)}
                    ref={ref}
                    className={`${className?.element ?? ""}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    {children}
                </Tag>
            ) : null}

            {!error && !delayedTarget ? (
                <Tag
                    key="skeleton"
                    aria-label="hidden"
                    {...(rest as any)}
                    ref={ref}
                    className={`${className?.skeleton ? className?.skeleton : "h-[1.4rem] min-w-[1.4rem]"} ${type ? getTypeOfStyle(type) : ""} bg-[var(--color-gray-200)] rounded-[0.4rem] animation glowing-dark overflow-hidden pointer-events-none relative`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                />
            ) : null}
        </AnimatePresence>
    );
};

// Skeleton.Image: content/skeleton 교체를 AnimatePresence로 하되, skeleton일 때는 motion.div, 실컨텐츠는 img(native, onLoad 전달)
type SkeletonImageProps = {
    target: boolean;
    error?: boolean;
    src: string;
    alt?: string;
    className?:
        | {
              common?: string;
              element?: string;
              skeleton?: string;
          }
        | string; // string 용도 지원
    style?: React.CSSProperties;
    onLoad?: React.ReactEventHandler<HTMLImageElement>;
    onError?: React.ReactEventHandler<HTMLImageElement>;
    type?: TypeProps;
    delay?: number;
    onExitComplete?: () => void;
    [key: string]: any; // 이미지 기타 네이티브 props
};
/**
 * <Skeleton.Image
 *   src=""
 *   alt=""
 *   target={로딩플래그}
 *   onLoad={fn}
 *   ...
 * />
 */
function SkeletonImage({ target, error, src, alt, className, style, onLoad, onError, type, delay, onExitComplete, ...rest }: SkeletonImageProps) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [delayedTarget, setDelayedTarget] = useState<boolean>(() => {
        if (delay && target) {
            return false;
        }
        return target;
    });

    // className prop string/object 변환
    const extractClassName = (source: string | { element?: string; skeleton?: string }) => {
        if (!source) return "";
        if (typeof source === "string") return source;
        if (typeof source === "object") return source.element ?? "";
        return "";
    };
    const extractSkeletonClassName = (source: string | { element?: string; skeleton?: string }) => {
        if (!source) return "";
        if (typeof source === "string") return source;
        if (typeof source === "object") return source.skeleton ?? "";
        return "";
    };
    const getTypeOfStyle = (type: TypeProps) => {
        switch (type) {
            case "container":
                return "rounded-[1.6rem]";
            case "text":
                return "rounded-[0.4rem]";
            default:
                break;
        }
    };

    useEffect(() => {
        if (!delay) {
            setDelayedTarget(target);
            return;
        }
        if (target) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                setDelayedTarget(true);
            }, delay * 1000);
        } else {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            setDelayedTarget(false);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [target, delay]);

    return (
        <AnimatePresence
            onExitComplete={onExitComplete}
            mode="popLayout"
        >
            <img
                key="content"
                src={src}
                alt={alt}
                onLoad={onLoad}
                onError={onError}
                style={style}
                className={extractClassName(className ?? {})}
                {...rest}
            />
            {/* { !error && delayedTarget ? (
            ) : null } */}
            {!error && !delayedTarget ? (
                <motion.div
                    key="skeleton"
                    aria-label="hidden"
                    className={`${extractSkeletonClassName(className ?? {}) || "h-full w-full"} ${type ? getTypeOfStyle(type) : ""} absolute top-0 bg-[var(--color-gray-200)] animation glowing-dark overflow-hidden pointer-events-none`}
                    // className={`${ extractSkeletonClassName(className ?? {}) || "h-[1.4rem] min-w-[1.4rem]" } ${ type ? getTypeOfStyle(type) : "" } absolute top-0 bg-[var(--color-gray-200)] animation glowing-dark overflow-hidden pointer-events-none`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                />
            ) : null}
        </AnimatePresence>
    );
}

const convertSkeletonComponent = <Tag extends keyof typeof tagMap>(tag: Tag) => {
    return function SkeletonComponent(props: Omit<SkeletonProps<Tag>, "as"> & { motion?: boolean }) {
        const { motion: useMotion = true, ...rest } = props as any; // 기본값 true, 기본적으로 motion.태그를 사용, motion=false 명시시 일반 태그
        const Comp = useMotion ? motionTagMap[tag] : tagMap[tag];

        return (
            <SkeletonBase
                {...rest}
                as={Comp}
            />
        );
    };
};

const Skeleton = Object.assign(SkeletonBase, {
    Article: convertSkeletonComponent("article"),
    Section: convertSkeletonComponent("section"),
    Header: convertSkeletonComponent("header"),
    Footer: convertSkeletonComponent("footer"),
    Main: convertSkeletonComponent("main"),
    Aside: convertSkeletonComponent("aside"),
    Nav: convertSkeletonComponent("nav"),
    Ul: convertSkeletonComponent("ul"),
    Li: convertSkeletonComponent("li"),
    Span: convertSkeletonComponent("span"),
    Div: convertSkeletonComponent("div"),
    P: convertSkeletonComponent("p"),
    H1: convertSkeletonComponent("h1"),
    H2: convertSkeletonComponent("h2"),
    H3: convertSkeletonComponent("h3"),
    H4: convertSkeletonComponent("h4"),
    H5: convertSkeletonComponent("h5"),
    H6: convertSkeletonComponent("h6"),
    Image: SkeletonImage, // <-- 추가
});

export default Skeleton;
