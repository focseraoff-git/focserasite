-- Create web_bookings table
create table if not exists public.web_bookings (
    id uuid not null default gen_random_uuid(),
    created_at timestamp with time zone not null default now(),
    name text not null,
    mobile text not null,
    business_name text,
    message text,
    offer_code text default 'STANDARD',
    status text default 'pending',
    constraint web_bookings_pkey primary key (id)
);

-- detailed comments
comment on table public.web_bookings is 'Table to store bookings from the Web division page';

-- RLS Policies
alter table public.web_bookings enable row level security;

create policy "Enable insert for everyone"
    on public.web_bookings
    for insert
    with check (true);

create policy "Enable read for authenticated users only"
    on public.web_bookings
    for select
    to authenticated
    using (true);
