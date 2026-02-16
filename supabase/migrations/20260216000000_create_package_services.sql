-- ==============================================================================
-- Create Premium Packages System
-- Creates dedicated table for Dream Space and Celebration packages
-- ==============================================================================

-- 1. Create premium_packages table
CREATE TABLE IF NOT EXISTS public.premium_packages (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    package_key text NOT NULL UNIQUE,
    name text NOT NULL,
    description text,
    category text,
    thumbnail text,
    is_active boolean NOT NULL DEFAULT true,
    terms jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT premium_packages_pkey PRIMARY KEY (id)
);

-- 2. Create premium_package_tiers table (for Lite, Standard, Premium)
CREATE TABLE IF NOT EXISTS public.premium_package_tiers (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    package_id bigint NOT NULL,
    tier_key text NOT NULL,
    tier_name text NOT NULL,
    price integer NOT NULL,
    features jsonb,
    ideal_for text,
    is_popular boolean DEFAULT false,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT premium_package_tiers_pkey PRIMARY KEY (id),
    CONSTRAINT premium_package_tiers_package_id_fkey FOREIGN KEY (package_id) REFERENCES public.premium_packages(id) ON DELETE CASCADE,
    CONSTRAINT premium_package_tiers_unique UNIQUE (package_id, tier_key)
);

-- 3. Create premium_package_addons table
CREATE TABLE IF NOT EXISTS public.premium_package_addons (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    package_id bigint NOT NULL,
    addon_key text NOT NULL,
    name text NOT NULL,
    description text,
    price integer NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT premium_package_addons_pkey PRIMARY KEY (id),
    CONSTRAINT premium_package_addons_package_id_fkey FOREIGN KEY (package_id) REFERENCES public.premium_packages(id) ON DELETE CASCADE,
    CONSTRAINT premium_package_addons_unique UNIQUE (package_id, addon_key)
);

-- 4. Create premium_bookings table (separate from studio_bookings)
CREATE TABLE IF NOT EXISTS public.premium_bookings (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    user_id uuid,
    package_id bigint NOT NULL,
    tier_id bigint NOT NULL,
    total_price integer NOT NULL,
    event_date date,
    event_venue text,
    time_slot text,
    client_details jsonb,
    package_details jsonb,
    selected_addons jsonb,
    special_requirements text,
    status text DEFAULT 'new'::text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT premium_bookings_pkey PRIMARY KEY (id),
    CONSTRAINT premium_bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
    CONSTRAINT premium_bookings_package_id_fkey FOREIGN KEY (package_id) REFERENCES public.premium_packages(id),
    CONSTRAINT premium_bookings_tier_id_fkey FOREIGN KEY (tier_id) REFERENCES public.premium_package_tiers(id)
);

-- 5. Enable RLS on all tables
ALTER TABLE public.premium_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_package_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_package_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_bookings ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for public read access
CREATE POLICY "Allow public read packages" ON public.premium_packages
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read tiers" ON public.premium_package_tiers
    FOR SELECT USING (true);

CREATE POLICY "Allow public read addons" ON public.premium_package_addons
    FOR SELECT USING (is_active = true);

-- 7. Create policy for public booking insertion
CREATE POLICY "Allow public insert bookings" ON public.premium_bookings
    FOR INSERT WITH CHECK (true);

-- 8. Create policy for users to view their own bookings
CREATE POLICY "Users can view own bookings" ON public.premium_bookings
    FOR SELECT USING (auth.uid() = user_id);

-- ==============================================================================
-- Insert Dream Space Package Data
-- ==============================================================================

-- Insert Dream Space package
INSERT INTO public.premium_packages (package_key, name, description, category, thumbnail, is_active, terms)
VALUES (
    'dream_space',
    'Dream Space',
    'Complete end-to-end solution for your new space. From preparation and styling to celebration and professional capture.',
    'Space Launch',
    '/images/dream-space-thumb.jpg',
    true,
    '{
        "cancellation": "48 hours notice required for full refund",
        "reschedule": "Subject to availability, 24 hours notice required",
        "payment": "50% advance required to confirm booking"
    }'::jsonb
)
ON CONFLICT (package_key) DO NOTHING;

-- Insert Dream Space tiers
DO $$
DECLARE
    dream_space_id bigint;
BEGIN
    SELECT id INTO dream_space_id FROM public.premium_packages WHERE package_key = 'dream_space';
    
    IF dream_space_id IS NOT NULL THEN
        -- Lite tier
        INSERT INTO public.premium_package_tiers (package_id, tier_key, tier_name, price, features, ideal_for, is_popular, display_order)
        VALUES (
            dream_space_id,
            'lite',
            'Lite',
            15000,
            '["Basic space styling guidance", "Minimal decoration setup", "Photography coverage", "Short reel creation", "Edited photos delivery"]'::jsonb,
            'Small homes, offices, shops, budget-friendly setups',
            false,
            1
        )
        ON CONFLICT (package_id, tier_key) DO NOTHING;
        
        -- Standard tier
        INSERT INTO public.premium_package_tiers (package_id, tier_key, tier_name, price, features, ideal_for, is_popular, display_order)
        VALUES (
            dream_space_id,
            'standard',
            'Standard',
            35000,
            '["Space styling & arrangement", "Decoration setup", "Photography + videography", "Cinematic reels", "Portrait sessions", "Event coordination support"]'::jsonb,
            'Homes, offices, store openings, medium celebrations',
            true,
            2
        )
        ON CONFLICT (package_id, tier_key) DO NOTHING;
        
        -- Premium tier
        INSERT INTO public.premium_package_tiers (package_id, tier_key, tier_name, price, features, ideal_for, is_popular, display_order)
        VALUES (
            dream_space_id,
            'premium',
            'Premium',
            65000,
            '["Full space styling & enhancement", "Premium decoration setup", "Photography + cinematic video", "Multiple reels & portraits", "Frames or album options", "Event & Catering coordination"]'::jsonb,
            'Luxury homes, businesses, high-end launches',
            false,
            3
        )
        ON CONFLICT (package_id, tier_key) DO NOTHING;
        
        -- Insert Dream Space add-ons
        INSERT INTO public.premium_package_addons (package_id, addon_key, name, description, price, is_active)
        VALUES 
            (dream_space_id, 'fuel_up_kit', 'Fuel Up Kit', 'Branding & Logo design', 5000, true),
            (dream_space_id, 'website', 'Website', 'Design & Development', 15000, true),
            (dream_space_id, 'software', 'Software', 'Billing/Management system', 10000, true),
            (dream_space_id, 'marketing', 'Marketing', 'Reels & Social media content', 8000, true)
        ON CONFLICT (package_id, addon_key) DO NOTHING;
    END IF;
END $$;

-- ==============================================================================
-- Insert Celebration Package Data
-- ==============================================================================

-- Insert Celebration package
INSERT INTO public.premium_packages (package_key, name, description, category, thumbnail, is_active, terms)
VALUES (
    'celebration',
    'Celebration',
    'Professional photography and cinematic storytelling for your special moments. Birthdays, anniversaries, or milestones - celebrate stress-free.',
    'Events',
    '/images/celebration-thumb.jpg',
    true,
    '{
        "cancellation": "48 hours notice required for full refund",
        "reschedule": "Subject to availability, 24 hours notice required",
        "payment": "50% advance required to confirm booking"
    }'::jsonb
)
ON CONFLICT (package_key) DO NOTHING;

-- Insert Celebration tiers
DO $$
DECLARE
    celebration_id bigint;
BEGIN
    SELECT id INTO celebration_id FROM public.premium_packages WHERE package_key = 'celebration';
    
    IF celebration_id IS NOT NULL THEN
        -- Lite tier
        INSERT INTO public.premium_package_tiers (package_id, tier_key, tier_name, price, features, ideal_for, is_popular, display_order)
        VALUES (
            celebration_id,
            'lite',
            'Lite',
            8000,
            '["Photography coverage", "Short reel creation", "Edited photos delivery", "Portrait shots"]'::jsonb,
            'Small birthdays, home celebrations, intimate gatherings',
            false,
            1
        )
        ON CONFLICT (package_id, tier_key) DO NOTHING;
        
        -- Standard tier
        INSERT INTO public.premium_package_tiers (package_id, tier_key, tier_name, price, features, ideal_for, is_popular, display_order)
        VALUES (
            celebration_id,
            'standard',
            'Standard',
            20000,
            '["Photography + videography", "Creative reels", "Basic decoration setup", "Portrait sessions", "Event coordination support"]'::jsonb,
            'Birthdays, anniversaries, family events. Most Popular',
            true,
            2
        )
        ON CONFLICT (package_id, tier_key) DO NOTHING;
        
        -- Premium tier
        INSERT INTO public.premium_package_tiers (package_id, tier_key, tier_name, price, features, ideal_for, is_popular, display_order)
        VALUES (
            celebration_id,
            'premium',
            'Premium',
            45000,
            '["Photography + cinematic video", "Premium decoration setup", "Multiple reels", "Catering coordination (partner)", "Event management support", "Frames or album"]'::jsonb,
            'Large celebrations, parties, milestone events',
            false,
            3
        )
        ON CONFLICT (package_id, tier_key) DO NOTHING;
    END IF;
END $$;
