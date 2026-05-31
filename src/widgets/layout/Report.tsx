"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type MouseEvent, type PointerEvent as ReactPointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCreateReportMutation, useReportsQuery } from "@/entities/report/api/report.query";
import type { Report, ReportTargetType } from "@/entities/report/model/report.type";
import { showErrorToast } from "@/shared/lib/toast";

const DOT_SIZE = 14;
const DOCK_MARGIN = 8;
const TARGET_SELECTOR = "[data-report-id][data-report-type]";
const TARGET_COLOR: Record<ReportTargetType, string> = {
    group: "#2563eb",
    item: "#ef4444",
};

type ReportMode = "idle" | "report" | "view";
type TargetSnapshot = {
    id: string;
    type: ReportTargetType;
    rect: DOMRect;
};
type DraftReport = {
    clientX: number;
    clientY: number;
    xRatio: number;
    yRatio: number;
    elementXRatio: number;
    elementYRatio: number;
    scrollY: number;
    documentY: number;
    reportId: string;
    reportType: ReportTargetType;
    message: string;
};
type ReportMarker = {
    id: string;
    message: string;
    createdAt: string;
    reportId: string;
    reportType: ReportTargetType;
    left: number;
    top: number;
    rect: DOMRect | null;
};
type DockPosition = {
    x: number;
    y: number;
};

function clampRatio(value: number) {
    if (Number.isNaN(value)) {
        return 0;
    }

    return Math.min(1, Math.max(0, value));
}

function escapeAttribute(value: string) {
    return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function toSnapshot(element: HTMLElement | null): TargetSnapshot | null {
    if (!element) {
        return null;
    }

    const reportId = element.dataset.reportId?.trim();
    const reportType = element.dataset.reportType;

    if (!reportId || (reportType !== "group" && reportType !== "item")) {
        return null;
    }

    return {
        id: reportId,
        type: reportType,
        rect: element.getBoundingClientRect(),
    };
}

function findTargetElement(baseElement: HTMLElement | null) {
    if (!baseElement) {
        return null;
    }

    const itemTarget = baseElement.closest<HTMLElement>('[data-report-type="item"][data-report-id]');

    if (itemTarget) {
        return itemTarget;
    }

    return baseElement.closest<HTMLElement>('[data-report-type="group"][data-report-id]');
}

function findTargetByPoint(overlay: HTMLDivElement | null, clientX: number, clientY: number) {
    if (!overlay) {
        return null;
    }

    const previousPointerEvents = overlay.style.pointerEvents;
    overlay.style.pointerEvents = "none";
    const hitElement = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
    overlay.style.pointerEvents = previousPointerEvents;

    return findTargetElement(hitElement);
}

function getMarkerFromReport(report: Report, currentScrollY: number) {
    const selector = `${TARGET_SELECTOR}[data-report-id="${escapeAttribute(report.report_id)}"][data-report-type="${report.report_type}"]`;
    const targetElement = document.querySelector<HTMLElement>(selector);
    const pointLeft = window.innerWidth * report.x_ratio - DOT_SIZE / 2;
    const pointTop = report.document_y - currentScrollY - DOT_SIZE / 2;

    if (targetElement) {
        const rect = targetElement.getBoundingClientRect();

        return {
            id: report.id,
            message: report.message,
            createdAt: report.created_at,
            reportId: report.report_id,
            reportType: report.report_type,
            left: rect.left + rect.width * (report.element_x_ratio ?? report.x_ratio) - DOT_SIZE / 2,
            top: rect.top + rect.height * (report.element_y_ratio ?? report.y_ratio) - DOT_SIZE / 2,
            rect,
        };
    }

    return {
        id: report.id,
        message: report.message,
        createdAt: report.created_at,
        reportId: report.report_id,
        reportType: report.report_type,
        left: pointLeft,
        top: pointTop,
        rect: null,
    };
}

function clampDockPosition(position: DockPosition, dockWidth: number, dockHeight: number) {
    const maxX = Math.max(DOCK_MARGIN, window.innerWidth - dockWidth - DOCK_MARGIN);
    const maxY = Math.max(DOCK_MARGIN, window.innerHeight - dockHeight - DOCK_MARGIN);

    return {
        x: Math.min(Math.max(position.x, DOCK_MARGIN), maxX),
        y: Math.min(Math.max(position.y, 0), maxY),
    };
}

function stickDockToEdge(position: DockPosition, dockWidth: number, dockHeight: number) {
    const maxX = Math.max(DOCK_MARGIN, window.innerWidth - dockWidth - DOCK_MARGIN);
    const maxY = Math.max(DOCK_MARGIN, window.innerHeight - dockHeight - DOCK_MARGIN);
    const clamped = clampDockPosition(position, dockWidth, dockHeight);
    const distances = [
        { side: "top", value: clamped.y },
        { side: "bottom", value: Math.abs(maxY - clamped.y) },
        { side: "left", value: Math.abs(clamped.x - DOCK_MARGIN) },
        { side: "right", value: Math.abs(maxX - clamped.x) },
    ] as const;
    const nearest = distances.reduce((closest, current) => (current.value < closest.value ? current : closest), distances[0]);

    if (nearest.side === "top") {
        return { x: clamped.x, y: 0 };
    }

    if (nearest.side === "bottom") {
        return { x: clamped.x, y: maxY };
    }

    if (nearest.side === "left") {
        return { x: DOCK_MARGIN, y: clamped.y };
    }

    return { x: maxX, y: clamped.y };
}

export function Report() {
    const pathname = usePathname() || "/";
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const dockRef = useRef<HTMLDivElement | null>(null);
    const dockDragStateRef = useRef({ pointerId: -1, startX: 0, startY: 0, originX: 0, originY: 0 });
    const hoveredElementRef = useRef<HTMLElement | null>(null);
    const selectedElementRef = useRef<HTMLElement | null>(null);
    const [mode, setMode] = useState<ReportMode>("idle");
    const [isDockCollapsed, setIsDockCollapsed] = useState(false);
    const [dockPosition, setDockPosition] = useState<DockPosition>({ x: 0, y: 0 });
    const [draft, setDraft] = useState<DraftReport | null>(null);
    const [hoveredTarget, setHoveredTarget] = useState<TargetSnapshot | null>(null);
    const [selectedTarget, setSelectedTarget] = useState<TargetSnapshot | null>(null);
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const [markers, setMarkers] = useState<ReportMarker[]>([]);
    const { data: reports, isFetching } = useReportsQuery(pathname, mode === "view");
    const { mutateAsync: createReport, isPending } = useCreateReportMutation();
    const dockWidth = isDockCollapsed ? 192 : 300;
    // const dockWidth = isDockCollapsed ? 148 : 390;
    const dockHeight = isDockCollapsed ? 48 : 104;
    const isTopDock = dockPosition.y === 0;

    useEffect(() => {
        setDraft(null);
        setHoveredTarget(null);
        setSelectedTarget(null);
        hoveredElementRef.current = null;
        selectedElementRef.current = null;
    }, [pathname, mode]);

    useEffect(() => {
        const initialPosition = clampDockPosition(
            {
                x: Math.round((window.innerWidth - dockWidth) / 2),
                y: 0,
            },
            dockWidth,
            dockHeight,
        );

        setDockPosition((current) => {
            if (current.x === 0 && current.y === 0) {
                return initialPosition;
            }

            return clampDockPosition(current, dockWidth, dockHeight);
        });

        const handleResize = () => {
            setDockPosition((current) => clampDockPosition(current, dockWidth, dockHeight));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [dockHeight, dockWidth]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setDraft(null);
                setHoveredTarget(null);
                setSelectedTarget(null);
                hoveredElementRef.current = null;
                selectedElementRef.current = null;
                setMode("idle");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        const syncScrollY = () => setCurrentScrollY(window.scrollY);

        syncScrollY();
        window.addEventListener("scroll", syncScrollY, { passive: true });
        return () => window.removeEventListener("scroll", syncScrollY);
    }, []);

    useEffect(() => {
        if (mode !== "view") {
            setMarkers((current) => (current.length ? [] : current));
            return;
        }

        const syncMarkers = () => {
            setMarkers(reports.map((report) => getMarkerFromReport(report, window.scrollY)));
        };

        syncMarkers();
        window.addEventListener("scroll", syncMarkers, { passive: true });
        window.addEventListener("resize", syncMarkers);

        return () => {
            window.removeEventListener("scroll", syncMarkers);
            window.removeEventListener("resize", syncMarkers);
        };
    }, [mode, reports]);

    useEffect(() => {
        if (mode !== "report") {
            return;
        }

        const syncTargetRects = () => {
            setHoveredTarget(toSnapshot(hoveredElementRef.current));
            setSelectedTarget(toSnapshot(selectedElementRef.current));
        };

        window.addEventListener("scroll", syncTargetRects, { passive: true });
        window.addEventListener("resize", syncTargetRects);

        return () => {
            window.removeEventListener("scroll", syncTargetRects);
            window.removeEventListener("resize", syncTargetRects);
        };
    }, [mode]);

    const helperText = useMemo(() => {
        if (mode === "report") {
            if (selectedTarget) {
                return `${selectedTarget.type === "group" ? "group" : "item"}: ${selectedTarget.id}`;
            }

            return "파란색은 group, 빨간색은 item 선택 영역입니다";
        }

        if (mode === "view") {
            return isFetching ? "리포트 불러오는 중" : `${reports.length}개의 리포트`;
        }

        return "리포트 하기를 눌러 피드백을 남겨주세요";
    }, [isFetching, mode, reports.length, selectedTarget]);

    const handleOverlayMove = (event: MouseEvent<HTMLDivElement>) => {
        if (mode !== "report" || draft) {
            return;
        }

        const targetElement = findTargetByPoint(overlayRef.current, event.clientX, event.clientY);
        hoveredElementRef.current = targetElement;
        setHoveredTarget(toSnapshot(targetElement));
    };

    const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
        if (mode !== "report") {
            return;
        }

        const targetElement = findTargetByPoint(overlayRef.current, event.clientX, event.clientY);
        const snapshot = toSnapshot(targetElement);

        if (!targetElement || !snapshot) {
            showErrorToast("선택 가능한 리포트 영역을 클릭해주세요.");
            return;
        }

        hoveredElementRef.current = targetElement;
        selectedElementRef.current = targetElement;
        setHoveredTarget(snapshot);
        setSelectedTarget(snapshot);
        setDraft({
            clientX: event.clientX,
            clientY: event.clientY,
            xRatio: clampRatio(event.clientX / window.innerWidth),
            yRatio: clampRatio(event.clientY / window.innerHeight),
            elementXRatio: clampRatio((event.clientX - snapshot.rect.left) / Math.max(snapshot.rect.width, 1)),
            elementYRatio: clampRatio((event.clientY - snapshot.rect.top) / Math.max(snapshot.rect.height, 1)),
            scrollY: window.scrollY,
            documentY: Math.round(window.scrollY + event.clientY),
            reportId: snapshot.id,
            reportType: snapshot.type,
            message: "",
        });
    };

    const handleSubmit = async () => {
        if (!draft) {
            return;
        }

        const message = draft.message.trim();

        if (!message) {
            showErrorToast("의견을 입력해주세요.");
            return;
        }

        try {
            await createReport({
                pathname,
                report_id: draft.reportId,
                report_type: draft.reportType,
                message,
                x_ratio: draft.xRatio,
                y_ratio: draft.yRatio,
                element_x_ratio: draft.elementXRatio,
                element_y_ratio: draft.elementYRatio,
                scroll_y: draft.scrollY,
                document_y: draft.documentY,
                viewport_width: window.innerWidth,
                viewport_height: window.innerHeight,
                design_width: 1920,
                design_height: 1080,
            });

            setDraft(null);
            setHoveredTarget(null);
            setSelectedTarget(null);
            hoveredElementRef.current = null;
            selectedElementRef.current = null;
            setMode("view");
        } catch {
            return;
        }
    };

    const handleDockPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).closest("button")) {
            return;
        }

        dockDragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            originX: dockPosition.x,
            originY: dockPosition.y,
        };

        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handleDockPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (dockDragStateRef.current.pointerId !== event.pointerId) {
            return;
        }

        const nextPosition = clampDockPosition(
            {
                x: dockDragStateRef.current.originX + (event.clientX - dockDragStateRef.current.startX),
                y: dockDragStateRef.current.originY + (event.clientY - dockDragStateRef.current.startY),
            },
            dockWidth,
            dockHeight,
        );

        setDockPosition(stickDockToEdge(nextPosition, dockWidth, dockHeight));
    };

    const handleDockPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (dockDragStateRef.current.pointerId !== event.pointerId) {
            return;
        }

        dockDragStateRef.current.pointerId = -1;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    return (
        <>
            <div
                ref={dockRef}
                className="fixed z-[1100] select-none mobile:hidden pc:block"
                style={{
                    left: dockPosition.x,
                    top: dockPosition.y,
                    width: dockWidth,
                }}
                onPointerDown={handleDockPointerDown}
                onPointerMove={handleDockPointerMove}
                onPointerUp={handleDockPointerUp}
                onPointerCancel={handleDockPointerUp}
            >
                <motion.div
                    animate={
                        {
                            // borderRadius: isDockCollapsed ? 999 : isTopDock ? 28 : 32,
                            // borderRadius: isDockCollapsed ? 999 : isTopDock ? 28 : 32,
                        }
                    }
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    className={`overflow-hidden border border-white/10 bg-black shadow-[0_0_15.2rem_0_#00000090] text-white ${isTopDock ? "rounded-[0_0_1.6rem_1.6rem]" : "rounded-[1.6rem_1.6rem_0_0]"}`}
                    // className={`overflow-hidden border border-white/10 bg-black shadow-[0_0_15.2rem_0_#00000090] text-white ${isTopDock ? "rounded-[3.2rem_3.2rem_0_0]" : "rounded-[0_0_3.2rem_3.2rem]"} ${isTopDock && !isDockCollapsed ? "rounded-t-none" : ""}`}
                    // className={`overflow-hidden border border-white/10 bg-black shadow-[0_0_15.2rem_0_#00000090] text-white ${isTopDock && !isDockCollapsed ? "rounded-t-none" : ""}`}
                >
                    {/* {isTopDock && !isDockCollapsed ? <div className="mx-auto h-[0.9rem] w-[10rem] rounded-b-full bg-white/10" /> : null} */}

                    <div className={`flex items-center justify-between gap-[1.2rem] p-[0.8rem] cursor-grab`}>
                        {/* <div className={`flex items-center justify-between gap-[1.2rem] ${isDockCollapsed ? "px-[1.4rem] py-[1.2rem]" : "px-[1.6rem] pb-[1rem] pt-[0.9rem]"}`}> */}
                        <div className="flex flex-col gap-[0.4rem] px-[1.6rem]">
                            <p className="text-[1.4rem] font-bold text-white/92">리포트 도구</p>
                            {!isDockCollapsed ? <p className="truncate text-[1.2rem] text-white/60">{helperText}</p> : null}
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsDockCollapsed((current) => !current)}
                            className="shrink-0 rounded-full border border-white/10 bg-white/8 px-[1rem] py-[0.58rem] text-[1.15rem] font-semibold text-white transition-colors hover:bg-white/16"
                        >
                            {isDockCollapsed ? "열기" : "숨김"}
                        </button>
                    </div>

                    <AnimatePresence initial={false}>
                        {!isDockCollapsed ? (
                            <motion.div
                                key="dock-panel"
                                initial={{ height: 0, opacity: 0, y: -10 }}
                                animate={{ height: "auto", opacity: 1, y: 0 }}
                                exit={{ height: 0, opacity: 0, y: -10 }}
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                className="overflow-hidden"
                            >
                                <div className="flex items-center gap-[0.4rem] px-[0.4rem] pb-[0.4rem]">
                                    <button
                                        type="button"
                                        onClick={() => setMode((current) => (current === "report" ? "idle" : "report"))}
                                        className={`cursor-pointer flex-1 rounded-[1.2rem] border px-[1.2rem] py-[0.95rem] text-[1.3rem] font-semibold transition-colors ${mode === "report" ? "border-[#ef4444] bg-[#ef4444] text-white shadow-[0_0.8rem_2rem_rgba(239,68,68,0.32)]" : "border-white/10 bg-[var(--adaptive-blue500)] text-white hover:bg-[var(--adaptive-blue300)]"}`}
                                    >
                                        {mode === "report" ? "리포트 선택 중단" : "리포트 하기"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMode((current) => (current === "view" ? "idle" : "view"))}
                                        className={`cursor-pointer flex-1 rounded-[1.2rem] border px-[1.2rem] py-[0.95rem] text-[1.3rem] font-semibold transition-colors ${mode === "view" ? "border-[#2563eb] bg-[#2563eb] text-white shadow-[0_0.8rem_2rem_rgba(37,99,235,0.3)]" : "bg-[#ffffff20] border-transparent text-white hover:bg-[var(--adaptive-blue300)]"}`}
                                    >
                                        리포트 목록 보기
                                    </button>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </motion.div>
            </div>

            {mode !== "idle" ? (
                <div
                    ref={overlayRef}
                    onMouseMove={handleOverlayMove}
                    onClick={handleOverlayClick}
                    className={`fixed inset-0 z-[1090] ${mode === "report" ? "cursor-crosshair bg-[rgba(15,23,42,0.04)]" : "pointer-events-none bg-transparent"}`}
                >
                    {hoveredTarget ? (
                        <div
                            className="pointer-events-none absolute rounded-[1.2rem]"
                            style={{
                                left: hoveredTarget.rect.left + 5,
                                top: hoveredTarget.rect.top + 5,
                                width: hoveredTarget.rect.width - 10,
                                height: hoveredTarget.rect.height - 10,
                                outline: `2px solid ${TARGET_COLOR[hoveredTarget.type]}`,
                                backgroundColor: `${TARGET_COLOR[hoveredTarget.type]}14`,
                            }}
                        >
                            <span
                                className="absolute left-0 top-0 -translate-y-[calc(100%+0.6rem)] rounded-full px-[0.8rem] py-[0.4rem] text-[1.1rem] font-semibold text-white"
                                style={{ backgroundColor: TARGET_COLOR[hoveredTarget.type] }}
                            >
                                {hoveredTarget.type} · {hoveredTarget.id}
                            </span>
                        </div>
                    ) : null}

                    {selectedTarget ? (
                        <div
                            className="pointer-events-none absolute rounded-[1.2rem]"
                            style={{
                                left: selectedTarget.rect.left + 5,
                                top: selectedTarget.rect.top + 5,
                                width: selectedTarget.rect.width - 10,
                                height: selectedTarget.rect.height - 10,
                                boxShadow: `0 0 0 3px ${TARGET_COLOR[selectedTarget.type]}`,
                            }}
                        />
                    ) : null}

                    {mode === "view"
                        ? markers.map((marker) =>
                              marker.rect ? (
                                  <div
                                      key={`${marker.id}-rect`}
                                      className="pointer-events-none absolute rounded-[1.2rem]"
                                      style={{
                                          left: marker.rect.left + 5,
                                          top: marker.rect.top + 5,
                                          width: marker.rect.width - 10,
                                          height: marker.rect.height - 10,
                                          outline: `1px solid ${TARGET_COLOR[marker.reportType]}`,
                                          backgroundColor: `${TARGET_COLOR[marker.reportType]}10`,
                                      }}
                                  />
                              ) : null,
                          )
                        : null}

                    {mode === "view"
                        ? markers.map((marker) => (
                              <div
                                  key={marker.id}
                                  className="group pointer-events-auto absolute"
                                  style={{
                                      left: marker.left,
                                      top: marker.top,
                                  }}
                              >
                                  <span className="relative z-[1] block h-[1.4rem] w-[1.4rem] rounded-full border-2 border-white bg-[#ef4444] shadow-[0_0_0_0.4rem_rgba(239,68,68,0.2)]" />
                                  <div className="pointer-events-none absolute left-[50%] top-[2rem] hidden w-[24rem] -translate-x-1/2 rounded-[1.2rem] bg-[rgba(15,23,42,0.94)] p-[1.2rem] text-left text-white shadow-[0_1rem_2.4rem_rgba(15,23,42,0.28)] group-hover:block">
                                      <p className="text-[1.3rem] font-semibold">{marker.message}</p>
                                      <p className="mt-[0.6rem] text-[1.1rem] text-white/70">
                                          {marker.reportType} · {marker.reportId}
                                      </p>
                                      <p className="mt-[0.4rem] text-[1.1rem] text-white/70">{new Date(marker.createdAt).toLocaleString("ko-KR")}</p>
                                  </div>
                              </div>
                          ))
                        : null}

                    {draft ? (
                        <div
                            onClick={(event) => event.stopPropagation()}
                            className="absolute w-[28rem] rounded-[1.6rem] border border-[rgba(255,255,255,0.22)] bg-white p-[1.2rem] shadow-[0_1.6rem_4rem_rgba(15,23,42,0.22)]"
                            style={{
                                left: Math.max(16, Math.min(draft.clientX + 16, window.innerWidth - 304)),
                                top: Math.max(16, Math.min(draft.clientY + 16, window.innerHeight - 220)),
                            }}
                        >
                            <p className="text-[1.3rem] font-semibold text-[#0f172a]">
                                {draft.reportType} · {draft.reportId}
                            </p>
                            <textarea
                                value={draft.message}
                                onChange={(event) => setDraft((current) => (current ? { ...current, message: event.target.value } : current))}
                                placeholder="수정 의견을 입력해주세요"
                                className="mt-[0.8rem] h-[10rem] w-full resize-none rounded-[1.2rem] border border-[rgba(15,23,42,0.14)] px-[1.2rem] py-[1rem] text-[1.3rem] text-[#0f172a] outline-none transition-colors focus:border-[#2563eb]"
                            />
                            <div className="mt-[0.8rem] flex items-center justify-end gap-[0.8rem]">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDraft(null);
                                        setSelectedTarget(null);
                                        selectedElementRef.current = null;
                                    }}
                                    className="rounded-full bg-[#e5e7eb] px-[1.2rem] py-[0.8rem] text-[1.2rem] font-semibold text-[#0f172a]"
                                >
                                    취소
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isPending}
                                    className="rounded-full bg-[#2563eb] px-[1.2rem] py-[0.8rem] text-[1.2rem] font-semibold text-white disabled:opacity-60"
                                >
                                    {isPending ? "전송 중..." : "전송"}
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </>
    );
}
