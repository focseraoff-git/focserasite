import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gyjedezyhdlpwzeyixwg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amVkZXp5aGRscHd6ZXlpeHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDA5NDcsImV4cCI6MjA3NjExNjk0N30.6hsjkGN5ojE0jkLnO9qX5fRAGIQABLzlLoqagcNrm1s';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Present' : 'Missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
