import { cookies } from "next/headers";
import { PaymentHistoryView } from "@/views/payment/history/PaymentHistoryView";
import Main from "@/widgets/layout/Main";

export default async function PaymentHistoryPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="payment-history"
            className={{ inner: "px-[2.0rem] max-w-[var(--size-pc)]", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <PaymentHistoryView />
        </Main>
    );
}
