import type { Metadata } from "next";
import { ConsultingView } from "@/views/consulting/ConsultingView";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "엔터창업컨설팅 | New Project 2",
    description: "엔터테인먼트 창업을 위한 운영 구조와 실행 계획을 안내합니다.",
};

export default function ConsultingPage() {
    return <ConsultingView />;
}
