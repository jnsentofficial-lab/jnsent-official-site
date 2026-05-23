import type { Database } from "@/shared/types/Database";

export type GlobalModal = Database["public"]["Tables"]["global_modals"]["Row"];
export type CreateGlobalModalPayload = Omit<Database["public"]["Tables"]["global_modals"]["Insert"], "id" | "created_at" | "updated_at">;
export type UpdateGlobalModalPayload = Partial<CreateGlobalModalPayload> & Pick<GlobalModal, "id">;
export type ToggleGlobalModalPayload = Pick<GlobalModal, "id" | "is_visible">;
export type DeleteGlobalModalPayload = Pick<GlobalModal, "id">;
