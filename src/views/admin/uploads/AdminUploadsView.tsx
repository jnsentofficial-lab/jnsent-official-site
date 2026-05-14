import { AdminHeader } from "@/widgets/adminHeader/AdminHeader";
import { AdminSidebar } from "@/widgets/adminSidebar/AdminSidebar";
import { ImageUploader } from "@/widgets/imageUploader/ImageUploader";

export function AdminUploadsView() {
    return (
        <main className="grid min-h-screen grid-cols-[24rem_minmax(0,1fr)] bg-slate-100 max-[86rem]:grid-cols-1">
            <AdminSidebar />
            <section className="p-8 max-[86rem]:px-4 max-[86rem]:py-6">
                <AdminHeader
                    description="관리자 업로드 파일의 형식과 용량을 확인합니다."
                    title="이미지 업로드"
                />
                <ImageUploader />
            </section>
        </main>
    );
}
