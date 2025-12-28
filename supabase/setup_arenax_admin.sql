-- ==============================================================================
-- ARENAX ADMIN & VOLUNTEER SETUP
-- Run this file to enable Volunteer Dashboard, Organiser Reports, and Fix Counters.
-- ==============================================================================

-- 1. FIX VOLUNTEER COUNTER (RLS Policies)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    age INTEGER,
    flat_number TEXT,
    preferred_role TEXT,
    experience TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

-- Allow Anon/Public to Register (Insert)
DROP POLICY IF EXISTS "Allow public insert volunteers" ON public.volunteers;
CREATE POLICY "Allow public insert volunteers" ON public.volunteers
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Allow Anon/Public to View Count (Select)
DROP POLICY IF EXISTS "Allow public read volunteers" ON public.volunteers;
CREATE POLICY "Allow public read volunteers" ON public.volunteers
    FOR SELECT TO anon, authenticated
    USING (true);

-- Grant privileges
GRANT SELECT, INSERT ON public.volunteers TO anon, authenticated, service_role;


-- 2. GAME CARD WALLET SYSTEM
-- ==============================================================================
-- Add 'balance' and 'status' to game_card_bookings if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_card_bookings' AND column_name = 'balance') THEN
        ALTER TABLE public.game_card_bookings ADD COLUMN balance INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_card_bookings' AND column_name = 'status') THEN
        ALTER TABLE public.game_card_bookings ADD COLUMN status TEXT DEFAULT 'active';
    END IF;
END $$;

-- Create Transactions Table
CREATE TABLE IF NOT EXISTS public.game_card_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    card_id UUID REFERENCES public.game_card_bookings(id),
    transaction_type TEXT NOT NULL, -- 'refill' or 'spend'
    amount INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for faster transaction lookups
CREATE INDEX IF NOT EXISTS idx_game_card_transactions_card_id ON public.game_card_transactions(card_id);

GRANT SELECT, INSERT ON public.game_card_transactions TO anon, authenticated, service_role;


-- 3. ADMIN RPC FUNCTIONS
-- ==============================================================================

-- Function to get card details by code (For Volunteer/Admin Scan)
CREATE OR REPLACE FUNCTION public.get_card_details(p_card_code TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_card RECORD;
    v_recent_transactions JSONB;
BEGIN
    -- 1. Fetch Basic Info
    SELECT * INTO v_card 
    FROM public.game_card_bookings 
    WHERE card_code = p_card_code 
    LIMIT 1;

    IF v_card IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Card not found');
    END IF;

    -- 2. Fetch Last 5 Transactions
    SELECT jsonb_agg(t) INTO v_recent_transactions
    FROM (
        SELECT transaction_type, amount, notes, created_at 
        FROM public.game_card_transactions 
        WHERE card_id = v_card.id 
        ORDER BY created_at DESC 
        LIMIT 5
    ) t;

    -- 3. Return Combined Data
    RETURN jsonb_build_object(
        'success', true,
        'card', jsonb_build_object(
            'id', v_card.id,
            'full_name', v_card.full_name,
            'card_code', v_card.card_code,
            'balance', COALESCE(v_card.balance, 0),
            'status', COALESCE(v_card.status, 'active'),
            'last_transactions', COALESCE(v_recent_transactions, '[]'::jsonb)
        )
    );
END;
$$;

-- Function to Process a Transaction (Refill or Spend)
CREATE OR REPLACE FUNCTION public.process_card_transaction(
    p_card_code TEXT,
    p_amount INTEGER,
    p_type TEXT, -- 'refill' or 'spend'
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
    -- 1. Validate Card
    SELECT id, COALESCE(balance, 0) INTO v_card_id, v_current_balance
    FROM public.game_card_bookings
    WHERE card_code = p_card_code;

    IF v_card_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Card not found');
    END IF;

    -- 2. Calculate New Balance
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

    -- 3. Update Balance
    UPDATE public.game_card_bookings
    SET balance = v_new_balance
    WHERE id = v_card_id;

    -- 4. Log Transaction
    INSERT INTO public.game_card_transactions (card_id, transaction_type, amount, notes)
    VALUES (v_card_id, p_type, p_amount, p_notes);

    -- 5. Return Success
    RETURN jsonb_build_object(
        'success', true,
        'new_balance', v_new_balance,
        'message', 'Transaction successful: ' || p_type
    );
END;
$$;

-- Function to get aggregated report for Organisers
CREATE OR REPLACE FUNCTION public.get_admin_reports()
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
            b.id,
            b.full_name,
            b.card_code,
            b.email,
            COALESCE(b.balance, 0) as balance,
            COALESCE(b.status, 'active') as status,
            COUNT(t.id) as total_games_played,
            COALESCE(SUM(CASE WHEN t.transaction_type = 'refill' THEN t.amount ELSE 0 END), 0) as total_loaded,
            COALESCE(SUM(CASE WHEN t.transaction_type = 'spend' THEN t.amount ELSE 0 END), 0) as total_spent,
            MAX(t.created_at) as last_activity,
            -- Aggregated History (Last 10 items)
            COALESCE(
                (
                    SELECT jsonb_agg(h)
                    FROM (
                        SELECT id, transaction_type, amount, notes, created_at
                        FROM public.game_card_transactions
                        WHERE card_id = b.id
                        ORDER BY created_at DESC
                        LIMIT 10
                    ) h
                ),
                '[]'::jsonb
            ) as history
        FROM public.game_card_bookings b
        LEFT JOIN public.game_card_transactions t ON b.id = t.card_id
        GROUP BY b.id, b.full_name, b.card_code, b.email, b.balance, b.status
        ORDER BY b.created_at DESC
    ) r;

    RETURN jsonb_build_object('success', true, 'data', COALESCE(v_report, '[]'::jsonb));
END;
$$;

-- ==============================================================================
-- 4. NEW ADMIN CRUD FUNCTIONS (Edit/Delete/Add)
-- ==============================================================================

-- UPDATE PLAYER
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

    RETURN jsonb_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- DELETE PLAYER
CREATE OR REPLACE FUNCTION public.admin_delete_player(p_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Delete transactions first (Cascade manual)
    DELETE FROM public.game_card_transactions WHERE card_id = p_id;
    
    -- Delete booking
    DELETE FROM public.game_card_bookings WHERE id = p_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Player not found');
    END IF;

    RETURN jsonb_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- CREATE PLAYER (Manual Add)
CREATE OR REPLACE FUNCTION public.admin_create_player(
    p_full_name TEXT,
    p_email TEXT,
    p_card_code TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_new_id UUID;
BEGIN
    INSERT INTO public.game_card_bookings (
        full_name, email, card_code, balance, status, created_at
    ) VALUES (
        p_full_name, p_email, p_card_code, 0, 'active', now()
    ) RETURNING id INTO v_new_id;

    RETURN jsonb_build_object('success', true, 'id', v_new_id);
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- DELETE TRANSACTION (Remove Activity Log)
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

    RETURN jsonb_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Grant permissions for RPCs
GRANT EXECUTE ON FUNCTION public.get_card_details TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.process_card_transaction TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_admin_reports TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_update_player TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_delete_player TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_create_player TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_delete_transaction TO anon, authenticated, service_role;

-- ==============================================================================
-- 5. GAME REGISTRATION REPORTS & CRUD
-- ==============================================================================

-- Get all game registrations for organiser view
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
            COALESCE(registration_code, 'N/A') as registration_code,
            created_at
        FROM public.game_registrations
        ORDER BY created_at DESC
    ) r;

    RETURN jsonb_build_object('success', true, 'data', COALESCE(v_report, '[]'::jsonb));
END;
$$;

-- Update game registration
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

    RETURN jsonb_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Delete game registration
CREATE OR REPLACE FUNCTION public.admin_delete_game_registration(p_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM public.game_registrations WHERE id = p_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Registration not found');
    END IF;

    RETURN jsonb_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.get_game_registration_reports TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_update_game_registration TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_delete_game_registration TO anon, authenticated, service_role;
