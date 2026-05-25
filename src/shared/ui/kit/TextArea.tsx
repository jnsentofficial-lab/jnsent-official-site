type InputSize = "sm" | "md" | "lg" | "xlg";

interface InputProps {
    className?: string;
    name: string;
    placeholder: string;
    type?: string;
    size?: InputSize;
}

const sizeHeights: Record<InputSize, string> = {
    sm: "6rem",
    md: "12.8rem",
    lg: "24rem",
    xlg: "32rem",
};

const TextArea = ({ className = "", name, placeholder, type, size = "md" }: InputProps) => {
    const height = sizeHeights[size];

    return (
        <textarea
            className={`${className} rounded-[1.4rem] border border-[var(--adaptive-black100)] hover:border-[var(--adaptive-black500)] p-[1.6rem] transition-colors`}
            name={name}
            placeholder={placeholder}
            style={{ minHeight: height }}
        />
    );
};

export default TextArea;
