import { createClient } from "@supabase/supabase-js";
import { supabaseConfig, validateSupabaseConfig } from "@/shared/config/Supabase";
import type { Database } from "@/shared/types/Database";

export function createSupabaseServerClient() {
    validateSupabaseConfig();

    return createClient<Database>(supabaseConfig.url, supabaseConfig.anonKey);
}

export function createSupabaseServiceClient() {
    validateSupabaseConfig();

    return createClient<Database>(supabaseConfig.url, process.env.SUPABASE_SERVICE_ROLE_KEY ?? supabaseConfig.anonKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });
}
