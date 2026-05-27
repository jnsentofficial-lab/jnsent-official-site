import sharp from "sharp";
import { createSupabaseServiceClient } from "@/shared/api/SupabaseServer";
import { extractRichTextImages, toRichTextContent } from "@/shared/lib/richText/richText";
import type { Json } from "@/shared/types/Database";

const bucketName = "public-images";
const managedAssetPathPrefix = "/storage/v1/object/public/public-images/";

export async function uploadOptimizedImage(file: File) {
    const supabase = createSupabaseServiceClient();
    const sourceBuffer = Buffer.from(await file.arrayBuffer());
    const optimizedBuffer = await sharp(sourceBuffer).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
    const filePath = `admin/${crypto.randomUUID()}.webp`;
    const { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, optimizedBuffer, {
        contentType: "image/webp",
        upsert: false,
    });

    if (uploadError) {
        throw new Error("UPLOAD_FAILED");
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    const { error: assetError } = await supabase.from("assets").insert({
        bucket: bucketName,
        path: filePath,
        url: data.publicUrl,
        mime_type: "image/webp",
        size_bytes: optimizedBuffer.byteLength,
        alt: file.name,
    });

    if (assetError) {
        throw new Error("ASSET_SAVE_FAILED");
    }

    return {
        path: filePath,
        url: data.publicUrl,
    };
}

export function extractManagedAssetPath(url: string | null | undefined) {
    if (!url) {
        return null;
    }

    try {
        const pathname = new URL(url).pathname;
        const startIndex = pathname.indexOf(managedAssetPathPrefix);

        return startIndex >= 0 ? decodeURIComponent(pathname.slice(startIndex + managedAssetPathPrefix.length)) : null;
    } catch {
        return null;
    }
}

function collectUrls(values: Array<string | null | undefined>) {
    return values.filter((value): value is string => Boolean(value));
}

function collectRichTextUrls(value: Json | null | undefined) {
    return extractRichTextImages(toRichTextContent(value));
}

async function getReferencedAssetUrls() {
    const supabase = createSupabaseServiceClient();
    const [{ data: news }, { data: globalModals }, { data: pageContents }, { data: inquiries }, { data: inquiryComments }] = await Promise.all([
        supabase.from("news").select("body, thumbnail_url"),
        supabase.from("global_modals").select("image_url"),
        supabase.from("page_contents").select("body, og_image_url"),
        supabase.from("inquiries").select("message_body"),
        supabase.from("inquiry_comments").select("message_body"),
    ]);

    const referencedUrls = new Set<string>();

    (news ?? []).forEach((item) => {
        collectUrls([item.thumbnail_url, ...collectRichTextUrls(item.body)]).forEach((url) => referencedUrls.add(url));
    });
    (globalModals ?? []).forEach((item) => {
        collectUrls([item.image_url]).forEach((url) => referencedUrls.add(url));
    });
    (pageContents ?? []).forEach((item) => {
        collectUrls([item.og_image_url, ...collectRichTextUrls(item.body)]).forEach((url) => referencedUrls.add(url));
    });
    (inquiries ?? []).forEach((item) => {
        collectRichTextUrls(item.message_body).forEach((url) => referencedUrls.add(url));
    });
    (inquiryComments ?? []).forEach((item) => {
        collectRichTextUrls(item.message_body).forEach((url) => referencedUrls.add(url));
    });

    return referencedUrls;
}

export async function deleteUnusedManagedAssets(urls: Array<string | null | undefined>) {
    const candidateUrls = Array.from(new Set(urls.filter((url): url is string => Boolean(extractManagedAssetPath(url)))));

    if (!candidateUrls.length) {
        return;
    }

    const referencedUrls = await getReferencedAssetUrls();
    const supabase = createSupabaseServiceClient();

    await Promise.all(
        candidateUrls.map(async (url) => {
            if (referencedUrls.has(url)) {
                return;
            }

            const assetPath = extractManagedAssetPath(url);

            if (!assetPath) {
                return;
            }

            await supabase.storage.from(bucketName).remove([assetPath]);
            await supabase.from("assets").delete().eq("bucket", bucketName).eq("path", assetPath);
        }),
    );
}
