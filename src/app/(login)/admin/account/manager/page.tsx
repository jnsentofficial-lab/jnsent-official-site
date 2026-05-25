import { cookies } from "next/headers";
import { AdminAccountManagerView } from "@/views/admin/account/manager/AdminAccountManagerView";
import Main from "@/widgets/layout/Main";

export default async function AdminAccountManagerPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-account-manager"
            className={{ container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <AdminAccountManagerView />
        </Main>
    );
}
