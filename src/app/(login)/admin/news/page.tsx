import { cookies } from "next/headers";
import { AdminNewsView } from "@/views/admin/news/AdminNewsView";
import Main from "@/widgets/layout/Main";
import { buildNoIndexMetadata } from "@/shared/lib/seo";

export const metadata = buildNoIndexMetadata("관리자 뉴스 관리");

export default async function AdminNewsPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-news"
            className={{ container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <AdminNewsView />
        </Main>
    );
}
