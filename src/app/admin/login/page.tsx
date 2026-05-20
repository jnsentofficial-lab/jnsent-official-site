import { cookies } from "next/headers";
import { AdminLoginView } from "@/views/admin/login/AdminLoginView";
import Main from "@/widgets/layout/Main";

export default async function AdminLoginPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-login"
            className={{ inner: "grid min-h-screen place-items-center bg-slate-100 px-4 py-8", container: "min-h-screen" }}
        >
            <AdminLoginView />
        </Main>
    );
}
