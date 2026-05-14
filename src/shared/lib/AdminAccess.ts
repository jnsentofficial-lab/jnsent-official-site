const fallbackAdminEmails = ["to_before@naver.com"];

function getConfiguredAdminEmails() {
    return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
}

export function isAdminUser(user?: { app_metadata?: Record<string, unknown>; email?: string } | null) {
    const email = user?.email?.toLowerCase();
    const adminEmails = getConfiguredAdminEmails();

    return user?.app_metadata?.role === "admin" || Boolean(email && [...adminEmails, ...fallbackAdminEmails].includes(email));
}
