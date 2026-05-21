import { cookies } from "next/headers";
import { AdminAccountManagerView } from "@/views/admin/account/manager/AdminAccountManagerView";
import Main from "@/widgets/layout/Main";

export default async function AdminAccountsPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-accounts"
            className={{ inner: "", container: "min-h-screen" }}
        >
            <AdminAccountManagerView />
        </Main>
    );
}
