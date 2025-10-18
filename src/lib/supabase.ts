import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_Login_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_Login_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
