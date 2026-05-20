"use client";

import { createContext, ReactNode, useContext } from "react";

type NewsListPageProviderValue = { routeName: string };
const NewsListPageContext = createContext<NewsListPageProviderValue | null>(null);

export function NewsListPageProvider({ children }: { children: ReactNode }) {
    return <NewsListPageContext.Provider value={{ routeName: "news" }}>{children}</NewsListPageContext.Provider>;
}

export function useNewsListProvider() {
    const context = useContext(NewsListPageContext);
    if (!context) throw new Error("useNewsListProvider must be used within NewsListPageProvider");
    return context;
}
