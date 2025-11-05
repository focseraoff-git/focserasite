
import { createClient } from '@supabase/supabase-js';

// Prefer project-specific VITE_FOCSERA_LMS_* keys but fall back to generic VITE_SUPABASE_* keys
const lmsSupabaseUrl = import.meta.env.VITE_FOCSERA_LMS_PROJECT_URL ?? import.meta.env.VITE_SUPABASE_URL;
const lmsSupabaseAnonKey = import.meta.env.VITE_FOCSERA_LMS_ANON_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

// Type check to ensure the variables are set
if (!lmsSupabaseUrl) {
  throw new Error('Missing environment variable: VITE_FOCSERA_LMS_PROJECT_URL or VITE_SUPABASE_URL');
}
if (!lmsSupabaseAnonKey) {
  throw new Error('Missing environment variable: VITE_FOCSERA_LMS_ANON_KEY or VITE_SUPABASE_ANON_KEY');
}

// Create and export the Supabase client
export const lmsSupabaseClient = createClient(lmsSupabaseUrl, lmsSupabaseAnonKey);
