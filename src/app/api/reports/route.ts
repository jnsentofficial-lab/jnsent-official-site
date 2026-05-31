import { createSupabaseServerClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pathname = String(searchParams.get("pathname") ?? "").trim();

    if (!pathname) {
        return apiOk([]);
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from("ui_reports").select("*").eq("pathname", pathname).order("created_at", { ascending: false });

    return error ? apiError(error.message, 500) : apiOk(data ?? []);
}

export async function POST(request: Request) {
    const body = await request.json();
    const pathname = String(body.pathname ?? "").trim();
    const reportId = String(body.report_id ?? "").trim();
    const reportType = String(body.report_type ?? "").trim();
    const message = String(body.message ?? "").trim();
    const xRatio = Number(body.x_ratio);
    const yRatio = Number(body.y_ratio);
    const elementXRatio = body.element_x_ratio === null || body.element_x_ratio === undefined ? null : Number(body.element_x_ratio);
    const elementYRatio = body.element_y_ratio === null || body.element_y_ratio === undefined ? null : Number(body.element_y_ratio);
    const scrollY = Number(body.scroll_y);
    const documentY = Number(body.document_y);
    const viewportWidth = Number(body.viewport_width);
    const viewportHeight = Number(body.viewport_height);
    const isValidRatio = Number.isFinite(xRatio) && Number.isFinite(yRatio) && xRatio >= 0 && xRatio <= 1 && yRatio >= 0 && yRatio <= 1;
    const hasElementRatio = elementXRatio !== null && elementYRatio !== null;
    const isValidElementRatio =
        (!hasElementRatio && elementXRatio === null && elementYRatio === null) ||
        (hasElementRatio && Number.isFinite(elementXRatio) && Number.isFinite(elementYRatio) && elementXRatio >= 0 && elementXRatio <= 1 && elementYRatio >= 0 && elementYRatio <= 1);
    const isValidPosition = Number.isInteger(scrollY) && scrollY >= 0 && Number.isInteger(documentY) && documentY >= 0;
    const isValidViewport = Number.isInteger(viewportWidth) && Number.isInteger(viewportHeight) && viewportWidth > 0 && viewportHeight > 0;

    if (!pathname || !reportId || !["group", "item"].includes(reportType) || !message || !isValidRatio || !isValidElementRatio || !isValidPosition || !isValidViewport) {
        return apiError("리포트 정보를 다시 확인해주세요.", 400);
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from("ui_reports")
        .insert({
            pathname,
            report_id: reportId,
            report_type: reportType as "group" | "item",
            message,
            x_ratio: xRatio,
            y_ratio: yRatio,
            element_x_ratio: elementXRatio,
            element_y_ratio: elementYRatio,
            scroll_y: scrollY,
            document_y: documentY,
            viewport_width: viewportWidth,
            viewport_height: viewportHeight,
            design_width: Number(body.design_width) || DESIGN_WIDTH,
            design_height: Number(body.design_height) || DESIGN_HEIGHT,
        })
        .select("*")
        .single();

    return error ? apiError(error.message, 400) : apiOk(data, { status: 201 });
}
