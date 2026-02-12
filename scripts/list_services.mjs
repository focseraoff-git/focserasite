
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = 'https://gyjedezyhdlpwzeyixwg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amVkZXp5aGRscHd6ZXlpeHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDA5NDcsImV4cCI6MjA3NjExNjk0N30.6hsjkGN5ojE0jkLnO9qX5fRAGIQABLzlLoqagcNrm1s';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function listServices() {
    console.log('Listing services...');
    const { data, error } = await supabase
        .from('studio_services')
        .select('id, name, is_active, description, thumbnail');

    if (error) {
        console.error('Error:', error);
    } else {
        fs.writeFileSync('services_list.json', JSON.stringify(data, null, 2));
        console.log('Services written to services_list.json');
    }
}

listServices();
