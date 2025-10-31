import * as supabaseJs from '@supabase/supabase-js';

// Some bundlers / ESM CDNs expose the library as named exports, others as a
// namespace/default object. Try both shapes for maximum compatibility.
const createClient = (supabaseJs as any).createClient ?? (supabaseJs as any).default?.createClient;

if (!createClient) {
  throw new Error('Unable to locate createClient on @supabase/supabase-js. Check your bundler/CDN configuration.');
}

// 1. Load environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 2. Check if the variables are loaded correctly
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Make sure to create a .env file.');
}

// 3. Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);