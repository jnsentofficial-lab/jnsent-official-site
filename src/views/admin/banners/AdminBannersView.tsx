"use client";

import { useAdminBannersQuery, useToggleBannerMutation } from "@/entities/banner/api/banner.query";
import { BannerEditor } from "@/features/manageBanner/BannerEditor";
import UI from "@/shared/ui/UIComponent";
import { AdminHeader } from "@/widgets/adminHeader/AdminHeader";
import { AdminSidebar } from "@/widgets/adminSidebar/AdminSidebar";

export function AdminBannersView() {
    const { data: banners = [] } = useAdminBannersQuery();
    const toggleBanner = useToggleBannerMutation();

    return (
        <main className="grid min-h-screen grid-cols-[24rem_minmax(0,1fr)] bg-slate-100 max-[86rem]:grid-cols-1">
            <AdminSidebar />
            <section className="p-8 max-[86rem]:px-4 max-[86rem]:py-6">
                <AdminHeader
                    description="메인 페이지에 노출되는 배너 문구와 이미지를 관리합니다."
                    title="메인 배너 관리"
                />
                <div className="grid grid-cols-[minmax(32rem,0.8fr)_minmax(0,1fr)] gap-[1.8rem] max-[86rem]:grid-cols-1">
                    <section className="rounded-lg border border-slate-200 bg-white p-6">
                        <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">배너 편집</h2>
                        <BannerEditor />
                    </section>
                    <section className="rounded-lg border border-slate-200 bg-white p-6">
                        <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">등록된 배너</h2>
                        <div className="grid gap-3">
                            {banners.length ? (
                                banners.map((banner) => (
                                    <article
                                        className="flex min-h-28 items-center justify-between gap-[1.8rem] rounded-lg border border-slate-200 bg-slate-50 p-[1.8rem] max-[86rem]:flex-col max-[86rem]:items-start"
                                        key={banner.title}
                                    >
                                        <div className="grid gap-2">
                                            <strong className="text-slate-900">{banner.title}</strong>
                                            <span className="leading-[1.6] text-slate-700">{banner.subtitle}</span>
                                        </div>
                                        <UI.Button
                                            className="min-h-11 shrink-0 rounded-lg bg-green-100 px-3.5 font-bold text-green-700"
                                            onClick={() => toggleBanner.mutate({ id: banner.id, is_published: !banner.is_published })}
                                            type="button"
                                        >
                                            {banner.is_published ? "공개" : "비공개"}
                                        </UI.Button>
                                    </article>
                                ))
                            ) : (
                                <p>등록된 배너가 없습니다.</p>
                            )}
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}
