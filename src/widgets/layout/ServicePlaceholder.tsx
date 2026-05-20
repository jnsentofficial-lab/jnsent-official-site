"use client";

type ServicePlaceholderProps = {
    title: string;
    description: string;
};

export function ServicePlaceholder({ title, description }: ServicePlaceholderProps) {
    return (
        <section className="rounded-lg border border-slate-200 bg-white p-8">
            <p className="mb-3 text-sm font-bold text-blue-700">준비 중</p>
            <h2 className="mt-0 mb-3 text-2xl text-slate-900">{title}</h2>
            <p className="m-0 leading-[1.7] text-slate-600">{description}</p>
        </section>
    );
}
