import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["192.168.0.6"],
    async headers() {
        return [
            {
                source: "/favicon.ico",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=86400",
                    },
                ],
            },
            {
                source: "/images/landing/optimized/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/fonts/optimized/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/images/landing/cta.png",
                destination: "/images/landing/optimized/cta.c65112b2.avif",
                permanent: true,
            },
            {
                source: "/images/landing/meeting.png",
                destination: "/images/landing/optimized/meeting.50114570.avif",
                permanent: true,
            },
            {
                source: "/images/landing/studio.jpg",
                destination: "/images/landing/optimized/studio.1e890eed.avif",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
