import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const placeholderValues = new Set([
  "",
  "your_supabase_url",
  "your_supabase_anon_key",
  "https://dummy.supabase.co",
  "dummy",
]);

function isUsable(value: string | undefined) {
  return Boolean(value && !placeholderValues.has(value));
}

export function isSupabaseConfigured(): boolean {
  return isUsable(supabaseUrl) && isUsable(supabaseAnonKey);
}

export function createBrowserSupabaseClient(): SupabaseClient {
  return createClient(
    supabaseUrl || "https://dummy.supabase.co",
    supabaseAnonKey || "dummy"
  );
}

export function createServerSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured() || !supabaseUrl || !(supabaseServiceRoleKey || supabaseAnonKey)) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey || supabaseAnonKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const supabase = createBrowserSupabaseClient();
