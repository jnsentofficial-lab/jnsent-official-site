import { cookies } from "next/headers";
import { AdminPagesView } from "@/views/admin/pages/AdminPagesView";
import Main from "@/widgets/layout/Main";

export default async function AdminPagesPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-pages"
            className={{ inner: "px-[2.0rem] max-w-[var(--size-pc)]", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <AdminPagesView />
        </Main>
    );
}
