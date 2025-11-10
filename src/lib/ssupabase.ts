import { createClient } from '@supabase/supabase-js';

// ✅ Environment variables
const lmsSupabaseUrl =
  import.meta.env.VITE_FOCSERA_LMS_PROJECT_URL ?? import.meta.env.VITE_SUPABASE_URL;
const lmsSupabaseAnonKey =
  import.meta.env.VITE_FOCSERA_LMS_ANON_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!lmsSupabaseUrl) {
  throw new Error('Missing environment variable: VITE_FOCSERA_LMS_PROJECT_URL or VITE_SUPABASE_URL');
}
if (!lmsSupabaseAnonKey) {
  throw new Error('Missing environment variable: VITE_FOCSERA_LMS_ANON_KEY or VITE_SUPABASE_ANON_KEY');
}

// ✅ Prevent multiple instances (singleton pattern)
let clientInstance: ReturnType<typeof createClient> | null = null;

export const lmsSupabaseClient = (() => {
  if (!clientInstance) {
    clientInstance = createClient(lmsSupabaseUrl, lmsSupabaseAnonKey, {
      auth: {
        persistSession: true,
        storageKey: 'focsera-skillverse-auth', // unique key to prevent conflict
        autoRefreshToken: true,
      },
      global: {
        headers: { 'x-application-name': 'Focsera SkillVerse' },
      },
    });
  }
  return clientInstance;
})();
