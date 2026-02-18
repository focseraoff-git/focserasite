-- Force schema reload to pick up new tables
notify pgrst, 'reload schema';

-- Grant required permissions (just in case)
grant all on table public.dine_qr_requests to anon;
grant all on table public.dine_qr_requests to authenticated;
grant all on table public.dine_qr_requests to service_role;
