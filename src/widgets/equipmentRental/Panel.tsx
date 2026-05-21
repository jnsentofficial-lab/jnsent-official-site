"use client";

import { EquipmentRentalPageProvider } from "@/features/equipmentRental/model/SubscriptionContext";
import * as EquipmentRentalLayer from "@/widgets/equipmentRental/ui";

export default function Panel() {
    return (
        <EquipmentRentalPageProvider>
            <EquipmentRentalLayer.Analysis />
        </EquipmentRentalPageProvider>
    );
}
