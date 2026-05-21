"use client";

export function SiteFooter() {
    return (
        <footer className="bg-black py-16 text-white">
            <div className="mx-auto grid w-[min(112rem,calc(100%_-_3.2rem))] grid-cols-2 gap-20 max-[86rem]:grid-cols-1">
                <div>
                    <strong className="block text-5xl font-black">JNS</strong>
                    <p className="mt-5 mb-0 text-xl font-black leading-[1.4] text-white/45">JNS ENTERTAINMENT<br />제이엔에스엔터테인먼트</p>
                </div>
                <address className="not-italic text-base font-semibold leading-[1.9] text-white/55">
                    <strong className="text-white/35">INFORMATION</strong>
                    <br />
                    제이엔에스 엔터테인먼트
                    <br />
                    대표 우인식
                    <br />
                    사업자등록번호 -
                    <br />
                    <br />
                    <strong className="text-white/35">CONTACT</strong>
                    <br />
                    02-6949-0286
                    <br />
                    <br />
                    <strong className="text-white/35">ADDRESS</strong>
                    <br />
                    서울특별시 강남구 강남대로 100길 30
                    <br />
                    <br />
                    Copyright 제이엔에스. All rights reserved.
                </address>
            </div>
        </footer>
    );
}
