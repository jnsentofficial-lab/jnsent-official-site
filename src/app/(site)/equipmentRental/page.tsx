import type { Metadata } from "next";
import { cookies } from "next/headers";
import { EquipmentRentalView } from "@/views/equipmentRental/EquipmentRentalView";
import Main from "@/widgets/layout/Main";
import { buildCmsPageMetadata } from "@/shared/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
    return buildCmsPageMetadata("equipmentRental", {
        title: "장비렌탈 | 제이엔에스 엔터테인먼트",
        description: "콘텐츠 제작과 방송 송출에 필요한 장비 렌탈을 안내합니다.",
        path: "/equipmentRental",
    });
}

export default async function EquipmentRentalPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="equipment-rental"
            className={{ inner: "", container: "min-h-[calc(100svh-10.8rem)]" }}
        >
            <EquipmentRentalView />
        </Main>
    );
}
