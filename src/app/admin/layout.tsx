import { ReactNode } from "react";
import { AdminAuthGuard } from "@/features/auth/AdminAuthGuard";

type AdminLayoutProps = {
    children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
}
