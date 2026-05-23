import { ImageUploadForm } from "@/features/uploadImage/ImageUploadForm";

export function ImageUploader() {
    return (
        <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="mt-0 mb-[1.8rem] text-xl text-slate-900">이미지 업로드</h2>
            <ImageUploadForm />
        </section>
    );
}
