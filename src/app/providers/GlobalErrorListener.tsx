"use client";

import { useEffect } from "react";

export function GlobalErrorListener() {
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            console.error(event.error ?? event.message);
        };

        window.addEventListener("error", handleError);

        return () => window.removeEventListener("error", handleError);
    }, []);

    return null;
}
