-- Enable the pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- ==============================================================================
-- 1. GAME REGISTRATION & BOOKING TABLES (Ensure columns exist)
-- ==============================================================================

-- Safely add 'balance' and 'status' to game_card_bookings if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_card_bookings' AND column_name = 'balance') THEN
        ALTER TABLE public.game_card_bookings ADD COLUMN balance INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'game_card_bookings' AND column_name = 'status') THEN
        ALTER TABLE public.game_card_bookings ADD COLUMN status TEXT DEFAULT 'active';
    END IF;
END $$;

-- ==============================================================================
-- 1.5 VOLUNTEERS TABLE (Fix for Counter)
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
CREATE POLICY "Allow public insert volunteers" ON public.volunteers
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Allow Anon/Public to View Count (Select)
CREATE POLICY "Allow public read volunteers" ON public.volunteers
    FOR SELECT TO anon, authenticated
    USING (true);

-- Grant privileges
GRANT SELECT, INSERT ON public.volunteers TO anon, authenticated, service_role;

-- Create Transactions Table if not exists
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


-- ==============================================================================
-- 2. ORIGINAL EMAIL FUNCTIONS (Preserved)
-- ==============================================================================

-- 1. Create the RPC for Game Registration (UNCHANGED)
CREATE OR REPLACE FUNCTION public.submit_game_registration(
    p_full_name TEXT,
    p_email TEXT,
    p_phone TEXT,
    p_flat_number TEXT,
    p_age INTEGER,
    p_game_type TEXT,
    p_preferred_day TEXT,
    p_preferred_time_slot TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_resend_api_key TEXT := 're_dYjAPidj_4xfgzG33xc3XPRganFaANq2W';
    v_new_id UUID;
    v_email_response JSONB;
BEGIN
    INSERT INTO public.game_registrations (
        full_name, email, phone, flat_number, age, game_type, preferred_day, preferred_time_slot
    ) VALUES (
        p_full_name, p_email, p_phone, p_flat_number, p_age, p_game_type, p_preferred_day, p_preferred_time_slot
    ) RETURNING id INTO v_new_id;

    SELECT
        net.http_post(
            url := 'https://api.resend.com/emails',
            headers := jsonb_build_object(
                'Authorization', 'Bearer ' || v_resend_api_key,
                'Content-Type', 'application/json'
            ),
            body := jsonb_build_object(
                'from', 'ArenaX Registrations <info@focsera.in>',
                'to', ARRAY[p_email],
                'subject', 'Registration Confirmed: ' || p_game_type,
                'html', format(
                    '<div style="font-family: ''Times New Roman'', serif; background-color: #000000; padding: 40px 0;">
                        <div style="max-width: 600px; margin: 0 auto; background: radial-gradient(circle at center, #1a0f00 0%%, #000000 100%%); border: 2px solid #b38728; border-image: linear-gradient(to bottom, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c) 1; position: relative; box-shadow: 0 0 50px rgba(179, 135, 40, 0.2);">
                            
                            <!-- Metallic Border Container -->
                            <div style="padding: 40px; border: 1px solid rgba(255, 215, 0, 0.1); margin: 5px;">
                                
                                <!-- Header: Bright Metallic Gold Block -->
                                <div style="
                                    text-align: center; 
                                    margin-bottom: 50px; 
                                    background: linear-gradient(to right, #996515, #bf953f, #fcf6ba, #bf953f, #996515);
                                    padding: 35px 0;
                                    border: 1px solid #FFF8E1;
                                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                                    position: relative;
                                ">
                                    <!-- "ARENAX" - Dark Bronze/Black for max contrast -->
                                    <h1 style="
                                        font-size: 52px; 
                                        margin: 0; 
                                        text-transform: uppercase; 
                                        letter-spacing: 12px; 
                                        color: #1a0f00; 
                                        text-shadow: 0px 1px 0px rgba(255,255,255,0.3);
                                        font-weight: 900;
                                        font-family: serif;
                                    ">ArenaX</h1>
                                </div>
                                
                                <div style="text-align: center; margin-bottom: 30px;">
                                    <p style="
                                        color: #aa771c; 
                                        font-size: 14px; 
                                        letter-spacing: 6px; 
                                        text-transform: uppercase;
                                        margin: 0;
                                        border-bottom: 1px solid #aa771c;
                                        display: inline-block;
                                        padding-bottom: 10px;
                                    ">Official Confirmation</p>
                                </div>

                                <!-- Content -->
                                <div style="color: #d4c5a9; text-align: center;">
                                    <p style="font-size: 20px; font-style: italic; margin-bottom: 20px;">Honored <span style="color: #FFD700; font-weight: bold;">%s</span>,</p>
                                    <p style="font-size: 16px; line-height: 1.8; color: #d4c5a9; margin-bottom: 40px;">Your presence has been secured for the <strong style="color: #FFF8E1; border-bottom: 1px solid #B8860B;">%s</strong> engagement.</p>

                                    <!-- Details Box -->
                                    <div style="
                                        background: #0a0500; 
                                        padding: 3px; 
                                        background: linear-gradient(135deg, #FFD700 0%%, #B8860B 100%%);
                                        box-shadow: 0 0 20px rgba(184, 134, 11, 0.1);
                                    ">
                                        <div style="background: #000; padding: 30px;">
                                            <table style="width: 100%%; border-collapse: separate; border-spacing: 0 15px;">
                                                <tr>
                                                    <td style="color: #8a7c5d; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold;">Event</td>
                                                    <td style="color: #FFF8E1; text-align: right; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px rgba(179, 135, 40, 0.3);">%s</td>
                                                </tr>
                                                <tr><td style="border-bottom: 1px solid #333;" colspan="2"></td></tr>
                                                <tr>
                                                    <td style="color: #8a7c5d; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold;">Day</td>
                                                    <td style="color: #FFD700; text-align: right; font-size: 16px;">%s</td>
                                                </tr>
                                                <tr><td style="border-bottom: 1px solid #333;" colspan="2"></td></tr>
                                                <tr>
                                                    <td style="color: #8a7c5d; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold;">Time</td>
                                                    <td style="color: #e3d2ac; text-align: right; font-size: 16px;">%s</td>
                                                </tr>
                                                <tr><td style="border-bottom: 1px solid #333;" colspan="2"></td></tr>
                                                <tr>
                                                    <td style="color: #8a7c5d; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold;">Residence</td>
                                                    <td style="color: #e3d2ac; text-align: right; font-size: 16px;">%s</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                    <div style="margin-top: 50px;">
                                        <div style="
                                            display: inline-block; 
                                            padding: 12px 40px; 
                                            background: rgba(184, 134, 11, 0.1);
                                            border: 1px solid #b38728; 
                                            color: #b38728;
                                            font-size: 12px;
                                            text-transform: uppercase;
                                            letter-spacing: 3px;
                                        ">Arrival: 10 Min Prior</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>',
                    p_full_name, p_game_type, p_game_type, p_preferred_day, COALESCE(p_preferred_time_slot, 'Any Time'), p_flat_number
                )
            )
        ) INTO v_email_response;
    RETURN jsonb_build_object('success', true, 'id', v_new_id);
EXCEPTION WHEN OTHERS THEN RETURN jsonb_build_object('success', false, 'error', SQLERRM); END;
$$;

-- 2. Create the RPC for Game Card Booking (UNCHANGED)
CREATE OR REPLACE FUNCTION public.submit_game_card_booking(
    p_full_name TEXT,
    p_email TEXT,
    p_phone TEXT,
    p_flat_number TEXT,
    p_number_of_cards INTEGER,
    p_participant_names TEXT[],
    p_card_codes TEXT[]
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_resend_api_key TEXT := 're_dYjAPidj_4xfgzG33xc3XPRganFaANq2W';
    v_new_id UUID;
    v_email_response JSONB;
    v_codes_list TEXT := '';
    i INTEGER;
BEGIN
    INSERT INTO public.game_card_bookings (
        full_name, email, phone, flat_number, number_of_cards, participant_names, card_code, balance, status
    ) VALUES (
        p_full_name, p_email, p_phone, p_flat_number, p_number_of_cards, p_participant_names, p_card_codes[1], 0, 'active' 
    ) RETURNING id INTO v_new_id;

    FOR i IN 1..array_length(p_card_codes, 1) LOOP
        DECLARE
            v_card_name TEXT := COALESCE(p_participant_names[i], 'Guest');
            v_card_code TEXT := p_card_codes[i];
            v_qr_data TEXT := replace('Champion: ' || v_card_name || ', AccessID: ' || v_card_code, ' ', '%20');
            -- Bright Gold QR Code on Black
            v_qr_url TEXT := 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&bgcolor=000000&color=FFD700&margin=10&data=' || v_qr_data;
        BEGIN
            v_codes_list := v_codes_list || format(
                '<div>
                    <!-- MAIN CARD CONTAINER -->
                    <div style="
                        max-width: 320px;
                        margin: 0 auto 50px auto;
                        background: #000000;
                        border-radius: 40px;
                        padding: 30px 20px;
                        border: 1px solid #B8860B;
                        box-shadow: 
                            0 0 30px rgba(255, 215, 0, 0.15), 
                            inset 0 0 20px rgba(0,0,0,0.8);
                        text-align: center;
                        position: relative;
                    ">
                        
                         <!-- Top: Exclusive Access -->
                         <div style="
                            display: flex; justify-content: center; align-items: center; gap: 10px;
                            margin-bottom: 20px;
                         ">
                            <span style="color: #665c4a; font-size: 12px;">★</span>
                            <span style="
                                color: #665c4a; 
                                font-size: 9px; 
                                font-weight: bold; 
                                text-transform: uppercase; 
                                letter-spacing: 3px;
                            ">Exclusive Access</span>
                            <span style="color: #665c4a; font-size: 12px;">★</span>
                         </div>
                         
                         <!-- Logo: ARENAX -->
                         <div style="margin-bottom: 30px;">
                            <h1 style="
                                font-family: ''Times New Roman'', serif; 
                                font-style: italic; 
                                font-weight: 900; 
                                font-size: 42px; 
                                margin: 0;
                                letter-spacing: -2px;
                                color: #FFD700; /* Vibrant Gold */
                                text-transform: uppercase;
                                text-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
                            ">Arena<span style="color:#FFF">X</span></h1>
                         </div>

                         <!-- QR Code Box -->
                         <div style="
                             margin-bottom: 30px; 
                             display: inline-block;
                             padding: 2px;
                             border: 1px solid #B8860B; /* Thin Gold Line */
                             border-radius: 24px;
                         ">
                             <div style="
                                padding: 5px;
                                border-radius: 20px;
                                background: #000;
                             ">
                                <img src="%s" alt="QR Access" style="display: block; width: 140px; height: 140px;" />
                             </div>
                         </div>

                        <!-- Player Details -->
                        <div style="margin-bottom: 30px;">
                            <p style="
                                color: #665c4a; 
                                font-size: 8px; 
                                font-weight: bold; 
                                text-transform: uppercase; 
                                letter-spacing: 4px; 
                                margin: 0 0 10px 0;
                            ">Player Identity</p>
                            
                            <!-- NAME: Bold Vibrant Yellow -->
                            <h2 style="
                                margin: 0;
                                font-family: ''Arial'', sans-serif;
                                font-size: 26px;
                                font-weight: 900;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                color: #FFD700;
                                text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
                            ">%s</h2>
                            
                            <!-- Underline -->
                            <div style="width: 40px; height: 3px; background: #B8860B; margin: 10px auto 0 auto; border-radius: 2px;"></div>
                        </div>

                        <!-- Bottom Capsule: Pass Code & Status -->
                        <div style="
                            background: #111; 
                            border: 1px solid #333; 
                            border-radius: 16px; 
                            padding: 15px 20px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        ">
                            <!-- Left: Pass Code -->
                            <div style="text-align: left;">
                                <div style="font-size: 7px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px;">Pass Code</div>
                                <div style="font-family: monospace; font-size: 13px; color: #FFA500; letter-spacing: 1px; font-weight: bold;">%s</div>
                            </div>
                            
                            <!-- Divider -->
                            <div style="width: 1px; height: 25px; background: #333;"></div>

                            <!-- Right: Status -->
                            <div style="text-align: right;">
                                <div style="font-size: 7px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px;">Status</div>
                                <div style="color: #FFF; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                                    <span style="color: #00FF00; font-size: 14px; vertical-align: middle;">●</span> Active
                                </div>
                            </div>
                        </div>

                    </div>
                </div>',
                v_qr_url, v_card_name, v_card_code
            );
        END;
    END LOOP;

    SELECT
        net.http_post(
            url := 'https://api.resend.com/emails',
            headers := jsonb_build_object(
                'Authorization', 'Bearer ' || v_resend_api_key,
                'Content-Type', 'application/json'
            ),
            body := jsonb_build_object(
                'from', 'ArenaX Game Cards <info@focsera.in>',
                'to', ARRAY[p_email],
                'subject', 'Your ArenaX Game Cards are Here! 🎟️',
                'html', format(
                    '<div style="font-family: Arial, sans-serif; background-color: #0d0d0d; padding: 40px 0;">
                        <!-- Global Container -->
                        <div style="max-width: 600px; margin: 0 auto;">
                            
                            <!-- Email Intro Title -->
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #FFF; font-size: 24px; font-weight: bold; letter-spacing: 2px;">YOUR GAME PASS</h1>
                                <p style="color: #888; font-size: 14px;">Keep this secure. Show at entry.</p>
                            </div>

                            <!-- Cards List -->
                            %s
                            
                            <!-- Footer -->
                            <div style="text-align: center; color: #444; font-size: 10px; margin-top: 50px;">
                                <p>ArenaX Secure Ticketing System</p>
                                <p>ID: %s</p>
                            </div>
                        </div>
                    </div>',
                    v_codes_list, v_new_id
                )
            )
        ) INTO v_email_response;
    RETURN jsonb_build_object('success', true, 'id', v_new_id);
EXCEPTION WHEN OTHERS THEN RETURN jsonb_build_object('success', false, 'error', SQLERRM); END;
$$;

-- ==============================================================================
-- 3. NEW ADMIN DASHBOARD FUNCTIONS
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

-- NEW: Function to get aggregated report for Organisers
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
            MAX(t.created_at) as last_activity
        FROM public.game_card_bookings b
        LEFT JOIN public.game_card_transactions t ON b.id = t.card_id
        GROUP BY b.id, b.full_name, b.card_code, b.email, b.balance, b.status
        ORDER BY b.created_at DESC
    ) r;

    RETURN jsonb_build_object('success', true, 'data', COALESCE(v_report, '[]'::jsonb));
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.submit_game_registration TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.submit_game_card_booking TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_card_details TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.process_card_transaction TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_admin_reports TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE ON public.game_card_bookings TO anon, authenticated, service_role;
GRANT SELECT, INSERT ON public.game_card_transactions TO anon, authenticated, service_role;
