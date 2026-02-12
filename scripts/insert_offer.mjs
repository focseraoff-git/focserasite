
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gyjedezyhdlpwzeyixwg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amVkZXp5aGRscHd6ZXlpeHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDA5NDcsImV4cCI6MjA3NjExNjk0N30.6hsjkGN5ojE0jkLnO9qX5fRAGIQABLzlLoqagcNrm1s'; // From .env

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function insertService() {
    console.log('Inserting Just ₹999 Offer Service...');

    const serviceData = {
        name: 'Just ₹999 Offer',
        description: 'Professional Photography & Editing Included! Limited Time Offer.',
        thumbnail: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop', // We will update this to use local asset if needed, but for DB URL is better or just this placeholder
        category: 'Special Offer',
        is_active: true,
        terms: {
            clientSupport: 'Strictly limited time offer. No reshoots.',
            studioSupport: 'Professional editing included.'
        },
        default_add_ons: {
            extra_photographer: false,
            extra_videographer: false
        }
    };

    // Check if exists first
    const { data: existing } = await supabase
        .from('studio_services')
        .select('id')
        .eq('name', 'Just ₹999 Offer')
        .single();

    if (existing) {
        console.log('Service already exists, skipping insert.');
        return;
    }

    const { data, error } = await supabase
        .from('studio_services')
        .insert([serviceData])
        .select();

    if (error) {
        console.error('Error inserting service:', error);
    } else {
        console.log('Service inserted successfully:', data);
    }
}

insertService();
