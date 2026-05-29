import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://unpbalwhranarpggvckh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVucGJhbHdocmFuYXJwZ2d2Y2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MzQ3MDAsImV4cCI6MjA4ODAxMDcwMH0.rHLHukj6BzpccqHn4P4-XbdPeSOqi9IBaE7Ex5e2MJo';

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
    console.log("=== Testing category details tables ===");
    
    const tablesToTest = ['package_category_details', 'partner_category_details', 'home_partner_type_details', 'home_partner_types'];
    for (const tbl of tablesToTest) {
        const { data, error } = await supabase.from(tbl).select('*').limit(1);
        console.log(`Table '${tbl}' exists? ${error ? 'NO' : 'YES'} (Error: ${error ? error.message : 'none'}, Data count: ${data ? data.length : 0})`);
        if (data && data.length > 0) {
            console.log(`Sample Row from '${tbl}':`, data[0]);
        }
    }
})();
