import { cookies } from "next/headers";
import { AdminNewsView } from "@/views/admin/news/AdminNewsView";
import Main from "@/widgets/layout/Main";

export default async function AdminNewsPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-news"
            className={{ inner: "px-[2.0rem] max-w-[var(--size-pc)]", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <AdminNewsView />
        </Main>
    );
}
