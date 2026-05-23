import { create } from "zustand";

interface LayoutStoreType {
    isNowDarkMode: boolean;

    setIsNowDarkMode: (value: boolean) => void;
}

export const useLayoutStore = create<LayoutStoreType>()((set) => ({
    isNowDarkMode: false,

    setIsNowDarkMode: (value: boolean) => set({ isNowDarkMode: value }),
}));
