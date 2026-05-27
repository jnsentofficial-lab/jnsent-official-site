import type { Database } from "@/shared/types/Database";

export type Report = Database["public"]["Tables"]["ui_reports"]["Row"];
export type CreateReportPayload = Omit<Database["public"]["Tables"]["ui_reports"]["Insert"], "id" | "created_at">;
export type ReportTargetType = Report["report_type"];
