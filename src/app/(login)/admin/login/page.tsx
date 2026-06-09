import { cookies } from "next/headers";
import { AdminLoginView } from "@/views/admin/login/AdminLoginView";
import Main from "@/widgets/layout/Main";
import { buildNoIndexMetadata } from "@/shared/lib/seo";

export const metadata = buildNoIndexMetadata("관리자 로그인");

export default async function AdminLoginPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-login"
            className={{ inner: "", container: "min-h-screen" }}
        >
            <AdminLoginView />
        </Main>
    );
}
