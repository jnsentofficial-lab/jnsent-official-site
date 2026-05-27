"use client"

import ReactDOM from "react-dom";
import { ReactNode, ElementType, ComponentPropsWithoutRef, Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Tailwind와 맞춘 breakpoint
type Breakpoint = "mobile" | "tablet" | "pc";
type PortalType = boolean | Breakpoint[];

// portal prop 확장: 
// - portal={true} 전체
// - portal={["mobile", "tablet"]}
// - portal={["pc"]}
// - portal={false} or undefined
type SkeletonProps<T extends ElementType> =  {
    as?: T;
    portal?: PortalType;
} & Omit<ComponentPropsWithoutRef<T>, keyof "as" | "portal">;

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
    h6: "h6"
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
    h6: motion.h6
};

// 브레이크포인트별 감지 훅
function useBreakpoint(): Breakpoint {
    // tailwind 기반
    // mobile: < 768px, tablet: 768 ~ 1280px, pc: >= 1280px
    // CSS 변수 기준: --breakpoint-mobile: 9.375rem(344px), --breakpoint-tablet: 48rem(768px), --breakpoint-pc: 90rem(1440px)
    // 모바일: < 768px, 태블릿: 768~1439px, PC: >=1440px
    const get = () => {
        if (typeof window === "undefined") return "pc";
        if (window.innerWidth < 768) return "mobile";
        if (window.innerWidth < 1440) return "tablet";
        return "pc";
    }
    const [breakpoint, setBreakpoint] = useState<Breakpoint>(get);

    useEffect(() => {
        function onResize() {
            setBreakpoint(get());
        }
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return breakpoint;
}

/**
 * <Portal.Section portal={["mobile"]} ...>이 두 번 생기는 이유는 다음과 같습니다.
 * 
 * - portal={["mobile"]}이면, 모바일 breakpoint에서 ReactDOM.createPortal로 document.body에 내용을 렌더링합니다.
 * - 동시에, 부모에서 (예: <section>내부에) <Portal.Section portal={["mobile"]}>로 마크업을 사용하면,
 *   데스크톱에서는 "원래 자리에" 그대로 나오고, 모바일에서는 portal로 복제되어 body에도 삽입됩니다.
 * - 하지만, 이 Portal 컴포넌트는 'Section'을 포함한 반환이 아래 두 케이스로 나누어짐:
 *   - 모바일 : ReactDOM.createPortal(...) && 부모 트리(원래 자리) 둘 다 각각 하나씩 존재 (중복 발생)
 *   - 데스크톱 : 부모 위치에만 하나 존재
 * 
 * 문제의 핵심은 "원래 트리"와 "portal로 body에 생긴 트리"가 모두 렌더되어 '2개'로 보이기 때문입니다.
 * 
 * 이를 방지하려면 "portal"이 true일 때 원래 자리에 아무것도 렌더하지 않도록 하고,
 * 아니면 원래 자리에만 렌더해야 합니다.
 * 
 * 기존 코드는 children을 원래 트리에 남기고, 동시에 portal 시에도 렌더합니다.
 * 즉, 아래처럼 "Fragment + Portal" 둘 다 그려집니다.
 */

// 고침: 포탈이 필요한 경우(조건에 따라), 오직 하나의 렌더만 하도록 분기
const PortalBase = <T extends ElementType = "div">({
    portal = false,
    children,
    target,
    data,
    errorData,
    error,
    type,
    ref,
    length,
    className,
    payload,
    onError,
    onExitComplete,
    as,
    delay,
    ...rest
}: SkeletonProps<T>) => {
    const breakpoint = useBreakpoint();
    const canUseDOM = typeof window !== "undefined" && typeof document !== "undefined";

    // Helper to get correct Tag/component
    const Tag = as || "div";
    const classString = typeof className === "string" ? className : "";

    // portal이 boolean true/false인 경우
    if (typeof portal === "boolean") {
        if (!portal) {
            // portal 사용 안함: 원래 자리에만 렌더
            return as
                ? <Tag
                    key="content"
                    {...(rest as any)}
                    ref={ref}
                    className={classString}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >{children}</Tag>
                : <Fragment>{children}</Fragment>;
        }
        // portal true: 원래 트리에 아무것도 두지 않고 portal로만 렌더
        if (!canUseDOM) {
            return as ? <Tag {...(rest as any)} ref={ref} className={classString}>{children}</Tag> : <Fragment>{children}</Fragment>;
        }
        return ReactDOM.createPortal(
            as
                ? <Tag
                    key="content"
                    {...(rest as any)}
                    ref={ref}
                    className={classString}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >{children}</Tag>
                : <Fragment>{children}</Fragment>,
            document.body
        );
    }
    // portal이 배열(브레이크포인트)
    if (Array.isArray(portal)) {
        const shouldPortal = portal.includes(breakpoint);
        if (!shouldPortal) {
            // portal 해당 안함: 원래 트리에만 렌더
            return as
                ? <Tag
                    key="content"
                    {...(rest as any)}
                    ref={ref}
                    className={classString}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >{children}</Tag>
                : <Fragment>{children}</Fragment>;
        }
        // portal 해당할 때만 portal 렌더, 원래 자리에는 아무것도 안 보임
        if (!canUseDOM) {
            return as ? <Tag {...(rest as any)} ref={ref} className={classString}>{children}</Tag> : <Fragment>{children}</Fragment>;
        }
        return ReactDOM.createPortal(
            as
                ? <Tag
                    key="content"
                    {...(rest as any)}
                    ref={ref}
                    className={classString}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >{children}</Tag>
                : <Fragment>{children}</Fragment>,
            document.body
        );
    }
    // 그 외 (undefined, null 등)
    // portal prop 없는 경우: 원래 트리에만 렌더
    return as
        ? <Tag
            key="content"
            {...(rest as any)}
            ref={ref}
            className={classString}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >{children}</Tag>
        : <Fragment>{children}</Fragment>;
};

const convertSkeletonComponent = <Tag extends keyof typeof tagMap>(
    tag: Tag
) => {
    return function SkeletonComponent(
        props: Omit<SkeletonProps<Tag>, "as"> & { motion?: boolean }
    ) {
        const { motion: useMotion = true, ...rest } = props as any;
        const Comp = useMotion ? motionTagMap[tag] : tagMap[tag];
        // rest.className이 객체일 수 있음에 주의:
        const fixedRest = {
            ...rest,
            className: typeof rest.className === "string" ? rest.className : "",
        };
        return <PortalBase {...fixedRest} as={Comp} />;
    };
};

const Portal = Object.assign(PortalBase, {
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
});

export default Portal;
