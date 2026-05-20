import { cookies } from "next/headers";
import { SalesDetailsView } from "@/views/sales/details/SalesDetailsView";
import Main from "@/widgets/layout/Main";

export default async function SalesDetailsPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="sales-details"
            className={{ inner: "px-[2.0rem] max-w-[var(--size-pc)]", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <SalesDetailsView />
        </Main>
    );
}
