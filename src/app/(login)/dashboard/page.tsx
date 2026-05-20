import { cookies } from "next/headers";
import { DashboardView } from "@/views/dashboard/DashboardView";
import Main from "@/widgets/layout/Main";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="dashboard"
            className={{ inner: "px-[2.0rem] max-w-[var(--size-pc)]", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <DashboardView />
        </Main>
    );
}
