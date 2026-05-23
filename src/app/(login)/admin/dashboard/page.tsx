import { cookies } from "next/headers";
import { AdminDashboardView } from "@/views/admin/dashboard/AdminDashboardView";
import Main from "@/widgets/layout/Main";

export default async function AdminDashboardPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-dashboard"
            className={{ inner: "px-[2.0rem] max-w-[var(--size-pc)]", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <AdminDashboardView />
        </Main>
    );
}
