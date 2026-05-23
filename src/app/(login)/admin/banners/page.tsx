import { cookies } from "next/headers";
import { AdminBannersView } from "@/views/admin/banners/AdminBannersView";
import Main from "@/widgets/layout/Main";

export default async function AdminBannersPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-banners"
            className={{ inner: "px-[2.0rem] max-w-[var(--size-pc)]", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <AdminBannersView />
        </Main>
    );
}
