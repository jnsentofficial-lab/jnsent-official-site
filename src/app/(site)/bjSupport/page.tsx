import type { Metadata } from "next";
import { BjSupportView } from "@/views/bjSupport/BjSupportView";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "BJ 지원 및 상담 | New Project 2",
    description: "BJ 활동 시작과 성장을 위한 방송 운영 상담을 안내합니다.",
};

export default function BjSupportPage() {
    return <BjSupportView />;
}
