import { create } from "zustand";

type ApiPendingStore = {
    pendingCount: number;
    startPending: () => void;
    finishPending: () => void;
};

export const useApiPendingStore = create<ApiPendingStore>((set) => ({
    pendingCount: 0,
    startPending: () => set((state) => ({ pendingCount: state.pendingCount + 1 })),
    finishPending: () => set((state) => ({ pendingCount: Math.max(0, state.pendingCount - 1) })),
}));

export function startApiPending() {
    useApiPendingStore.getState().startPending();
}

export function finishApiPending() {
    useApiPendingStore.getState().finishPending();
}
