import { createClient } from '@supabase/supabase-js';

// 1. Load environment variables
const supabaseUrl = 'https://gyjedezyhdlpwzeyixwg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amVkZXp5aGRscHd6ZXlpeHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDA5NDcsImV4cCI6MjA3NjExNjk0N30.6hsjkGN5ojE0jkLnO9qX5fRAGIQABLzlLoqagcNrm1s';

// 2. Check if the variables are loaded correctly
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Make sure to create a .env file.');
}

// 3. Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
