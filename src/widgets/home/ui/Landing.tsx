import { Text } from "@/shared/ui/kit/Text";
import React from "react";

export const Landing = () => {
    return (
        <article className="fixed top-0 left-0 h-[100dvh] bg-black z-10000 w-full flex justify-center">
            <Text.Reveal
                as="h2"
                className="text-[3.8rem] leading-[1.5]"
                initialColor="#00000000"
                midColor="rgb(255, 92, 118)"
                revealColor="rgb(255, 255, 255)"
                revealWindow={0.5}
                delay={2}
                transition={0}
                align="left"
            >
                {`수 많은 초보 BJ들이 선택한 이유`}
            </Text.Reveal>
        </article>
    );
};
