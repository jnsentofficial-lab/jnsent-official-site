"use client";

import { HomePageProvider } from "@/features/home/model/SubscriptionContext";
import * as HomeLayer from "@/widgets/home/ui";

export default function Panel() {
    return (
        <HomePageProvider>
            <HomeLayer.Floating />
            <HomeLayer.HeroIntro />
            <HomeLayer.TransparencyProof />
            <HomeLayer.RecordGraph />
            <HomeLayer.OperationKnowhow />
            <HomeLayer.BroadcastEnvironment />
            <HomeLayer.PartnerRecruit />
            <HomeLayer.TrustPrinciples />
            <HomeLayer.ExpertNetwork />
            <HomeLayer.FinalCtaSection />
        </HomePageProvider>
    );
}
