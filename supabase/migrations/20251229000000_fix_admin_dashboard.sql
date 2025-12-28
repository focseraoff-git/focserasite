-- ==============================================================================
-- FIX ADMIN DASHBOARD: AUTH, REPORTS, AND CRUD
-- ==============================================================================

-- 1. ENSURE TABLES EXIST
-- ==============================================================================

-- Game Registrations
CREATE TABLE IF NOT EXISTS public.game_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  flat_number TEXT NOT NULL,
  age INTEGER NOT NULL,
  game_type TEXT NOT NULL,
  preferred_day TEXT NOT NULL,
  preferred_time_slot TEXT,
  registration_code TEXT -- Added if missing
);

-- Add registration_code column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_registrations' AND column_name = 'registration_code') THEN
        ALTER TABLE public.game_registrations ADD COLUMN registration_code TEXT;
    END IF;
END $$;

-- Enable RLS for game_registrations
ALTER TABLE public.game_registrations ENABLE ROW LEVEL SECURITY;

-- Safely create policies
DROP POLICY IF EXISTS "Allow public inserts" ON public.game_registrations;
CREATE POLICY "Allow public inserts" ON public.game_registrations FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated reads" ON public.game_registrations;
CREATE POLICY "Allow authenticated reads" ON public.game_registrations FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow anon reads" ON public.game_registrations;
CREATE POLICY "Allow anon reads" ON public.game_registrations FOR SELECT TO anon USING (true); -- Needed for admin dashboard if not using Supabase Auth

-- 2. SETUP SIMPLE ADMIN AUTH (Replaces previous auth setup)
-- ==============================================================================

-- Drop old functions to avoid conflicts
DROP FUNCTION IF EXISTS public.log_admin_action(TEXT, TEXT, UUID, JSONB);
DROP FUNCTION IF EXISTS public.log_admin_action(UUID, TEXT, TEXT, UUID, JSONB); -- New signature
DROP FUNCTION IF EXISTS public.get_admin_user();
DROP FUNCTION IF EXISTS public.admin_login(TEXT, TEXT);

-- Recreate admin_users table
DROP TABLE IF EXISTS public.admin_users CASCADE;
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

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow login verification" ON public.admin_users;
CREATE POLICY "Allow login verification" ON public.admin_users FOR SELECT TO anon, authenticated USING (true);

-- Recreate audit log table
DROP TABLE IF EXISTS public.admin_audit_log CASCADE;
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

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow read audit logs" ON public.admin_audit_log;
CREATE POLICY "Allow read audit logs" ON public.admin_audit_log FOR SELECT TO anon, authenticated USING (true);

-- 3. AUTH FUNCTIONS
-- ==============================================================================

-- Login Function
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

-- Log Admin Action (Robust)
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
    -- Get username if ID provided
    IF p_admin_user_id IS NOT NULL THEN
        SELECT username INTO v_username
        FROM public.admin_users
        WHERE id = p_admin_user_id;
    ELSE
        v_username := 'system_or_unknown';
    END IF;

    INSERT INTO public.admin_audit_log (
        admin_user_id, admin_username, action_type, target_type, target_id, details
    ) VALUES (
        p_admin_user_id, v_username, p_action_type, p_target_type, p_target_id, p_details
    );
END;
$$;

-- 4. REPORT FUNCTIONS
-- ==============================================================================

-- Get Game Registration Reports
CREATE OR REPLACE FUNCTION public.get_game_registration_reports()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_report JSONB;
BEGIN
    SELECT jsonb_agg(r) INTO v_report
    FROM (
        SELECT 
            id,
            full_name,
            email,
            phone,
            flat_number,
            age,
            game_type,
            preferred_day,
            preferred_time_slot,
            registration_code,
            created_at
        FROM public.game_registrations
        ORDER BY created_at DESC
    ) r;

    RETURN jsonb_build_object('success', true, 'data', COALESCE(v_report, '[]'::jsonb));
END;
$$;

-- 5. CRUD FUNCTIONS (Updated to accept p_admin_id)
-- ==============================================================================

-- DROP OLD FUNCTIONS EXPLICITLY TO AVOID AMBIGUITY
DROP FUNCTION IF EXISTS public.admin_update_player(UUID, TEXT, TEXT, TEXT, INTEGER);
DROP FUNCTION IF EXISTS public.admin_update_player(UUID, TEXT, TEXT, TEXT, INTEGER, UUID);

DROP FUNCTION IF EXISTS public.admin_delete_player(UUID);
DROP FUNCTION IF EXISTS public.admin_delete_player(UUID, UUID);

DROP FUNCTION IF EXISTS public.process_card_transaction(TEXT, INTEGER, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.process_card_transaction(TEXT, INTEGER, TEXT, TEXT, UUID);

DROP FUNCTION IF EXISTS public.admin_delete_transaction(UUID);
DROP FUNCTION IF EXISTS public.admin_delete_transaction(UUID, UUID);

DROP FUNCTION IF EXISTS public.admin_update_game_registration(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.admin_update_game_registration(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, UUID);

DROP FUNCTION IF EXISTS public.admin_delete_game_registration(UUID);
DROP FUNCTION IF EXISTS public.admin_delete_game_registration(UUID, UUID);


-- Update Player
CREATE OR REPLACE FUNCTION public.admin_update_player(
    p_id UUID,
    p_full_name TEXT,
    p_email TEXT,
    p_status TEXT,
    p_balance INTEGER,
    p_admin_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.game_card_bookings
    SET 
        full_name = p_full_name,
        email = p_email,
        status = p_status,
        balance = p_balance
    WHERE id = p_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Player not found');
    END IF;

    -- Log action
    PERFORM public.log_admin_action(
        p_admin_id,
        'update_player',
        'game_card_booking',
        p_id,
        jsonb_build_object('full_name', p_full_name, 'status', p_status, 'balance', p_balance)
    );

    RETURN jsonb_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Delete Player
CREATE OR REPLACE FUNCTION public.admin_delete_player(
    p_id UUID,
    p_admin_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_player_name TEXT;
BEGIN
    SELECT full_name INTO v_player_name FROM public.game_card_bookings WHERE id = p_id;

    DELETE FROM public.game_card_transactions WHERE card_id = p_id;
    DELETE FROM public.game_card_bookings WHERE id = p_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Player not found');
    END IF;

    PERFORM public.log_admin_action(
        p_admin_id,
        'delete_player',
        'game_card_booking',
        p_id,
        jsonb_build_object('player_name', v_player_name)
    );

    RETURN jsonb_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Process Transaction (Updated)
CREATE OR REPLACE FUNCTION public.process_card_transaction(
    p_card_code TEXT,
    p_amount INTEGER,
    p_type TEXT,
    p_notes TEXT,
    p_admin_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_card_id UUID;
    v_current_balance INTEGER;
    v_new_balance INTEGER;
BEGIN
    SELECT id, COALESCE(balance, 0) INTO v_card_id, v_current_balance
    FROM public.game_card_bookings
    WHERE card_code = p_card_code;

    IF v_card_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Card not found');
    END IF;

    IF p_type = 'refill' THEN
        v_new_balance := v_current_balance + p_amount;
    ELSIF p_type = 'spend' THEN
        IF v_current_balance < p_amount THEN
            RETURN jsonb_build_object('success', false, 'error', 'Insufficient balance');
        END IF;
        v_new_balance := v_current_balance - p_amount;
    ELSE
        RETURN jsonb_build_object('success', false, 'error', 'Invalid transaction type');
    END IF;

    UPDATE public.game_card_bookings
    SET balance = v_new_balance
    WHERE id = v_card_id;

    INSERT INTO public.game_card_transactions (card_id, transaction_type, amount, notes)
    VALUES (v_card_id, p_type, p_amount, p_notes);

    PERFORM public.log_admin_action(
        p_admin_id,
        'card_transaction',
        'game_card_booking',
        v_card_id,
        jsonb_build_object('type', p_type, 'amount', p_amount, 'notes', p_notes)
    );

    RETURN jsonb_build_object(
        'success', true,
        'new_balance', v_new_balance,
        'message', 'Transaction successful: ' || p_type
    );
END;
$$;

-- Delete Transaction
CREATE OR REPLACE FUNCTION public.admin_delete_transaction(
    p_id UUID,
    p_admin_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM public.game_card_transactions WHERE id = p_id;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Transaction not found');
    END IF;

    PERFORM public.log_admin_action(
        p_admin_id,
        'delete_transaction',
        'game_card_transaction',
        p_id,
        NULL
    );

    RETURN jsonb_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Update Registration
CREATE OR REPLACE FUNCTION public.admin_update_game_registration(
    p_id UUID,
    p_full_name TEXT,
    p_email TEXT,
    p_phone TEXT,
    p_game_type TEXT,
    p_preferred_day TEXT,
    p_preferred_time_slot TEXT,
    p_admin_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.game_registrations
    SET 
        full_name = p_full_name,
        email = p_email,
        phone = p_phone,
        game_type = p_game_type,
        preferred_day = p_preferred_day,
        preferred_time_slot = p_preferred_time_slot
    WHERE id = p_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Registration not found');
    END IF;

    PERFORM public.log_admin_action(
        p_admin_id,
        'update_registration',
        'game_registration',
        p_id,
        jsonb_build_object('game_type', p_game_type)
    );

    RETURN jsonb_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Delete Registration
CREATE OR REPLACE FUNCTION public.admin_delete_game_registration(
    p_id UUID,
    p_admin_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_reg_name TEXT;
BEGIN
    SELECT full_name INTO v_reg_name FROM public.game_registrations WHERE id = p_id;

    DELETE FROM public.game_registrations WHERE id = p_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Registration not found');
    END IF;

    PERFORM public.log_admin_action(
        p_admin_id,
        'delete_registration',
        'game_registration',
        p_id,
        jsonb_build_object('name', v_reg_name)
    );

    RETURN jsonb_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- 6. CREATE DEFAULT USERS
-- ==============================================================================
INSERT INTO public.admin_users (username, password_hash, full_name, role) VALUES
    ('volunteer1', crypt('volunteer123', gen_salt('bf')), 'Volunteer User', 'volunteer'),
    ('organiser1', crypt('organiser123', gen_salt('bf')), 'Organiser User', 'organiser')
ON CONFLICT (username) DO NOTHING;

-- 7. GRANT PERMISSIONS
-- ==============================================================================
GRANT SELECT ON public.admin_users TO anon, authenticated;
GRANT SELECT ON public.admin_audit_log TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_login TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.log_admin_action TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_game_registration_reports TO anon, authenticated;

-- Grant permissions for the new signatures specifically
GRANT EXECUTE ON FUNCTION public.admin_update_player(UUID, TEXT, TEXT, TEXT, INTEGER, UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_player(UUID, UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.process_card_transaction(TEXT, INTEGER, TEXT, TEXT, UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_transaction(UUID, UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_update_game_registration(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_game_registration(UUID, UUID) TO anon, authenticated;
