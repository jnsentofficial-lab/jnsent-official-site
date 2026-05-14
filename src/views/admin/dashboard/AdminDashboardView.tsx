"use client";

import { useConfirmModalStore } from "@/entities/common/store/useConfirmModalStore";
import { useDashboardSummaryQuery } from "@/entities/dashboard/api/dashboard.query";
import { DashboardSummary } from "@/entities/dashboard/model/dashboard.type";
import Skeleton from "@/shared/ui/kit/Skeleton";
import UI from "@/shared/ui/UIComponent";
import { AdminHeader } from "@/widgets/adminHeader/AdminHeader";
import { AdminSidebar } from "@/widgets/adminSidebar/AdminSidebar";

const workItems = ["메인 배너 상태 확인", "페이지 콘텐츠 최신화", "NEWS 공개 여부 점검", "문의 응대 상태 확인"];

export function AdminDashboardView() {
    const { setConfirmModalState, confirmModalStateSync } = useConfirmModalStore();
    const { data, refetch } = useDashboardSummaryQuery();
    const summaryItems = [
        { label: "공개 페이지", value: String(data?.pages ?? 0) },
        { label: "메인 배너", value: String(data?.banners ?? 0) },
        { label: "NEWS", value: String(data?.news ?? 0) },
        { label: "신규 문의", value: String(data?.newInquiries ?? 0) },
    ];

    return (
        <main className="grid min-h-screen grid-cols-[24rem_minmax(0,1fr)] bg-slate-100 max-[86rem]:grid-cols-1">
            <AdminSidebar />
            <section className="p-8 max-[86rem]:px-4 max-[86rem]:py-6">
                <AdminHeader
                    description="콘텐츠 운영 상태와 주요 관리 항목을 한눈에 확인합니다."
                    title="관리자 대시보드"
                />
                <Skeleton.Div
                    target={!!data}
                    className={{
                        element: "grid grid-cols-4 gap-3.5 max-[86rem]:grid-cols-1 min-[86.1rem]:max-[108rem]:grid-cols-2",
                    }}
                >
                    {summaryItems.map((item) => (
                        <article
                            className="flex min-h-[13.2rem] flex-col justify-between rounded-lg border border-slate-200 bg-white p-[2.2rem]"
                            key={item.label}
                        >
                            <span className="font-bold text-slate-700">{item.label}</span>
                            <strong className="text-[3.4rem] text-slate-900">{item.value}</strong>
                        </article>
                    ))}
                </Skeleton.Div>
                <section className="mt-[1.8rem] rounded-lg border border-slate-200 bg-white p-6">
                    <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">운영 체크리스트</h2>
                    <UI.Button
                        onClick={async () => {
                            setConfirmModalState("proxySubscription", true);

                            const { isAgree } = await confirmModalStateSync("proxySubscription");

                            if (isAgree) {
                                // const payload = {
                                //     storeIdx: select.get.storeInfo.storeIdx,
                                //     planIdx: select.get.storeInfo.planIdx,
                                // };

                                refetch();
                            }
                        }}
                    >
                        테스트 버튼
                    </UI.Button>
                    <ul className="m-0 grid list-none gap-2.5 p-0">
                        {workItems.map((item) => (
                            <li
                                className="rounded-lg bg-slate-50 px-4 py-3.5 font-bold text-slate-700"
                                key={item}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
        </main>
    );
}
