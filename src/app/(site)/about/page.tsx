import type { Metadata } from "next";
import { AboutView } from "@/views/about/AboutView";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "회사소개 | New Project 2",
    description: "New Project 2의 운영 방향과 핵심 가치를 안내합니다.",
};

export default function AboutPage() {
    return <AboutView />;
}
