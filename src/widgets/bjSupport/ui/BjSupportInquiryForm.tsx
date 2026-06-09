"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useCreateInquiryMutation } from "@/entities/inquiry/api/inquiry.query";
import { buildInquiryMessageBody } from "@/entities/inquiry/lib/buildMessageBody";
import { BJ_SUPPORT_REFERRAL_OPTIONS, BJ_SUPPORT_REFERRAL_OTHER, type BjSupportReferralSource } from "@/entities/inquiry/lib/bjSupportReferral";
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
import { showErrorToast } from "@/shared/lib/toast";
import UI from "@/shared/ui/UIComponent";
import { FormField, OptionButton, SelectInput, TextArea, TextInput } from "@/widgets/home/modal/inquiryModal/InquiryModalFields";
import type { FieldErrors, Gender } from "@/widgets/home/modal/inquiryModal/types";
import { validateInquiryFields } from "@/widgets/home/modal/inquiryModal/validateInquiryFields";

const PLAIN_MESSAGE = "BJ 지원 문의";

type BjSupportInquiryFormProps = {
    source: "home_modal" | "bj_support";
    buttonLabel?: string;
    animated?: boolean;
};

export function BjSupportInquiryForm({ source, buttonLabel = "문의하기", animated = false }: BjSupportInquiryFormProps) {
    const router = useRouter();
    const createInquiry = useCreateInquiryMutation();
    const [gender, setGender] = useState<Gender>("female");
    const [referralSource, setReferralSource] = useState<BjSupportReferralSource | "">("");
    const [referralDetail, setReferralDetail] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [contactPeriod, setContactPeriod] = useState("");
    const [contactHour, setContactHour] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [statusMessage, setStatusMessage] = useState("");
    const cityOptions = province ? REGION_OPTIONS[province as keyof typeof REGION_OPTIONS] : [];
    const showReferralDetail = referralSource === BJ_SUPPORT_REFERRAL_OTHER;

    const resetForm = (form: HTMLFormElement) => {
        form.reset();
        setGender("female");
        setReferralSource("");
        setReferralDetail("");
        setAgreed(false);
        setProvince("");
        setCity("");
        setDetailAddress("");
        setContactPeriod("");
        setContactHour("");
        setFieldErrors({});
        setStatusMessage("");
    };

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
            referralSource,
            referralDetail,
            agreed,
        });

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setStatusMessage("");
            showErrorToast(Object.values(errors)[0] ?? "필수 입력값을 확인해주세요.", 2);
            return;
        }

        setFieldErrors({});

        try {
            setStatusMessage("문의를 저장하고 있습니다.");
            await createInquiry.mutateAsync({
                name,
                phone,
                category: "bj_support",
                message: PLAIN_MESSAGE,
                gender,
                age: age || null,
                region: region || null,
                available_time: availableTime || null,
                support_label: "BJ지원",
                source,
                message_body: buildInquiryMessageBody({
                    성별: gender === "male" ? "남" : "여",
                    이름: name,
                    나이: age,
                    지역: region,
                    전화번호: phone,
                    "연락 가능한 시각": availableTime,
                    유입경로: referralSource,
                    ...(showReferralDetail && referralDetail.trim() ? { "유입경로 상세": referralDetail.trim() } : {}),
                    문의사항: PLAIN_MESSAGE,
                }),
            });
            resetForm(form);
            router.push("/send/success");
        } catch {
            router.push("/send/failed");
        }
    };

    const fieldDelay = animated ? undefined : 0;

    return (
        <form
            className="grid w-full gap-[3.2rem] pb-[1.6rem]"
            onSubmit={handleSubmit}
            data-report-id={`BJ 지원 문의 폼 ${source}`}
            data-report-type="group"
        >
            <FormField
                label="성별"
                delay={fieldDelay ?? 2}
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
                delay={fieldDelay ?? 3}
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
                delay={fieldDelay ?? 4}
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
                delay={fieldDelay ?? 5}
            >
                <div className="grid gap-[0.8rem]">
                    <div className="grid grid-cols-2 gap-[0.8rem]">
                        <SelectInput
                            className="h-[5.2rem]"
                            hasError={Boolean(fieldErrors.region)}
                            options={[{ label: "광역시·도 선택", value: "" }, ...Object.keys(REGION_OPTIONS).map((option) => ({ label: option, value: option }))]}
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
                            options={[{ label: "시·군·구 선택", value: "" }, ...cityOptions.map((option) => ({ label: option, value: option }))]}
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
                delay={fieldDelay ?? 6}
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
                delay={fieldDelay ?? 7}
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
                label="유입 경로"
                error={fieldErrors.referralSource ?? fieldErrors.referralDetail}
                delay={fieldDelay ?? 8}
            >
                <div className="grid grid-cols-2 gap-[0.4rem]">
                    {BJ_SUPPORT_REFERRAL_OPTIONS.map((option) => (
                        <OptionButton
                            key={option}
                            selected={referralSource === option}
                            onClick={() => {
                                setReferralSource(option);
                                if (option !== BJ_SUPPORT_REFERRAL_OTHER) {
                                    setReferralDetail("");
                                }
                                if (fieldErrors.referralSource || fieldErrors.referralDetail) {
                                    setFieldErrors((prev) => ({ ...prev, referralSource: undefined, referralDetail: undefined }));
                                }
                            }}
                        >
                            {option}
                        </OptionButton>
                    ))}
                </div>
                {showReferralDetail ? (
                    <TextArea
                        className="mt-[0.8rem]"
                        placeholder="어떤 경로로 알게 되셨는지 적어주세요"
                        value={referralDetail}
                        hasError={Boolean(fieldErrors.referralDetail)}
                        onChange={(event) => {
                            setReferralDetail(event.currentTarget.value);
                            if (fieldErrors.referralDetail) {
                                setFieldErrors((prev) => ({ ...prev, referralDetail: undefined }));
                            }
                        }}
                    />
                ) : null}
            </FormField>

            <motion.section
                className="flex flex-col gap-[1.2rem]"
                initial={animated ? { opacity: 0, transform: "translateY(100px)" } : false}
                animate={animated ? { opacity: 1, transform: "translateY(0px)" } : undefined}
                exit={animated ? { opacity: 0, transform: "translateY(100px)" } : undefined}
                transition={
                    animated
                        ? {
                              delay: 0.05 * 10,
                              type: "spring",
                              mass: 0.1,
                              stiffness: 100,
                              damping: 10,
                          }
                        : undefined
                }
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
                    {createInquiry.isPending ? "저장 중..." : buttonLabel}
                </UI.Button>
            </motion.section>
        </form>
    );
}
