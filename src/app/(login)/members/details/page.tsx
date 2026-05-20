import { cookies } from "next/headers";
import { MemberDetailsView } from "@/views/members/details/MemberDetailsView";
import Main from "@/widgets/layout/Main";

export default async function MemberDetailsPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="members-details"
            className={{ inner: "px-[2.0rem] max-w-[var(--size-pc)]", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <MemberDetailsView />
        </Main>
    );
}
