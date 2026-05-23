import { useEffect, useRef } from "react";

interface TextShimmerProps {
    children: string;
    as?: React.ElementType;
    className?: string;
    duration?: number;
    style?: React.CSSProperties;
    color?: {
        start: string;
        end: string;
    };
}

export const Shimmer = ({
    children,
    as: Component = "span",
    className = "",
    style = {},
    color = {
        start: "var(--color-brand-500)",
        end: "rgba(0,0,0,1)",
    },
    duration = 2,
}: TextShimmerProps) => {
    const uniqueIdRef = useRef<string>("text-shimmer-" + Math.random().toString(36).substring(2, 10));

    useEffect(() => {
        const shimmerName = uniqueIdRef.current;
        const prev = document.getElementById(shimmerName);
        if (prev) prev.remove();

        const keyframes = `
      @keyframes ${shimmerName} {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `;

        const styleTag = document.createElement("style");
        styleTag.id = shimmerName;
        styleTag.innerHTML = keyframes;
        document.head.appendChild(styleTag);

        return () => {
            styleTag.remove();
        };
    }, [color.start, color.end, duration]);

    return (
        <Component
            ref={null}
            className={`inline-block relative text-transparent bg-clip-text [background-size:400%_100%] ${className}`}
            style={{
                ...style,
                backgroundImage: `linear-gradient(90deg, ${color.start} 0%, ${color.end} 50%, ${color.start} 100%)`,
                backgroundSize: "400% 100%",
                backgroundRepeat: "repeat",
                backgroundPosition: "0% 0%",
                animation: `${uniqueIdRef.current} ${duration}s linear infinite`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}
        >
            {children}
        </Component>
    );
};
