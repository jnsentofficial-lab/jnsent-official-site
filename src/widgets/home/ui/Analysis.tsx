import { AboutSection } from "@/widgets/home/ui/AboutSection";
import { CtaSection } from "@/widgets/home/ui/CtaSection";
import { HeroSection } from "@/widgets/home/ui/HeroSection";
import { IntroBandSection } from "@/widgets/home/ui/IntroBandSection";
import { NoticeSection } from "@/widgets/home/ui/NoticeSection";
import { RecruitSection } from "@/widgets/home/ui/RecruitSection";
import { StatsSection } from "@/widgets/home/ui/StatsSection";
import { StrengthsSection } from "@/widgets/home/ui/StrengthsSection";
import { SupportSection } from "@/widgets/home/ui/SupportSection";

export function Analysis() {
    return (
        <div className="overflow-x-hidden bg-white text-[#2c2c2c]">
            <HeroSection />
            <IntroBandSection />
            <AboutSection />
            <StatsSection />
            <StrengthsSection />
            <SupportSection />
            <RecruitSection />
            <NoticeSection />
            <CtaSection />
        </div>
    );
}
