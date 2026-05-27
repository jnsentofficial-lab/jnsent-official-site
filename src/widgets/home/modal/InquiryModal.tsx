"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, type InputHTMLAttributes, type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useCreateInquiryMutation } from "@/entities/inquiry/api/inquiry.query";
import { buildInquiryMessageBody } from "@/entities/inquiry/lib/buildMessageBody";
import {
    buildAvailableTime,
    buildRegion,
    CONTACT_HOUR_OPTIONS,
    CONTACT_PERIOD_OPTIONS,
    formatPhoneNumber,
    REGION_OPTIONS,
    sanitizeAgeInput,
    sanitizeNameInput,
} from "@/entities/inquiry/lib/formFields";
import { HOME_INQUIRY_SUPPORT_FIELDS, SUPPORT_FIELD_CATEGORY_MAP, type HomeInquirySupportField } from "@/entities/inquiry/lib/supportFieldCategory";
import { showErrorToast } from "@/shared/lib/toast";
import UI from "@/shared/ui/UIComponent";

type Gender = "male" | "female";

type FieldErrors = {
    name?: string;
    age?: string;
    region?: string;
    phone?: string;
    availableTime?: string;
    agreed?: string;
};

interface InquiryModalProps {
    open: boolean;
    onClose: () => void;
}

function validateInquiryFields(values: { name: string; age: string; region: string; phone: string; availableTime: string; agreed: boolean }): FieldErrors {
    const errors: FieldErrors = {};

    if (!values.name) errors.name = "이름을 입력해 주세요.";
    if (!values.age) errors.age = "나이를 입력해 주세요.";
    if (!values.region) errors.region = "지역을 입력해 주세요.";
    if (!values.phone) errors.phone = "전화번호를 입력해 주세요.";
    if (!values.availableTime) errors.availableTime = "연락 가능한 시각을 입력해 주세요.";
    if (!values.agreed) errors.agreed = "개인정보 취급 방침에 동의해 주세요.";

    return errors;
}

const selectedOptionClass = "border-[#FF4B8B] text-[#FF4B8B] bg-white";
const unselectedOptionClass = "border-[#E5E5E5] text-[#999999] bg-white hover:border-[#d0d0d0]";

export function InquiryModal({ open, onClose }: InquiryModalProps) {
    const createInquiry = useCreateInquiryMutation();
    const [mounted, setMounted] = useState(false);
    const [gender, setGender] = useState<Gender>("female");
    const [supportField, setSupportField] = useState<HomeInquirySupportField>("BJ지원");
    const [agreed, setAgreed] = useState(false);
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [contactPeriod, setContactPeriod] = useState("");
    const [contactHour, setContactHour] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [statusMessage, setStatusMessage] = useState("");
    const cityOptions = province ? REGION_OPTIONS[province as keyof typeof REGION_OPTIONS] : [];

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (open) return;
        setFieldErrors({});
        setStatusMessage("");
        setProvince("");
        setCity("");
        setDetailAddress("");
        setContactPeriod("");
        setContactHour("");
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = sanitizeNameInput(String(formData.get("name") ?? "")).trim();
        const age = sanitizeAgeInput(String(formData.get("age") ?? "").trim());
        const region = buildRegion(province, city, detailAddress);
        const phone = formatPhoneNumber(String(formData.get("phone") ?? "").trim());
        const availableTime = buildAvailableTime(contactPeriod, contactHour);

        const errors = validateInquiryFields({
            name,
            age,
            region,
            phone,
            availableTime,
            agreed,
        });

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setStatusMessage("");
            showErrorToast(Object.values(errors)[0] ?? "필수 입력값을 확인해주세요.", 2);
            return;
        }

        setFieldErrors({});
        const plainMessage = `${supportField} 문의`;

        try {
            setStatusMessage("문의를 저장하고 있습니다.");
            await createInquiry.mutateAsync({
                name,
                phone,
                category: SUPPORT_FIELD_CATEGORY_MAP[supportField],
                message: plainMessage,
                gender,
                age: age || null,
                region: region || null,
                available_time: availableTime || null,
                support_label: supportField,
                source: "home_modal",
                message_body: buildInquiryMessageBody({
                    성별: gender === "male" ? "남" : "여",
                    이름: name,
                    나이: age,
                    지역: region,
                    전화번호: phone,
                    "연락 가능한 시각": availableTime,
                    지원분야: supportField,
                    문의사항: plainMessage,
                }),
            });
            form.reset();
            setGender("female");
            setSupportField("BJ지원");
            setAgreed(false);
            setProvince("");
            setCity("");
            setDetailAddress("");
            setContactPeriod("");
            setContactHour("");
            setStatusMessage("");
            onClose();
        } catch (error) {
            setStatusMessage(error instanceof Error ? error.message : "문의 저장에 실패했습니다.");
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open ? (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="inquiry-modal-title"
                    className="fixed inset-0 z-[200000] flex h-[100dvh] flex-col bg-[#ffffffe2] backdrop-blur-2xl overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="문의하기 닫기"
                        className="fixed top-[2rem] right-[2rem] z-[1] flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-black/5 text-[2.4rem] leading-none text-black/60 transition-colors hover:bg-black/10"
                    >
                        ×
                    </button>

                    <section className="mx-auto flex min-h-full w-full max-w-[var(--size-tablet)] flex-col items-center justify-start gap-[2.4rem] px-[1.6rem] pb-[3.2rem] pt-[8rem] pc:justify-center pc:px-0">
                        {/* <main className="mx-auto w-full max-w-[68rem] flex-1 px-[2rem] pb-[6rem] pt-[8rem]"> */}
                        <motion.header
                            className="flex flex-col mobile:gap-[0.8rem] pc:gap-[1.6rem] w-full"
                            initial={{ opacity: 0, transform: "translateY(100px)" }}
                            animate={{ opacity: 1, transform: "translateY(0px)" }}
                            exit={{ opacity: 0, transform: "translateY(100px)" }}
                            transition={{
                                delay: 0.1,
                                type: "spring",
                                mass: 0.1,
                                stiffness: 100,
                                damping: 10,
                            }}
                        >
                            <h2
                                id="inquiry-modal-title"
                                className="mobile:text-[2.0rem] pc:text-[3.2rem] font-[700] text-left text-black"
                            >
                                당신의 가능성을 현실로 만드세요
                            </h2>

                            <p className="mobile:text-[1.4rem] pc:text-[1.8rem] text-left font-medium text-[#888888]">성장을 위한 첫 상담을 지금 시작해보세요.</p>
                        </motion.header>

                        <form
                            className="grid gap-[3.2rem] w-full pb-[1.6rem]"
                            onSubmit={handleSubmit}
                            // initial={{ opacity: 0, transform: "translateY(100px)" }}
                            // animate={{ opacity: 1, transform: "translateY(0px)" }}
                            // exit={{ opacity: 0, transform: "translateY(100px)" }}
                            // transition={{
                            //     delay: 0.2,
                            //     type: "spring",
                            //     mass: 0.1,
                            //     stiffness: 100,
                            //     damping: 10,
                            // }}
                        >
                            <FormField
                                label="성별"
                                delay={2}
                            >
                                <div className="grid grid-cols-2 gap-[1.2rem]">
                                    <OptionButton
                                        selected={gender === "male"}
                                        onClick={() => setGender("male")}
                                    >
                                        남
                                    </OptionButton>
                                    <OptionButton
                                        selected={gender === "female"}
                                        onClick={() => setGender("female")}
                                    >
                                        여
                                    </OptionButton>
                                </div>
                            </FormField>

                            <FormField
                                label="이름"
                                error={fieldErrors.name}
                                delay={3}
                            >
                                <TextInput
                                    placeholder="이름을 적어주세요"
                                    name="name"
                                    maxLength={20}
                                    hasError={Boolean(fieldErrors.name)}
                                    onChange={(event) => {
                                        event.currentTarget.value = sanitizeNameInput(event.currentTarget.value);
                                        if (fieldErrors.name) {
                                            setFieldErrors((prev) => ({ ...prev, name: undefined }));
                                        }
                                    }}
                                />
                            </FormField>

                            <FormField
                                label="나이"
                                error={fieldErrors.age}
                                delay={4}
                            >
                                <TextInput
                                    placeholder="나이를 적어주세요"
                                    name="age"
                                    inputMode="numeric"
                                    maxLength={3}
                                    hasError={Boolean(fieldErrors.age)}
                                    onChange={(event) => {
                                        event.currentTarget.value = sanitizeAgeInput(event.currentTarget.value);
                                        if (fieldErrors.age) {
                                            setFieldErrors((prev) => ({ ...prev, age: undefined }));
                                        }
                                    }}
                                />
                            </FormField>

                            <FormField
                                label="지역"
                                error={fieldErrors.region}
                                delay={5}
                            >
                                <div className="grid gap-[0.8rem]">
                                    <div className="grid grid-cols-2 gap-[0.8rem]">
                                        <SelectInput
                                            className="h-[5.2rem]"
                                            hasError={Boolean(fieldErrors.region)}
                                            options={[{ label: "~도 선택", value: "" }, ...Object.keys(REGION_OPTIONS).map((option) => ({ label: option, value: option }))]}
                                            value={province}
                                            onChange={(event) => {
                                                setProvince(event.target.value);
                                                setCity("");
                                                if (fieldErrors.region) {
                                                    setFieldErrors((prev) => ({ ...prev, region: undefined }));
                                                }
                                            }}
                                        />
                                        <SelectInput
                                            className="h-[5.2rem]"
                                            disabled={!province}
                                            hasError={Boolean(fieldErrors.region)}
                                            options={[{ label: "~시 선택", value: "" }, ...cityOptions.map((option) => ({ label: option, value: option }))]}
                                            value={city}
                                            onChange={(event) => {
                                                setCity(event.target.value);
                                                if (fieldErrors.region) {
                                                    setFieldErrors((prev) => ({ ...prev, region: undefined }));
                                                }
                                            }}
                                        />
                                    </div>
                                    <TextInput
                                        placeholder="상세 주소를 적어주세요"
                                        name="detailAddress"
                                        value={detailAddress}
                                        hasError={Boolean(fieldErrors.region)}
                                        onChange={(event) => {
                                            setDetailAddress(event.currentTarget.value);
                                            if (fieldErrors.region) {
                                                setFieldErrors((prev) => ({ ...prev, region: undefined }));
                                            }
                                        }}
                                    />
                                </div>
                            </FormField>

                            <FormField
                                label="전화번호"
                                error={fieldErrors.phone}
                                delay={6}
                            >
                                <TextInput
                                    placeholder="전화번호를 적어주세요"
                                    name="phone"
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={13}
                                    hasError={Boolean(fieldErrors.phone)}
                                    onChange={(event) => {
                                        event.currentTarget.value = formatPhoneNumber(event.currentTarget.value);
                                        if (fieldErrors.phone) {
                                            setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                                        }
                                    }}
                                />
                            </FormField>

                            <FormField
                                label="연락 가능한 시각"
                                error={fieldErrors.availableTime}
                                delay={7}
                            >
                                <div className="grid grid-cols-2 gap-[0.8rem]">
                                    <SelectInput
                                        className="h-[5.2rem]"
                                        hasError={Boolean(fieldErrors.availableTime)}
                                        options={[{ label: "오전/오후 선택", value: "" }, ...CONTACT_PERIOD_OPTIONS.map((option) => ({ label: option, value: option }))]}
                                        value={contactPeriod}
                                        onChange={(event) => {
                                            setContactPeriod(event.target.value);
                                            if (fieldErrors.availableTime) {
                                                setFieldErrors((prev) => ({ ...prev, availableTime: undefined }));
                                            }
                                        }}
                                    />
                                    <SelectInput
                                        className="h-[5.2rem]"
                                        hasError={Boolean(fieldErrors.availableTime)}
                                        options={[{ label: "시간 선택", value: "" }, ...CONTACT_HOUR_OPTIONS.map((option) => ({ label: option, value: option }))]}
                                        value={contactHour}
                                        onChange={(event) => {
                                            setContactHour(event.target.value);
                                            if (fieldErrors.availableTime) {
                                                setFieldErrors((prev) => ({ ...prev, availableTime: undefined }));
                                            }
                                        }}
                                    />
                                </div>
                            </FormField>

                            <FormField
                                label="지원분야"
                                delay={8}
                            >
                                <div className="grid grid-cols-2 gap-[0.4rem]">
                                    {HOME_INQUIRY_SUPPORT_FIELDS.map((field) => (
                                        <OptionButton
                                            key={field}
                                            selected={supportField === field}
                                            onClick={() => setSupportField(field)}
                                            className={field === "엔터 창업" ? "col-span-2 max-w-[calc(50%-0.6rem)]" : ""}
                                        >
                                            {field}
                                        </OptionButton>
                                    ))}
                                </div>
                            </FormField>

                            <motion.section
                                className="flex flex-col gap-[1.2rem]"
                                initial={{ opacity: 0, transform: "translateY(100px)" }}
                                animate={{ opacity: 1, transform: "translateY(0px)" }}
                                exit={{ opacity: 0, transform: "translateY(100px)" }}
                                transition={{
                                    delay: 0.05 * 10,
                                    type: "spring",
                                    mass: 0.1,
                                    stiffness: 100,
                                    damping: 10,
                                }}
                            >
                                <div className="flex flex-col gap-[0.8rem]">
                                    <label className="flex cursor-pointer items-center gap-[1.2rem]">
                                        <input
                                            type="checkbox"
                                            checked={agreed}
                                            onChange={(event) => {
                                                setAgreed(event.target.checked);
                                                if (fieldErrors.agreed) {
                                                    setFieldErrors((prev) => ({ ...prev, agreed: undefined }));
                                                }
                                            }}
                                            className="peer sr-only"
                                        />
                                        <span
                                            className={`flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full border transition-colors ${
                                                agreed ? "border-[#FF4B8B] bg-[#FF4B8B]" : "border-[#CCCCCC] bg-white"
                                            }`}
                                        >
                                            {agreed ? (
                                                <svg
                                                    width="10"
                                                    height="8"
                                                    viewBox="0 0 10 8"
                                                    fill="none"
                                                    aria-hidden
                                                >
                                                    <path
                                                        d="M1 4L3.5 6.5L9 1"
                                                        stroke="white"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            ) : null}
                                        </span>
                                        <span className="text-[1.6rem] font-medium text-[#666666]">개인정보 취급 방침에 동의합니다.</span>
                                    </label>
                                    {fieldErrors.agreed ? (
                                        <p
                                            className="m-0 text-[1.4rem] font-medium text-[#FF4B8B]"
                                            role="alert"
                                        >
                                            {fieldErrors.agreed}
                                        </p>
                                    ) : null}
                                </div>

                                {statusMessage ? (
                                    <p
                                        className="m-0 text-center text-[1.4rem] font-semibold text-[#666666]"
                                        role="status"
                                    >
                                        {statusMessage}
                                    </p>
                                ) : null}

                                <UI.Button
                                    type="submit"
                                    disabled={createInquiry.isPending}
                                    className="h-[5.6rem] w-full rounded-[1.6rem] bg-black text-[1.8rem] font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {createInquiry.isPending ? "저장 중..." : "문의하기"}
                                </UI.Button>
                            </motion.section>
                        </form>
                    </section>

                    {/* <InquiryModalFooter /> */}
                </motion.div>
            ) : null}
        </AnimatePresence>,
        document.body,
    );
}

function FormField({ label, children, delay = 1, error }: { label: string; children: ReactNode; delay: number; error?: string }) {
    return (
        <motion.div
            className="flex flex-col gap-[0.8rem]"
            initial={{ opacity: 0, transform: "translateY(100px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(100px)" }}
            transition={{
                delay: 0.05 * delay,
                type: "spring",
                mass: 0.1,
                stiffness: 100,
                damping: 10,
            }}
        >
            <label className="text-[1.6rem] font-bold text-black font-[NanumSquare]">{label}</label>
            {children}
            {error ? (
                <p
                    className="m-0 -mt-[0.4rem] text-[1.4rem] font-medium text-[#FF4B8B]"
                    role="alert"
                >
                    {error}
                </p>
            ) : null}
        </motion.div>
    );
}

function TextInput({ className = "", hasError = false, ...props }: InputHTMLAttributes<HTMLInputElement> & { className?: string; hasError?: boolean }) {
    return (
        <input
            {...props}
            className={`h-[5.2rem] w-full rounded-[1.6rem] border bg-white px-[1.6rem] text-[1.6rem] font-medium text-black outline-none transition-colors placeholder:text-[#BBBBBB] focus:border-[#FF4B8B] ${
                hasError ? "border-[#FF4B8B]" : "border-[#E5E5E5]"
            } ${className}`}
        />
    );
}

function SelectInput({ className = "", hasError = false, options, ...props }: React.ComponentProps<typeof UI.Select> & { hasError?: boolean }) {
    return (
        <UI.Select
            {...props}
            className={`rounded-[1.6rem] border bg-white px-[1.6rem] text-[1.6rem] font-medium text-black outline-none transition-colors disabled:bg-[#f7f7f7] ${
                hasError ? "border-[#FF4B8B]" : "border-[#E5E5E5]"
            } ${className}`}
            options={options}
            size="md"
        />
    );
}

function OptionButton({ children, selected, onClick, className = "" }: { children: ReactNode; selected: boolean; onClick: () => void; className?: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`h-[5.2rem] rounded-[1.6rem] border text-[1.6rem] font-bold transition-colors ${selected ? selectedOptionClass : unselectedOptionClass} ${className}`}
        >
            {children}
        </button>
    );
}

function InquiryModalFooter() {
    return (
        <footer className="bg-black py-[4.8rem] text-white">
            <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-2 gap-[4rem] max-[86rem]:grid-cols-1">
                <div className="flex items-start gap-[1.6rem]">
                    <img
                        src="/images/common/ico-logo.svg"
                        alt=""
                        className="h-[4.8rem] w-[4.8rem] brightness-0 invert"
                    />
                    <div>
                        <p className="text-[2rem] font-[700] leading-[1.5]">JNS ENTERTAINMENT</p>
                        <p className="mt-[0.4rem] text-[1.6rem] font-bold text-white/45">제이엔에스엔터테인먼트</p>
                    </div>
                </div>
                <address className="not-italic text-[1.4rem] font-semibold leading-[1.5] text-white/55">
                    <strong className="text-white/35">INFORMATION</strong>
                    <br />
                    제이엔에스 엔터테인먼트 | 대표 우인식 | 사업자등록번호 -
                    <br />
                    <br />
                    <strong className="text-white/35">CONTACT</strong>
                    <br />
                    02-6949-0286
                    <br />
                    <br />
                    <strong className="text-white/35">ADDRESS</strong>
                    <br />
                    서울특별시 강남구 강남대로 100길 30
                    <br />
                    <br />
                    Copyright 제이엔에스. All rights reserved.
                </address>
            </div>
        </footer>
    );
}
