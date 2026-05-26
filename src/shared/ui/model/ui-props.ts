import { ChangeEvent, CSSProperties, ReactNode, RefObject } from "react";

export interface CalendarModalProps {
    className?: string;
    icon?: boolean;
    defaultValue?: Date;
    desc_no?: string;
    // desc_no?: string | number;
    onClose?: (value: string) => void;
    onDateSelect?: (value: string) => void;
    limitMonths?: number; // 추가
    limitMessage?: string; // 추가
    center?: boolean;
    containerClassName?: string;
}

export interface MultiSelectProps {
    title: string;
    id: number;
    state: boolean;
    desc_no?: string;
}

export interface FileUploadProps {
    placeholder?: string;
    buttonText?: string;
    onChange?: (file: File) => void;
    desc_no?: string;
}

export interface TabComponentProps {
    className?: {
        container?: string;
        button?: string;
        active?: string;
        normal?: string;
    };
    list: {
        title?: string;
        value: number;
        route?: string;
        element?: ReactNode;
    }[];
    activeClassName?: string;
    activeType?: "underline" | "background";
    ariaLabel?: string;
    type?: "button" | "link";
    preventMsg?: string;
    preventTargetIdx?: number;
    defaultSelect?: number;
    onClick: (e: number) => void;
    desc_no?: string;
}

export interface LinkProps {
    children: ReactNode | string;
    className?: string;
    defaultValue?: any;
    type?: "button" | "reset" | "submit";
    disabled?: boolean;
    disabledMsg?: string;
    href: string;
    ref?: any;
    ariaLabel?: string;
    defaultHover?: boolean;
    desc_no?: string;
    rippleColor?: string;
    onClick?: (e: any) => void;
    onHoverStart?: (e: any) => void;
    onHoverEnd?: (e: any) => void;
    onPointerDown?: (e: any) => void;
}

export interface ButtonProps {
    children: ReactNode | string;
    className?: string;
    defaultValue?: any;
    type?: "button" | "reset" | "submit";
    disabled?: boolean;
    disabledMsg?: string;
    ref?: any;
    ariaLabel?: string;
    defaultHover?: boolean;
    desc_no?: string;
    rippleColor?: string;
    onClick?: (e: any) => void;
    onHoverStart?: (e: any) => void;
    onHoverEnd?: (e: any) => void;
    onPointerDown?: (e: any) => void;
}

export interface PaginationProps {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    desc_no?: string;
}

export interface MultiSelectProps {
    data: MultiSelectProps[];
    onChange: (e: MultiSelectProps[]) => void;
    desc_no?: string;
}

export interface DropDownProps {
    list: {
        title: string;
        value: number | string;
        isDefault?: boolean;
        className?: string;
        element?: ReactNode;
        ariaLabel?: string;
        hidden?: boolean;
        onClick?: () => void;
        disabled?: boolean;
        tooltip?: {
            type: "active" | "disabled";
            direction?: "left" | "right" | "top" | "bottom";
            msg: string;
        }[];
    }[];
    ariaLabel?: string;
    message?: string;
    prevent?: boolean;
    externalRef?: RefObject<HTMLElement | null>;
    className?: {
        container?: string;
        inner?: string;
        button?: string;
    };
    height?: string;
    width?: string;
    onClick?: (value: number | string) => void;
    children: ReactNode;
    desc_no?: string;
}

export interface SelectProps {
    list: {
        title: string;
        value: any;
    }[];
    trackingData?: any;
    defaultValue?: any;
    useInitialEffect?: boolean;
    // onConfirm: (e: any) => void;
    // onCancel: (e: any) => void;
    onChange: (e: any) => void;
    className?: {
        container?: string;
        button?: string;
    };
    ariaLabel?: string;
    desc_no?: string;
}

export interface FilterProps {
    list: {
        title: string;
        state: boolean;
        value?: any;
    }[];
    elementRef?: RefObject<HTMLElement | null>;
    style?: CSSProperties;
    defaultValue?: any;
    containerClassName?: string;
    onConfirm: (e: { title: string; state: boolean; value?: any }[]) => void;
    onCancel: (e: { title: string; state: boolean; value?: any }[]) => void;
    onChange: (e: { title: string; state: boolean; value?: any }[]) => void;
    className?: {
        container?: string;
        button?: string;
    };
    desc_no?: string;
}

export interface InputProps {
    defaultValue?: string | number;
    icon?: boolean;
    type?: string;
    placeholder?: string;
    guide?: string;
    // emptyValue?: string | number;
    className?: string;
    name?: string;
    disabled?: boolean;
    desc_no?: string;
    ariaLabel?: string;
    onEnter?: boolean;
    autoComplete?: "on" | "off";
    failed?: {
        state: boolean;
        msg: string;
    };
    onInput?: (e: any) => void;
    onChange: (e: any) => void;
    onBlur?: (e: any) => void;
}

export interface PasswordInputProps extends Pick<InputProps, "failed"> {
    disabled?: boolean;
    name?: string;
    desc_no?: string | number;
    defaultValue?: string;
    placeholder?: string;
    guide?: string;
    className?: {
        container?: string;
        input?: string;
        toggle?: string;
    };
    autoComplete?: "on" | "off";
    digit?: number; // 최대 입력 자리수
    showToggle?: boolean; // 비밀번호 보기 버튼
    onChange?: (e: { target: { value: string } }) => void;
    onInput?: (e: any) => void;
    onBlur?: (e: any) => void;
}

export interface SwitchProps {
    states: boolean;
    ariaLabel?: string;
    desc_no?: string;
    onChange: (e: boolean) => void;
}

export interface NumberInputProps extends Omit<InputProps, "type" | "className"> {
    defaultValue?: number;
    max?: number;
    type?: string;
    ariaLabel?: string;
    allowedChars?: string[]; // ["-","+","@"] 이런식으로 배열 전달
    comma?: boolean;
    className?: {
        container?: string;
        input?: string;
    };
    readOnly?: boolean;
}

export interface TextAreaProps {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    maxLength?: number;
    placeholder?: string;
    value?: string;
    className?: {
        container?: string;
        input?: string;
    };
    desc_no?: string;
    disabled?: boolean;
    ariaLabel?: string;
}

export interface RadioProps {
    list?: {
        value: any;
        title: string;
    }[];
    defaultValue: any;
    ariaLabel?: string;
    className?: {
        container: string;
        button: string;
    };
    onChange: (e: number) => void;
    desc_no?: string;
}

export interface CheckBoxProps {
    defaultState?: boolean;
    className?: {
        container?: string;
        button?: string;
    };
    disabled?: boolean;
    ariaLabel?: string;
    preventClick?: boolean;
    checked?: boolean;
    guide?: string;
    onChange: (e: any) => void;
    desc_no?: string;
}
