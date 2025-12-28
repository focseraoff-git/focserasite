-- ==============================================================================
-- ADMIN AUTHENTICATION & AUDIT SYSTEM
-- Run this file to set up email/password authentication for volunteers/organisers
-- ==============================================================================

-- 1. CREATE ADMIN USERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('volunteer', 'organiser')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own record
CREATE POLICY "Users can read own record" ON public.admin_users
    FOR SELECT
    USING (auth.uid()::text = id::text);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON public.admin_users(role);

-- 2. CREATE AUDIT LOG TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID REFERENCES public.admin_users(id),
    admin_email TEXT,
    action_type TEXT NOT NULL,
    target_type TEXT,
    target_id UUID,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Policy: Organisers can read all logs, volunteers can read their own
CREATE POLICY "Admin can read audit logs" ON public.admin_audit_log
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE id = admin_user_id AND (role = 'organiser' OR id::text = auth.uid()::text)
        )
    );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audit_log_admin ON public.admin_audit_log(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created ON public.admin_audit_log(created_at DESC);

-- 3. HELPER FUNCTIONS
-- ==============================================================================

-- Function to get admin user by auth ID
CREATE OR REPLACE FUNCTION public.get_admin_user()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user RECORD;
BEGIN
    -- Get user from admin_users table
    SELECT * INTO v_user
    FROM public.admin_users
    WHERE id::text = auth.uid()::text AND is_active = true;

    IF v_user IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Unauthorized');
    END IF;

    -- Update last login
    UPDATE public.admin_users
    SET last_login = now()
    WHERE id = v_user.id;

    RETURN jsonb_build_object(
        'success', true,
        'user', jsonb_build_object(
            'id', v_user.id,
            'email', v_user.email,
            'full_name', v_user.full_name,
            'role', v_user.role
        )
    );
END;
$$;

-- Function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
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
    v_admin_user RECORD;
BEGIN
    -- Get current admin user
    SELECT * INTO v_admin_user
    FROM public.admin_users
    WHERE id::text = auth.uid()::text;

    IF v_admin_user IS NOT NULL THEN
        INSERT INTO public.admin_audit_log (
            admin_user_id, admin_email, action_type, target_type, target_id, details
        ) VALUES (
            v_admin_user.id, v_admin_user.email, p_action_type, p_target_type, p_target_id, p_details
        );
    END IF;
END;
$$;

-- 4. UPDATE EXISTING ADMIN FUNCTIONS WITH AUDIT LOGGING
-- ==============================================================================

-- Update player with audit log
CREATE OR REPLACE FUNCTION public.admin_update_player(
    p_id UUID,
    p_full_name TEXT,
    p_email TEXT,
    p_status TEXT,
    p_balance INTEGER
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

-- Delete player with audit log
CREATE OR REPLACE FUNCTION public.admin_delete_player(p_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_player_name TEXT;
BEGIN
    -- Get player name for logging
    SELECT full_name INTO v_player_name FROM public.game_card_bookings WHERE id = p_id;

    -- Delete transactions first
    DELETE FROM public.game_card_transactions WHERE card_id = p_id;
    
    -- Delete booking
    DELETE FROM public.game_card_bookings WHERE id = p_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Player not found');
    END IF;

    -- Log action
    PERFORM public.log_admin_action(
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

-- Process transaction with audit log
CREATE OR REPLACE FUNCTION public.process_card_transaction(
    p_card_code TEXT,
    p_amount INTEGER,
    p_type TEXT,
    p_notes TEXT
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
    -- Validate Card
    SELECT id, COALESCE(balance, 0) INTO v_card_id, v_current_balance
    FROM public.game_card_bookings
    WHERE card_code = p_card_code;

    IF v_card_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Card not found');
    END IF;

    -- Calculate New Balance
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

    -- Update Balance
    UPDATE public.game_card_bookings
    SET balance = v_new_balance
    WHERE id = v_card_id;

    -- Log Transaction
    INSERT INTO public.game_card_transactions (card_id, transaction_type, amount, notes)
    VALUES (v_card_id, p_type, p_amount, p_notes);

    -- Log admin action
    PERFORM public.log_admin_action(
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

-- Delete transaction with audit log
CREATE OR REPLACE FUNCTION public.admin_delete_transaction(p_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM public.game_card_transactions WHERE id = p_id;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Transaction not found');
    END IF;

    -- Log action
    PERFORM public.log_admin_action(
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

-- Update game registration with audit log
CREATE OR REPLACE FUNCTION public.admin_update_game_registration(
    p_id UUID,
    p_full_name TEXT,
    p_email TEXT,
    p_phone TEXT,
    p_game_type TEXT,
    p_preferred_day TEXT,
    p_preferred_time_slot TEXT
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

    -- Log action
    PERFORM public.log_admin_action(
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

-- Delete game registration with audit log
CREATE OR REPLACE FUNCTION public.admin_delete_game_registration(p_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_reg_name TEXT;
BEGIN
    -- Get registration name for logging
    SELECT full_name INTO v_reg_name FROM public.game_registrations WHERE id = p_id;

    DELETE FROM public.game_registrations WHERE id = p_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Registration not found');
    END IF;

    -- Log action
    PERFORM public.log_admin_action(
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

-- 5. GRANT PERMISSIONS
-- ==============================================================================
GRANT SELECT ON public.admin_users TO authenticated;
GRANT SELECT ON public.admin_audit_log TO authenticated;

GRANT EXECUTE ON FUNCTION public.get_admin_user TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_admin_action TO authenticated;

-- Note: Admin users must be created via Supabase Auth dashboard or custom admin panel
-- After creating a user in Auth, insert into admin_users table with their UUID, email, and role
