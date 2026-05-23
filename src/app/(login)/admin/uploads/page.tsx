import { cookies } from "next/headers";
import { AdminUploadsView } from "@/views/admin/uploads/AdminUploadsView";
import Main from "@/widgets/layout/Main";

export default async function AdminUploadsPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-uploads"
            className={{ inner: "px-[2.0rem] max-w-[var(--size-pc)]", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <AdminUploadsView />
        </Main>
    );
}
