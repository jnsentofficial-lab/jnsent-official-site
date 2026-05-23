"use client";

import { Component, ErrorInfo, ReactNode } from "react";

type GlobalErrorBoundaryProps = {
    children: ReactNode;
};

type GlobalErrorBoundaryState = {
    hasError: boolean;
};

export class GlobalErrorBoundary extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
    state: GlobalErrorBoundaryState = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <main className="grid min-h-screen place-items-center p-8 text-slate-700">화면을 불러오지 못했습니다.</main>;
        }

        return this.props.children;
    }
}
