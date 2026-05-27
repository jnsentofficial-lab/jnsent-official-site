import type { Metadata } from "next";
import { cookies } from "next/headers";
import { StudioRentalView } from "@/views/studioRental/StudioRentalView";
import Main from "@/widgets/layout/Main";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "스튜디오 대여 | 제이엔에스 엔터테인먼트",
    description: "방송과 촬영 목적에 맞는 스튜디오 대여 서비스를 안내합니다.",
};

export default async function StudioRentalPage() {
    const cookieStore = await cookies();
    void cookieStore;

    return (
        <Main
            id="studio-rental"
            className={{ inner: "", container: "min-h-[calc(100dvh-10.8rem)]" }}
        >
            <StudioRentalView />
        </Main>
    );
}
