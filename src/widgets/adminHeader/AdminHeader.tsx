type AdminHeaderProps = {
    title: string;
    description: string;
};

export function AdminHeader({ title, description }: AdminHeaderProps) {
    return (
        <header className="mb-7">
            <div>
                <p className="mb-2.5 text-[1.3rem] font-bold text-blue-700">Management</p>
                <h1 className="m-0 text-[3.2rem] text-slate-900">{title}</h1>
                <span className="mt-3 block text-slate-700">{description}</span>
            </div>
        </header>
    );
}
