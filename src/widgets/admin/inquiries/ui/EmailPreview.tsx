type EmailPreviewProps = {
    previewHtml: string;
};

export function EmailPreview({ previewHtml }: EmailPreviewProps) {
    return (
        <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 py-8">
            <div>
                <h1 className="text-xl font-bold text-slate-900">문의 메일 미리보기</h1>
                <p className="mt-1 text-sm text-slate-600">`buildInquiryEmailHtml` 결과를 브라우저에서 바로 확인하는 개발용 페이지입니다.</p>
            </div>

            <iframe
                title="Inquiry Email Preview"
                srcDoc={previewHtml}
                className="h-[1400px] w-full bg-white"
            />
        </section>
    );
}
