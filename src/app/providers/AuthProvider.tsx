"use client";

import { ReactNode, Suspense } from "react";
import { AdminAuthGuard } from "@/features/auth/AdminAuthGuard";

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    return <Suspense fallback={children}><AdminAuthGuard>{children}</AdminAuthGuard></Suspense>;
}
