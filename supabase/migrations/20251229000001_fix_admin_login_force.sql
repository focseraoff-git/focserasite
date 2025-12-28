-- ==============================================================================
-- FORCE FIX ADMIN LOGIN & SCHEMA CACHE
-- ==============================================================================

-- 1. Explicitly drop functions to ensure clean slate
DROP FUNCTION IF EXISTS public.admin_login(TEXT, TEXT);
-- Drop both potential signatures of log_admin_action just in case
DROP FUNCTION IF EXISTS public.log_admin_action(UUID, TEXT, TEXT, UUID, JSONB);
DROP FUNCTION IF EXISTS public.log_admin_action(TEXT, TEXT, UUID, JSONB);

-- 2. Recreate admin_login
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

-- 3. Recreate log_admin_action
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

-- 4. Grant permissions
GRANT EXECUTE ON FUNCTION public.admin_login(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.log_admin_action(UUID, TEXT, TEXT, UUID, JSONB) TO anon, authenticated;

-- 5. Force Schema Cache Reload
-- This is critical for PostgREST to pick up the changes immediately
NOTIFY pgrst, 'reload config';
