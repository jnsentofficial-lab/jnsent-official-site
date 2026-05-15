export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    public: {
        Tables: {
            assets: {
                Row: {
                    id: string;
                    bucket: string;
                    path: string;
                    url: string;
                    mime_type: string;
                    size_bytes: number;
                    alt: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    bucket: string;
                    path: string;
                    url: string;
                    mime_type: string;
                    size_bytes: number;
                    alt?: string | null;
                    created_at?: string;
                };
                Update: Partial<Database["public"]["Tables"]["assets"]["Insert"]>;
                Relationships: [];
            };
            banners: {
                Row: {
                    id: string;
                    title: string;
                    subtitle: string | null;
                    image_url: string;
                    link_url: string | null;
                    sort_order: number;
                    is_published: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    title: string;
                    subtitle?: string | null;
                    image_url: string;
                    link_url?: string | null;
                    sort_order?: number;
                    is_published?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Database["public"]["Tables"]["banners"]["Insert"]>;
                Relationships: [];
            };
            global_modals: {
                Row: {
                    id: string;
                    title: string;
                    content: string;
                    image_url: string | null;
                    col: number;
                    row: number;
                    stack_order: number;
                    dismiss_type: "none" | "today" | "days";
                    dismiss_days: number | null;
                    starts_at: string | null;
                    ends_at: string | null;
                    is_visible: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    title: string;
                    content: string;
                    image_url?: string | null;
                    col?: number;
                    row?: number;
                    stack_order?: number;
                    dismiss_type?: "none" | "today" | "days";
                    dismiss_days?: number | null;
                    starts_at?: string | null;
                    ends_at?: string | null;
                    is_visible?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Database["public"]["Tables"]["global_modals"]["Insert"]>;
                Relationships: [];
            };
            inquiries: {
                Row: {
                    id: string;
                    name: string;
                    phone: string;
                    email: string | null;
                    category: string;
                    message: string;
                    message_body: Json | null;
                    status: "new" | "in_progress" | "done" | "spam";
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    phone: string;
                    email?: string | null;
                    category: string;
                    message: string;
                    message_body?: Json | null;
                    status?: "new" | "in_progress" | "done" | "spam";
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Database["public"]["Tables"]["inquiries"]["Insert"]>;
                Relationships: [];
            };
            inquiry_comments: {
                Row: {
                    id: string;
                    inquiry_id: string;
                    manager_name: string;
                    message: string;
                    message_body: Json | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    inquiry_id: string;
                    manager_name: string;
                    message: string;
                    message_body?: Json | null;
                    created_at?: string;
                };
                Update: Partial<Database["public"]["Tables"]["inquiry_comments"]["Insert"]>;
                Relationships: [];
            };
            manager_accounts: {
                Row: {
                    id: string;
                    name: string;
                    role: "manager" | "admin" | "viewer";
                    login_id: string;
                    password_hash: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    role?: "manager" | "admin" | "viewer";
                    login_id: string;
                    password_hash: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Database["public"]["Tables"]["manager_accounts"]["Insert"]>;
                Relationships: [];
            };
            news: {
                Row: {
                    id: string;
                    slug: string;
                    title: string;
                    summary: string | null;
                    body: Json;
                    thumbnail_url: string | null;
                    seo_title: string | null;
                    seo_description: string | null;
                    is_published: boolean;
                    published_at: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    slug: string;
                    title: string;
                    summary?: string | null;
                    body?: Json;
                    thumbnail_url?: string | null;
                    seo_title?: string | null;
                    seo_description?: string | null;
                    is_published?: boolean;
                    published_at?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Database["public"]["Tables"]["news"]["Insert"]>;
                Relationships: [];
            };
            page_contents: {
                Row: {
                    id: string;
                    slug: string;
                    title: string;
                    description: string | null;
                    body: Json;
                    seo_title: string | null;
                    seo_description: string | null;
                    og_image_url: string | null;
                    is_published: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    slug: string;
                    title: string;
                    description?: string | null;
                    body?: Json;
                    seo_title?: string | null;
                    seo_description?: string | null;
                    og_image_url?: string | null;
                    is_published?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Database["public"]["Tables"]["page_contents"]["Insert"]>;
                Relationships: [];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
};
