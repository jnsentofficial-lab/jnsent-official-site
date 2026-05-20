"use client";

import { ReactNode } from "react";

type PlanProviderProps = {
    children: ReactNode;
};

export function PlanProvider({ children }: PlanProviderProps) {
    return children;
}
