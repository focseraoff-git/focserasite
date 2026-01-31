-- Create interior_quotes table
create table if not exists public.interior_quotes (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    full_name text not null,
    email text not null,
    phone text not null,
    property_type text,      -- Apartment / Villa / Commercial
    configuration text,      -- 1BHK / 2BHK / 3BHK / 4BHK+
    location text,           -- Hyderabad areas
    intent_type text,        -- Room-Wise Revamp / Full Home Packages
    selected_items jsonb,    -- Array of zones or selected tier
    core_services jsonb,     -- Array of add-ons
    status text default 'pending'
);

-- Enable RLS
alter table public.interior_quotes enable row level security;

-- Policies
create policy "Allow public inserts" on public.interior_quotes for insert to public with check (true);
create policy "Allow authenticated reads" on public.interior_quotes for select to authenticated using (true);
create policy "Allow anon reads" on public.interior_quotes for select to anon using (true);
