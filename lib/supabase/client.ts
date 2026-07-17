import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Lazily-created Supabase client for the public, read-only directory data
 * (categories/tools). Uses the anon key — safe to share, RLS only allows
 * SELECT (see supabase/schema.sql). Lazy so importing this module doesn't
 * crash pages before env vars are configured; the error only surfaces when
 * a query actually runs.
 */
export function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to .env.local (see .env.local.example)."
    );
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}
