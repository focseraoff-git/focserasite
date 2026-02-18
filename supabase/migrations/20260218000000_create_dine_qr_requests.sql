-- Create table for storing Dine QR demo requests
create table if not exists public.dine_qr_requests (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  restaurant_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  table_count text,
  address text,
  cuisine_type text,
  current_pos text,
  details text
);

-- Enable RLS
alter table public.dine_qr_requests enable row level security;

-- Drop policies if they exist (to avoid "policy already exists" error)
drop policy if exists "Enable insert for all users" on public.dine_qr_requests;
drop policy if exists "Enable read for authenticated users only" on public.dine_qr_requests;

-- Re-create policies
create policy "Enable insert for all users" on public.dine_qr_requests
  for insert with check (true);

create policy "Enable read for authenticated users only" on public.dine_qr_requests
  for select using (auth.role() = 'authenticated');

-- Reload schema cache to ensure the new table is visible immediately
notify pgrst, 'reload schema';
