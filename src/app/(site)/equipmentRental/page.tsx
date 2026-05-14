import type { Metadata } from "next";
import { EquipmentRentalView } from "@/views/equipmentRental/EquipmentRentalView";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "장비렌탈 | New Project 2",
    description: "콘텐츠 제작과 방송 송출에 필요한 장비 렌탈을 안내합니다.",
};

export default function EquipmentRentalPage() {
    return <EquipmentRentalView />;
}
