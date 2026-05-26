"use client";

import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import UI from "../UIComponent";

// import UI from "@/features/shell/ui/UIComponent";
// import Icon from "@/shared/ui/Icon";

interface BottomSheetProps {
    title?: string;
    description?: string;
    open?: boolean;
    onClose?: () => void;
    onInit?: () => void;
    children?: ReactNode;
    className?: string;
    closeBtn?: boolean;
    placement?: {
        col: number;
        row: number;
    };
    actions?: {
        title: string;
        type?: "action" | "close";
        onClick?: () => void;
        disabled?: boolean;
        loading?: boolean;
        ariaLabel?: string;
        icon?: string;
        className?: string;
    }[];
}

const Modal = ({ title, description, open, onClose, children, className, actions: actions = [], onInit, placement }: BottomSheetProps) => {
    const [isClient, setIsClient] = useState(false);
    const [isMobileViewport, setIsMobileViewport] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // 함수 : 키 별 세팅
    const preventEnterKey = useCallback((event: KeyboardEvent) => {
        switch (event.key) {
            case "Escape":
                return onClose?.();

            case "Enter":
                return event.preventDefault();

            default:
                break;
        }
    }, [onClose]);

    useEffect(() => {
        if (open) {
            onInit?.();
            window.addEventListener("keydown", preventEnterKey);
        }

        return () => {
            window.removeEventListener("keydown", preventEnterKey);
        };
    }, [onInit, open, preventEnterKey]);

    useEffect(() => {
        // 브라우저 환경에서만 document 존재
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) {
            return;
        }

        const syncViewport = () => setIsMobileViewport(window.innerWidth < 860);
        syncViewport();
        window.addEventListener("resize", syncViewport);

        return () => {
            window.removeEventListener("resize", syncViewport);
        };
    }, [isClient]);

    if (!isClient) return null; // SSR 단계에서는 아무것도 렌더링하지 않음

    const modalClassName = `${className ? className : "max-w-[calc(var(--modal-width)-(1.6rem*4))]"} max-h-[calc(100dvh-(1.6rem*2))] z-[100000000] w-full bg-[var(--color-gray-100)] rounded-[3.2rem] flex flex-col shadow-[0_0_20rem_10rem_#00000060] overflow-hidden`;

    return (
        <Fragment>
            {ReactDOM.createPortal(
                <AnimatePresence>
                    {open && (
                        <Fragment>
                            {/* Dimmed */}
                            <motion.div
                                className="fixed inset-0 z-[100000000] bg-[#000000a3] backdrop-blur-[0.5rem]"
                                onClick={onClose}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            {/* BottomSheet */}
                            {placement ? (
                                <div className="fixed inset-0 z-[100000000] grid pointer-events-none mobile:grid-cols-1 mobile:grid-rows-1 pc:grid-cols-3 pc:grid-rows-3 p-[1.6rem]">
                                    <motion.section
                                        ref={containerRef}
                                        role="dialog"
                                        className={`${modalClassName} pointer-events-auto self-center`}
                                        style={isMobileViewport ? undefined : { gridColumn: placement.col, gridRow: placement.row }}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            delay: 0,
                                            type: "spring",
                                            mass: 0.1,
                                            stiffness: 200,
                                            damping: 10,
                                        }}
                                    >
                                        {/* Header */}
                                        <section className="flex items-start justify-between p-[1.6rem_2.4rem]">
                                            <section className="flex flex-col gap-[1.2rem] w-full">
                                                <section className="grid grid-cols-[1fr_2.4rem] gap-[0.8rem]">
                                                    <div className="flex items-start gap-[0.4rem]">
                                                        <h2 className="text-[1.8rem] font-bold text-[var(--color-gray-900)] leading-[1.5]">{title}</h2>
                                                    </div>

                                                    {onClose ? (
                                                        <UI.Button
                                                            onClick={onClose}
                                                            className="text-[2.0rem] w-[2.4rem] h-[2.4rem] bg-[var(--color-gray-300)] flex items-center justify-center rounded-full"
                                                            ariaLabel="모달 닫기"
                                                        >
                                                            <p>닫기</p>
                                                        </UI.Button>
                                                    ) : null}
                                                </section>

                                                <p className="text-[1.6rem] font-bold text-[var(--color-gray-600)] leading-[1.5] whitespace-break-spaces">{description}</p>
                                            </section>
                                        </section>

                                        {/* Body */}
                                        {children ? <section className="flex flex-col overflow-y-auto bg-white mx-[0.8rem] rounded-[2.4rem]">{children}</section> : ""}

                                        {/* Footer */}
                                        {actions.length > 0 && (
                                            <section className="flex flex-wrap justify-end gap-[1.0rem] p-[1.6rem_2.4rem]">
                                                {actions.map((action, i) => (
                                                    <UI.Button
                                                        key={i}
                                                        disabled={action.disabled}
                                                        aria-label={action.ariaLabel ? action.ariaLabel : action.title}
                                                        className={`h-[var(--button-height-sm)] whitespace-nowrap px-[2.0rem] rounded-[var(--button-radius-sm)] transition-colors
                                                    ${action.disabled ? "opacity-50 text-white" : ""}
                                                    ${action.className ? action.className : "bg-[var(--color-gray-700)] hover:bg-[var(--color-gray-700)] text-white"}
                                                `}
                                                        onClick={async () => {
                                                            if (action.type === "close") return onClose?.();

                                                            const result = await action?.onClick?.();
                                                            const IS_PASSED = result === undefined || result;

                                                            if (IS_PASSED) onClose?.();
                                                        }}
                                                    >
                                                        {action.loading ? "처리중..." : action.title}
                                                    </UI.Button>
                                                ))}
                                            </section>
                                        )}
                                    </motion.section>
                                </div>
                            ) : (
                                <motion.section
                                    ref={containerRef}
                                    role="dialog"
                                    className={`${modalClassName} fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{
                                        delay: 0,
                                        type: "spring",
                                        mass: 0.1,
                                        stiffness: 200,
                                        damping: 10,
                                    }}
                                >
                                    {/* Header */}
                                    <section className="flex items-start justify-between p-[1.6rem_2.4rem]">
                                        <section className="flex flex-col gap-[1.2rem] w-full">
                                            <section className="grid grid-cols-[1fr_2.4rem] gap-[0.8rem]">
                                                <div className="flex items-start gap-[0.4rem]">
                                                    <h2 className="text-[1.8rem] font-bold text-[var(--color-gray-900)] leading-[1.5]">{title}</h2>
                                                </div>

                                                {onClose ? (
                                                    <UI.Button
                                                        onClick={onClose}
                                                        className="text-[2.0rem] w-[2.4rem] h-[2.4rem] bg-[var(--color-gray-300)] flex items-center justify-center rounded-full"
                                                        ariaLabel="모달 닫기"
                                                    >
                                                        <p>닫기</p>
                                                    </UI.Button>
                                                ) : null}
                                            </section>

                                            <p className="text-[1.6rem] font-bold text-[var(--color-gray-600)] leading-[1.5] whitespace-break-spaces">{description}</p>
                                        </section>
                                    </section>

                                    {/* Body */}
                                    {children ? <section className="flex flex-col overflow-y-auto bg-white mx-[0.8rem] rounded-[2.4rem]">{children}</section> : ""}

                                    {/* Footer */}
                                    {actions.length > 0 && (
                                        <section className="flex flex-wrap justify-end gap-[1.0rem] p-[1.6rem_2.4rem]">
                                            {actions.map((action, i) => (
                                                <UI.Button
                                                    key={i}
                                                    disabled={action.disabled}
                                                    aria-label={action.ariaLabel ? action.ariaLabel : action.title}
                                                    className={`h-[var(--button-height-sm)] whitespace-nowrap px-[2.0rem] rounded-[var(--button-radius-sm)] transition-colors
                                                    ${action.disabled ? "opacity-50 text-white" : ""}
                                                    ${action.className ? action.className : "bg-[var(--color-gray-700)] hover:bg-[var(--color-gray-700)] text-white"}
                                                `}
                                                    onClick={async () => {
                                                        if (action.type === "close") return onClose?.();

                                                        const result = await action?.onClick?.();
                                                        const IS_PASSED = result === undefined || result;

                                                        if (IS_PASSED) onClose?.();
                                                    }}
                                                >
                                                    {action.loading ? "처리중..." : action.title}
                                                </UI.Button>
                                            ))}
                                        </section>
                                    )}
                                </motion.section>
                            )}
                        </Fragment>
                    )}
                </AnimatePresence>,
                document.body,
            )}
        </Fragment>
    );
};

export function ModalContainer({ children, className }: { children: ReactNode; className?: string }) {
    return <section className={className ? className : ""}>{children}</section>;
    // return <div className="flex flex-col gap-[2.0rem]">{children}</div>;
}

export function ModalRow({ children }: { children: ReactNode }) {
    // return <Fragment>{ children }</Fragment>;
    return <section className="flex items-center gap-[0.8rem]">{children}</section>;
}

export function ModalCol({ children }: { children: ReactNode }) {
    // return <Fragment>{ children }</Fragment>;
    return <section className="flex flex-col gap-[0.8rem]">{children}</section>;
}

export function ModalItem({ label, description, children, fill = false, className }: { label?: string; description?: string; children: ReactNode; fill?: boolean; className?: string }) {
    return (
        <section className={`${className ? className : ""} ${fill ? "w-full" : ""} flex flex-col gap-[0.8rem]`}>
            {label ? <h6 className="text-[1.4rem] font-semibold text-[var(--color-gray-600)]">{label}</h6> : ""}
            {description ? <p>{description}</p> : ""}
            <div className="flex flex-col gap-[0.4rem]">{children}</div>
        </section>
    );
}

Modal.Container = ModalContainer;
Modal.Item = ModalItem;
Modal.Row = ModalRow;
Modal.Col = ModalCol;

export default Modal;
