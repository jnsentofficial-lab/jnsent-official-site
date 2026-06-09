import { cookies } from "next/headers";
import { AdminInquiriesView } from "@/views/admin/inquiries/AdminInquiriesView";
import Main from "@/widgets/layout/Main";
import { buildNoIndexMetadata } from "@/shared/lib/seo";

export const metadata = buildNoIndexMetadata("관리자 문의 관리");

export default async function AdminInquiriesPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-inquiries"
            className={{ container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <AdminInquiriesView />
        </Main>
    );
}
