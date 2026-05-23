import type { Metadata } from "next";
import { cookies } from "next/headers";
import { EquipmentRentalView } from "@/views/equipmentRental/EquipmentRentalView";
import Main from "@/widgets/layout/Main";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "장비렌탈 | New Project 2",
    description: "콘텐츠 제작과 방송 송출에 필요한 장비 렌탈을 안내합니다.",
};

export default async function EquipmentRentalPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="equipment-rental"
            className={{ inner: "", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <EquipmentRentalView />
        </Main>
    );
}
