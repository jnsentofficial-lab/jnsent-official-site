import { cookies } from "next/headers";
import { AdminInquiriesView } from "@/views/admin/inquiries/AdminInquiriesView";
import Main from "@/widgets/layout/Main";

export default async function AdminInquiriesPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-inquiries"
            className={{ inner: "px-[2.0rem] max-w-[var(--size-pc)]", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <AdminInquiriesView />
        </Main>
    );
}
