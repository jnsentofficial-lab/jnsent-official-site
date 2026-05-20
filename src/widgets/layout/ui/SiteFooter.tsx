"use client";

import UI from "@/shared/ui/UIComponent";

export function SiteFooter() {
    return (
        <footer className="bg-black py-16 text-white">
            <div className="mx-auto flex w-[min(112rem,calc(100%_-_3.2rem))] items-start justify-between gap-10 max-[86rem]:flex-col">
                <div>
                    <strong className="block text-xl font-black">JNS ENTERTAINMENT</strong>
                    <p className="mt-3 mb-0 text-sm font-semibold leading-[1.7] text-white/45">검증된 운영구조와 투명한 정산을 기반으로 성장하는 콘텐츠 파트너</p>
                </div>
                <nav
                    className="flex gap-[2rem] text-sm font-bold text-white/70 max-[86rem]:w-full max-[86rem]:flex-wrap max-[86rem]:justify-start [&_a:hover]:text-white"
                    aria-label="하단 메뉴"
                >
                    <UI.Link href="/news">NEWS</UI.Link>
                    <UI.Link href="/bjSupport">상담 문의</UI.Link>
                    <UI.Link href="/consulting">창업컨설팅</UI.Link>
                </nav>
                <address className="not-italic text-sm font-semibold leading-[1.8] text-white/45">
                    서울특별시 강남구
                    <br />
                    CONTACT. help@jns-ent.com
                    <br />
                    Copyright JNS Entertainment. All rights reserved.
                </address>
            </div>
        </footer>
    );
}
