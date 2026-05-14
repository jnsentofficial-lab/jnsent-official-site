import type { Metadata } from "next";
import { StudioRentalView } from "@/views/studioRental/StudioRentalView";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "스튜디오 대여 | New Project 2",
    description: "방송과 촬영 목적에 맞는 스튜디오 대여 서비스를 안내합니다.",
};

export default function StudioRentalPage() {
    return <StudioRentalView />;
}
