"use client";

import { ReactNode } from "react";
import { AdminAuthGuard } from "@/features/auth/AdminAuthGuard";

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
}
