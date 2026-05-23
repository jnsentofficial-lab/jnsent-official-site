"use client";

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

type TestPageProviderValue = {
    cycle: number;
    isLoading: boolean;
    restartDemo: () => void;
    routeName: string;
};

const TestPageContext = createContext<TestPageProviderValue | null>(null);

export function TestPageProvider({ children }: { children: ReactNode }) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [cycle, setCycle] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setIsLoading(false);
        }, 7000);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [cycle]);

    function restartDemo() {
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsLoading(true);
        setCycle((current) => current + 1);
    }

    return <TestPageContext.Provider value={{ cycle, isLoading, restartDemo, routeName: "test" }}>{children}</TestPageContext.Provider>;
}

export function useTestProvider() {
    const context = useContext(TestPageContext);
    if (!context) throw new Error("useTestProvider must be used within TestPageProvider");
    return context;
}
