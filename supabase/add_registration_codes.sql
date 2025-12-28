-- ==============================================================================
-- ADD REGISTRATION CODES TO GAME REGISTRATIONS
-- Run this file to add auto-generated codes (RX-XXXXXX) to game registrations
-- ==============================================================================

-- Step 1: Add registration_code column to game_registrations table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'game_registrations' 
        AND column_name = 'registration_code'
    ) THEN
        ALTER TABLE public.game_registrations 
        ADD COLUMN registration_code TEXT UNIQUE;
    END IF;
END $$;

-- Step 2: Create helper function to generate registration codes
CREATE OR REPLACE FUNCTION public.generate_registration_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    v_code TEXT;
    v_exists BOOLEAN;
BEGIN
    LOOP
        -- Generate RX- + 6 random uppercase letters
        v_code := 'RX-' || upper(substring(md5(random()::text) from 1 for 6));
        
        -- Check if code already exists
        SELECT EXISTS(
            SELECT 1 FROM public.game_registrations WHERE registration_code = v_code
        ) INTO v_exists;
        
        -- Exit loop if unique
        EXIT WHEN NOT v_exists;
    END LOOP;
    
    RETURN v_code;
END;
$$;

-- Step 3: Update existing records (if any) to have registration codes
UPDATE public.game_registrations
SET registration_code = public.generate_registration_code()
WHERE registration_code IS NULL;

-- Step 4: Update submit_game_registration RPC to auto-generate codes
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
    v_registration_code TEXT;
    v_email_response JSONB;
BEGIN
    -- Generate unique registration code
    v_registration_code := public.generate_registration_code();

    -- Insert registration with code
    INSERT INTO public.game_registrations (
        full_name, email, phone, flat_number, age, game_type, 
        preferred_day, preferred_time_slot, registration_code
    ) VALUES (
        p_full_name, p_email, p_phone, p_flat_number, p_age, p_game_type, 
        p_preferred_day, p_preferred_time_slot, v_registration_code
    ) RETURNING id INTO v_new_id;

    -- Send confirmation email with registration code
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
                                    border-radius: 5px;">
                                    
                                    <h1 style="
                                        margin: 0; 
                                        font-size: 42px; 
                                        color: #000000;
                                        text-transform: uppercase; 
                                        letter-spacing: 4px;
                                        font-weight: 900;
                                        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                                        ARENAX
                                    </h1>
                                    <p style="
                                        margin: 8px 0 0; 
                                        font-size: 14px; 
                                        color: #4a3000;
                                        letter-spacing: 3px;
                                        font-weight: 600;
                                        text-transform: uppercase;">
                                        Game Registration Confirmed
                                    </p>
                                </div>

                                <!-- Registration Code Section -->
                                <div style="
                                    background: linear-gradient(135deg, #1a1a1a 0%%, #2d2d2d 100%%);
                                    padding: 30px;
                                    border-radius: 12px;
                                    border: 2px solid #b38728;
                                    margin-bottom: 30px;
                                    text-align: center;
                                    box-shadow: 0 8px 20px rgba(179, 135, 40, 0.3);">
                                    
                                    <p style="
                                        color: #FDB931;
                                        font-size: 12px;
                                        letter-spacing: 2px;
                                        margin: 0 0 10px 0;
                                        text-transform: uppercase;
                                        font-weight: 600;">
                                        Your Registration Code
                                    </p>
                                    
                                    <div style="
                                        font-family: ''Courier New'', monospace;
                                        font-size: 32px;
                                        color: #FFFFFF;
                                        font-weight: 900;
                                        letter-spacing: 4px;
                                        padding: 15px;
                                        background: rgba(0,0,0,0.5);
                                        border-radius: 8px;
                                        text-shadow: 0 0 20px rgba(253, 185, 49, 0.5);">
                                        %s
                                    </div>
                                    
                                    <p style="
                                        color: #999;
                                        font-size: 11px;
                                        margin: 15px 0 0 0;
                                        font-style: italic;">
                                        Keep this code safe for check-in and tracking
                                    </p>
                                </div>

                                <!-- Content -->
                                <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                                    Hello <strong style="color: #FDB931;">%s</strong>,
                                </p>

                                <p style="color: #cccccc; font-size: 15px; line-height: 1.8; margin-bottom: 30px;">
                                    Thank you for registering! Your spot for <strong style="color: #FDB931;">%s</strong> has been confirmed.
                                </p>

                                <!-- Details Box -->
                                <div style="background: rgba(253, 185, 49, 0.05); border-left: 4px solid #FDB931; padding: 20px; margin: 25px 0; border-radius: 4px;">
                                    <p style="color: #FDB931; font-size: 13px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                                        Registration Details
                                    </p>
                                    <table style="width: 100%%; color: #cccccc; font-size: 14px; line-height: 1.8;">
                                        <tr>
                                            <td style="padding: 5px 0; color: #999999;">Game:</td>
                                            <td style="padding: 5px 0; color: #ffffff; font-weight: 600;">%s</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 5px 0; color: #999999;">Preferred Day:</td>
                                            <td style="padding: 5px 0; color: #ffffff; font-weight: 600;">%s</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 5px 0; color: #999999;">Time Slot:</td>
                                            <td style="padding: 5px 0; color: #ffffff; font-weight: 600;">%s</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 5px 0; color: #999999;">Registration Code:</td>
                                            <td style="padding: 5px 0; color: #FDB931; font-weight: 900; font-family: ''Courier New'', monospace;">%s</td>
                                        </tr>
                                    </table>
                                </div>

                                <p style="color: #999999; font-size: 13px; line-height: 1.6; margin-top: 30px; font-style: italic;">
                                    We look forward to seeing you at the event. Get ready for an epic experience!
                                </p>

                                <!-- Footer -->
                                <div style="border-top: 1px solid rgba(179, 135, 40, 0.3); margin-top: 40px; padding-top: 25px; text-align: center;">
                                    <p style="color: #666666; font-size: 12px; margin: 0;">
                                        ArenaX • Powered by Focsera
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>',
                    v_registration_code,  -- Registration code (large)
                    p_full_name,          -- Greeting
                    p_game_type,          -- Confirmation text
                    p_game_type,          -- Details table - Game
                    p_preferred_day,      -- Details table - Day
                    COALESCE(p_preferred_time_slot, 'Not specified'),  -- Details table - Time
                    v_registration_code   -- Details table - Code
                )
            )
        ) INTO v_email_response;

    RETURN jsonb_build_object(
        'success', true, 
        'id', v_new_id,
        'registration_code', v_registration_code
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.generate_registration_code TO anon, authenticated, service_role;
