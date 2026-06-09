import { createSupabaseServerClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";
import { parseJsonBody } from "@/shared/lib/validation/parseRequest";
import { createReportSchema } from "@/shared/lib/validation/schemas/report";

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
    const parsed = await parseJsonBody(request, createReportSchema);

    if (!parsed.success) {
        return parsed.response;
    }

    const body = parsed.data;
    const hasElementRatio = body.element_x_ratio !== null && body.element_x_ratio !== undefined && body.element_y_ratio !== null && body.element_y_ratio !== undefined;
    const isValidElementRatio =
        (!hasElementRatio && body.element_x_ratio == null && body.element_y_ratio == null) ||
        (hasElementRatio && body.element_x_ratio !== undefined && body.element_y_ratio !== undefined);

    if (!isValidElementRatio) {
        return apiError("리포트 정보를 다시 확인해주세요.", 400);
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from("ui_reports")
        .insert({
            pathname: body.pathname,
            report_id: body.report_id,
            report_type: body.report_type,
            message: body.message,
            x_ratio: body.x_ratio,
            y_ratio: body.y_ratio,
            element_x_ratio: body.element_x_ratio ?? null,
            element_y_ratio: body.element_y_ratio ?? null,
            scroll_y: body.scroll_y,
            document_y: body.document_y,
            viewport_width: body.viewport_width,
            viewport_height: body.viewport_height,
            design_width: body.design_width ?? DESIGN_WIDTH,
            design_height: body.design_height ?? DESIGN_HEIGHT,
        })
        .select("*")
        .single();

    return error ? apiError(error.message, 400) : apiOk(data, { status: 201 });
}
