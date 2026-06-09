export type Gender = "male" | "female";

export type FieldErrors = {
    name?: string;
    age?: string;
    region?: string;
    phone?: string;
    availableTime?: string;
    referralSource?: string;
    referralDetail?: string;
    agreed?: string;
};

export interface InquiryModalProps {
    open: boolean;
    onClose: () => void;
}
