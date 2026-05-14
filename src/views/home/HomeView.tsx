import { AboutSection } from "@/widgets/homeHero/AboutSection";
import { CtaSection } from "@/widgets/homeHero/CtaSection";
import { HeroSection } from "@/widgets/homeHero/HeroSection";
import { IntroBandSection } from "@/widgets/homeHero/IntroBandSection";
import { NoticeSection } from "@/widgets/homeHero/NoticeSection";
import { RecruitSection } from "@/widgets/homeHero/RecruitSection";
import { StatsSection } from "@/widgets/homeHero/StatsSection";
import { StrengthsSection } from "@/widgets/homeHero/StrengthsSection";
import { SupportSection } from "@/widgets/homeHero/SupportSection";

export function HomeView() {
    return (
        <main className="overflow-x-hidden bg-white text-[#2c2c2c]">
            <HeroSection />
            <IntroBandSection />
            <AboutSection />
            <StatsSection />
            <StrengthsSection />
            <SupportSection />
            <RecruitSection />
            <NoticeSection />
            <CtaSection />
        </main>
    );
}
