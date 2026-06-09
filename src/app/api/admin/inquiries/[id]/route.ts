import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { apiError, apiOk } from "@/shared/lib/api/server";
import { parseJsonBody } from "@/shared/lib/validation/parseRequest";
import { updateInquiryStatusSchema } from "@/shared/lib/validation/schemas/inquiry";

type RouteProps = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteProps) {
    const { id } = await params;
    const parsed = await parseJsonBody(request, updateInquiryStatusSchema);

    if (!parsed.success) {
        return parsed.response;
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase.from("inquiries").update({ status: parsed.data.status }).eq("id", id).select("*").single();

    return error ? apiError(error.message, 400) : apiOk(data);
}

export async function DELETE(_request: Request, { params }: RouteProps) {
    const { id } = await params;
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase.from("inquiries").delete().eq("id", id).select("*").single();
    return error ? apiError(error.message, 400) : apiOk(data);
}
