import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://unpbalwhranarpggvckh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVucGJhbHdocmFuYXJwZ2d2Y2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MzQ3MDAsImV4cCI6MjA4ODAxMDcwMH0.rHLHukj6BzpccqHn4P4-XbdPeSOqi9IBaE7Ex5e2MJo';

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
    const { data, error } = await supabase.from('unified_packages').select('*');
    console.log("Data:", data);
    console.log("Error:", error);
})();
