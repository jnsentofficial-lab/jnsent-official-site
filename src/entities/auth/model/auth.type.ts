export type LoginPayload = {
    email: string;
    password: string;
};

export type AuthSessionResponse = {
    isAdmin: boolean;
    role: "manager" | "admin" | "viewer" | null;
    name: string | null;
};
