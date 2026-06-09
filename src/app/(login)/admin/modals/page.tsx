import { cookies } from "next/headers";
import { AdminModalsView } from "@/views/admin/modals/AdminModalsView";
import Main from "@/widgets/layout/Main";
import { buildNoIndexMetadata } from "@/shared/lib/seo";

export const metadata = buildNoIndexMetadata("관리자 팝업 관리");

export default async function AdminModalsPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="admin-modals"
            className={{ container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <AdminModalsView />
        </Main>
    );
}
