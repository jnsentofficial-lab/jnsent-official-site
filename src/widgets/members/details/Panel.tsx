"use client";

import { MemberDetailsPageProvider } from "@/features/members/details/model/SubscriptionContext";
import * as MemberDetailsLayer from "@/widgets/members/details/ui";

export default function Panel() {
    return (
        <MemberDetailsPageProvider>
            <MemberDetailsLayer.Title />
            <div className="grid gap-4">
                <MemberDetailsLayer.Action />
                <MemberDetailsLayer.Analysis />
            </div>
            <MemberDetailsLayer.Modal />
        </MemberDetailsPageProvider>
    );
}
