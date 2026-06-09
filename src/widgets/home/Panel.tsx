"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { HomePageProvider } from "@/features/home/model/SubscriptionContext";
import * as HomeLayer from "@/widgets/home/ui";

export default function Panel() {
    useEffect(() => {
        window.scrollTo(0, 0);

        const lenis = new Lenis({ lerp: 0.14, allowNestedScroll: true });
        let frameId = 0;

        const raf = (time: number) => {
            lenis.raf(time);
            frameId = window.requestAnimationFrame(raf);
        };

        frameId = window.requestAnimationFrame(raf);

        return () => {
            window.cancelAnimationFrame(frameId);
            lenis.destroy();
        };
    }, []);

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
