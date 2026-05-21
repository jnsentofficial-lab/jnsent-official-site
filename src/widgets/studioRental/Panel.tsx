"use client";

import { StudioRentalPageProvider } from "@/features/studioRental/model/SubscriptionContext";
import * as StudioRentalLayer from "@/widgets/studioRental/ui";

export default function Panel() {
    return (
        <StudioRentalPageProvider>
            <StudioRentalLayer.Analysis />
        </StudioRentalPageProvider>
    );
}
