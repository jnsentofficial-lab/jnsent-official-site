import { create } from "zustand";
import type { GlobalModal } from "@/entities/globalModal/model/globalModal.type";

type GlobalModalPreviewStore = {
    previewModal: GlobalModal | null;
    openPreviewModal: (modal: GlobalModal) => void;
    closePreviewModal: () => void;
};

export const useGlobalModalPreviewStore = create<GlobalModalPreviewStore>((set) => ({
    previewModal: null,
    openPreviewModal: (modal) => set({ previewModal: modal }),
    closePreviewModal: () => set({ previewModal: null }),
}));
