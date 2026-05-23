import { create } from "zustand";

interface LayoutStoreType {
    isNowDarkMode: boolean;
    isNeedShowHeader: boolean;
    isNeedShowFloating: boolean;

    setIsNowDarkMode: (value: boolean) => void;
    setIsNeedShowHeader: (value: boolean) => void;
    setIsNeedShowFloating: (value: boolean) => void;
}

export const useLayoutStore = create<LayoutStoreType>()((set) => ({
    isNowDarkMode: false,
    isNeedShowHeader: false,
    isNeedShowFloating: false,

    setIsNowDarkMode: (value: boolean) => set({ isNowDarkMode: value }),
    setIsNeedShowHeader: (value: boolean) => set({ isNeedShowHeader: value }),
    setIsNeedShowFloating: (value: boolean) => set({ isNeedShowFloating: value }),
}));
