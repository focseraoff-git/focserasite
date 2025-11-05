
import { createClient } from '@supabase/supabase-js';

// Fetch the Supabase URL and Anon Key from Vite environment variables.
// Vite only exposes env vars that start with VITE_.
// Use VITE_FOCSERA_LMS_PROJECT_URL and VITE_FOCSERA_LMS_ANON_KEY in your .env
const lmsSupabaseUrl = import.meta.env.VITE_FOCSERA_LMS_PROJECT_URL;
const lmsSupabaseAnonKey = import.meta.env.VITE_FOCSERA_LMS_ANON_KEY;

// Type check to ensure the variables are set
if (!lmsSupabaseUrl) {
  throw new Error("Missing environment variable: REACT_APP_FOCSERA_LMS_PROJECT_URL");
}
if (!lmsSupabaseAnonKey) {
  throw new Error("Missing environment variable: REACT_APP_FOCSERA_LMS_ANON_KEY");
}

// Create and export the Supabase client
export const lmsSupabaseClient = createClient(lmsSupabaseUrl, lmsSupabaseAnonKey);
