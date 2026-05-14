import UI from "@/shared/ui/UIComponent";
import Link from "next/link";

const services = [
    {
        href: "/setupGuide",
        title: "프로그램 세팅안내",
        description: "방송과 운영 환경을 빠르게 정리합니다.",
    },
    {
        href: "/equipmentRental",
        title: "장비렌탈",
        description: "촬영과 송출에 필요한 장비를 준비합니다.",
    },
    {
        href: "/studioRental",
        title: "스튜디오 대여",
        description: "콘텐츠 제작 공간을 안정적으로 제공합니다.",
    },
    {
        href: "/consulting",
        title: "엔터창업컨설팅",
        description: "사업 구조와 운영 흐름을 함께 설계합니다.",
    },
];

export function ServiceNav() {
    return (
        <section className="py-[8.8rem]">
            <div className="mx-auto w-[min(112rem,calc(100%_-_3.2rem))]">
                <div className="mb-8 max-w-[64rem]">
                    <p className="mb-3 text-[1.3rem] font-bold text-teal-500">Services</p>
                    <h2 className="m-0 text-[3.4rem] leading-[1.25]">필요한 운영 요소를 한 번에 확인하세요</h2>
                </div>
                <div className="grid grid-cols-4 gap-4 max-[86rem]:grid-cols-1 min-[86.1rem]:max-[108rem]:grid-cols-2">
                    {services.map((service) => (
                        <UI.Link
                            className="flex min-h-[17rem] flex-col justify-between rounded-lg border border-slate-200 bg-white p-6"
                            href={service.href}
                            key={service.href}
                        >
                            <strong className="text-xl leading-[1.35]">{service.title}</strong>
                            <span className="leading-[1.6] text-slate-600">{service.description}</span>
                        </UI.Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
