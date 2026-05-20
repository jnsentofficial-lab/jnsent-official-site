"use client";

import { createContext, ReactNode, useContext } from "react";

type NewsDetailPageProviderValue = { routeName: string; slug: string };
const NewsDetailPageContext = createContext<NewsDetailPageProviderValue | null>(null);

export function NewsDetailPageProvider({ children, slug }: { children: ReactNode; slug: string }) {
    return <NewsDetailPageContext.Provider value={{ routeName: "news/detail", slug }}>{children}</NewsDetailPageContext.Provider>;
}

export function useNewsDetailProvider() {
    const context = useContext(NewsDetailPageContext);
    if (!context) throw new Error("useNewsDetailProvider must be used within NewsDetailPageProvider");
    return context;
}
