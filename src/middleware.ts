import { NextRequest, NextResponse } from "next/server";

const adminLoginPath = "/admin/login";

function hasAdminSession(request: NextRequest) {
    return request.cookies.get("admin_session")?.value === "1";
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAdminApi = pathname.startsWith("/api/admin");
    const isAdminPage = pathname.startsWith("/admin");

    if (!isAdminApi && !isAdminPage) {
        return NextResponse.next();
    }

    if (hasAdminSession(request)) {
        return NextResponse.next();
    }

    if (isAdminApi) {
        return NextResponse.json({ message: "관리자 권한이 필요합니다." }, { status: 401 });
    }

    if (pathname !== adminLoginPath) {
        return NextResponse.redirect(new URL(adminLoginPath, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
