-- ==============================================================================
-- SIMPLE USERNAME/PASSWORD ADMIN AUTHENTICATION
-- Replace email-based auth with simple username/password
-- ==============================================================================

-- 0. DROP OLD FUNCTIONS (to avoid conflicts)
DROP FUNCTION IF EXISTS public.log_admin_action(TEXT, TEXT, UUID, JSONB);
DROP FUNCTION IF EXISTS public.get_admin_user();
DROP FUNCTION IF EXISTS public.admin_login(TEXT, TEXT);


-- 1. DROP OLD TABLES (if they exist)
DROP TABLE IF EXISTS public.admin_audit_log CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- 2. CREATE NEW ADMIN USERS TABLE
CREATE TABLE public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('volunteer', 'organiser')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to verify login (read-only for login function)
CREATE POLICY "Allow login verification" ON public.admin_users
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON public.admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON public.admin_users(role);

-- 3. CREATE AUDIT LOG TABLE
CREATE TABLE public.admin_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID REFERENCES public.admin_users(id),
    admin_username TEXT,
    action_type TEXT NOT NULL,
    target_type TEXT,
    target_id UUID,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all to read logs
CREATE POLICY "Allow read audit logs" ON public.admin_audit_log
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audit_log_admin ON public.admin_audit_log(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON public.admin_audit_log(created_at DESC);

-- 4. LOGIN FUNCTION
CREATE OR REPLACE FUNCTION public.admin_login(
    p_username TEXT,
    p_password TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user RECORD;
BEGIN
    -- Get user
    SELECT * INTO v_user
    FROM public.admin_users
    WHERE username = p_username AND is_active = true;

    IF v_user IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Invalid credentials');
    END IF;

    -- Verify password
    IF v_user.password_hash != crypt(p_password, v_user.password_hash) THEN
        RETURN jsonb_build_object('success', false, 'error', 'Invalid credentials');
    END IF;

    -- Update last login
    UPDATE public.admin_users
    SET last_login = now()
    WHERE id = v_user.id;

    RETURN jsonb_build_object(
        'success', true,
        'user', jsonb_build_object(
            'id', v_user.id,
            'username', v_user.username,
            'full_name', v_user.full_name,
            'role', v_user.role
        )
    );
END;
$$;

-- 5. HELPER FUNCTION TO LOG ADMIN ACTIONS
CREATE OR REPLACE FUNCTION public.log_admin_action(
    p_admin_user_id UUID,
    p_action_type TEXT,
    p_target_type TEXT DEFAULT NULL,
    p_target_id UUID DEFAULT NULL,
    p_details JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_username TEXT;
BEGIN
    -- Get username
    SELECT username INTO v_username
    FROM public.admin_users
    WHERE id = p_admin_user_id;

    IF v_username IS NOT NULL THEN
        INSERT INTO public.admin_audit_log (
            admin_user_id, admin_username, action_type, target_type, target_id, details
        ) VALUES (
            p_admin_user_id, v_username, p_action_type, p_target_type, p_target_id, p_details
        );
    END IF;
END;
$$;

-- 6. CREATE DEFAULT ADMIN USERS
-- Password is hashed using pgcrypto
INSERT INTO public.admin_users (username, password_hash, full_name, role) VALUES
    ('volunteer1', crypt('volunteer123', gen_salt('bf')), 'Volunteer User', 'volunteer'),
    ('organiser1', crypt('organiser123', gen_salt('bf')), 'Organiser User', 'organiser');

-- 7. GRANT PERMISSIONS
GRANT SELECT ON public.admin_users TO anon, authenticated;
GRANT SELECT ON public.admin_audit_log TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_login TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.log_admin_action TO anon, authenticated;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'Admin accounts created:';
    RAISE NOTICE '  Volunteer: volunteer1 / volunteer123';
    RAISE NOTICE '  Organiser: organiser1 / organiser123';
    RAISE NOTICE '==============================================';
END $$;
