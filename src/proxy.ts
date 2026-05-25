import { NextRequest, NextResponse } from "next/server";

const adminLoginPath = "/admin/login";

function hasAdminSession(request: NextRequest) {
    return request.cookies.get("admin_session")?.value === "1";
}

function canManageAccounts(request: NextRequest) {
    const role = request.cookies.get("admin_role")?.value;

    return role === "manager" || role === "admin";
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAdminApi = pathname.startsWith("/api/admin");
    const isAdminPage = pathname.startsWith("/admin");

    if (!isAdminApi && !isAdminPage) {
        return NextResponse.next();
    }

    if (hasAdminSession(request)) {
        if (pathname.startsWith("/api/admin/account/manager") && !canManageAccounts(request)) {
            return NextResponse.json({ message: "관리자 계정 관리 권한이 필요합니다." }, { status: 403 });
        }

        if (pathname.startsWith("/admin/account/manager") && !canManageAccounts(request)) {
            return NextResponse.redirect(new URL("/admin/inquiries", request.url));
        }

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
