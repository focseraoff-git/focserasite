-- ==============================================================================
-- 1. Create STUDIO_SERVICES table (if not exists)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.studio_services (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  description text,
  thumbnail text,
  category text,
  price_min integer NOT NULL,
  pricing_mode text,
  is_active boolean NOT NULL DEFAULT true,
  terms jsonb,
  default_add_ons jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT studio_services_pkey PRIMARY KEY (id)
);

-- Toggle RLS for services
ALTER TABLE public.studio_services ENABLE ROW LEVEL SECURITY;

-- Allow public read access to services
CREATE POLICY "Allow public read access" ON public.studio_services
    FOR SELECT USING (true);


-- ==============================================================================
-- 2. Create STUDIO_QUOTES table (if not exists)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.studio_quotes (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    name text,
    email text,
    phone text,
    event_date date,
    details text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT studio_quotes_pkey PRIMARY KEY (id)
);

-- Toggle RLS for quotes
ALTER TABLE public.studio_quotes ENABLE ROW LEVEL SECURITY;

-- Allow public insertion (for booking forms)
CREATE POLICY "Allow public insert quotes" ON public.studio_quotes
    FOR INSERT WITH CHECK (true);


-- ==============================================================================
-- 3. Create STUDIO_BOOKINGS table (if not exists)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.studio_bookings (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid,
  service_id bigint,
  total_price integer NOT NULL,
  event_date date,
  event_venue text,
  client_details jsonb,
  package_details jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  status text DEFAULT 'confirmed'::text,
  CONSTRAINT studio_bookings_pkey PRIMARY KEY (id),
  CONSTRAINT studio_bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT studio_bookings_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.studio_services(id)
);

-- Toggle RLS for bookings
ALTER TABLE public.studio_bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own bookings
CREATE POLICY "Users can view own bookings" ON public.studio_bookings
    FOR SELECT USING (auth.uid() = user_id);


-- ==============================================================================
-- 4. INSERT DATA: Register 'Feb in Frames' as a Service
-- ==============================================================================
-- We insert this so it appears in any dynamic service lists, though the UI is currently custom.
INSERT INTO public.studio_services (
    name, 
    description, 
    category, 
    price_min, 
    pricing_mode, 
    is_active, 
    terms,
    thumbnail
)
VALUES (
    'Feb in Frames',
    'Exclusive Valentine Week AI-Enhanced Studio Experience. Includes Reels, Photos, and Premium Frames.',
    'Campaign',
    999, -- Placeholder starting price
    'starting_from',
    true,
    '{"cancellation": "Non-refundable", "reschedule": "Subject to availability"}',
    '/images/feb-campaign-thumb.jpg' 
);
