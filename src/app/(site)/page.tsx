import type { Metadata } from "next";
import { HomeView } from "@/views/home/HomeView";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "New Project 2",
    description: "콘텐츠 비즈니스를 위한 운영 파트너입니다.",
};

export default function HomePage() {
    return <HomeView />;
}
