"use client";

import { PaymentHistoryPageProvider } from "@/features/payment/history/model/SubscriptionContext";
import * as PaymentHistoryLayer from "@/widgets/payment/history/ui";

export default function Panel() {
    return (
        <PaymentHistoryPageProvider>
            <PaymentHistoryLayer.Title />
            <div className="grid gap-4">
                <PaymentHistoryLayer.Action />
                <PaymentHistoryLayer.Analysis />
            </div>
        </PaymentHistoryPageProvider>
    );
}
