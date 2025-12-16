-- ==========================================
-- FINAL FIX SCRIPT (Schema + Data)
-- Run this entire script in Supabase SQL Editor
-- ==========================================

-- 1. SCHEMA FIXES (Columns & RLS)
ALTER TABLE public.code_challenges 
ADD COLUMN IF NOT EXISTS input_format text DEFAULT 'Standard input (stdin)',
ADD COLUMN IF NOT EXISTS output_format text DEFAULT 'Standard output (stdout)';

ALTER TABLE public.test_cases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access for test_cases" ON public.test_cases;
CREATE POLICY "Public read access for test_cases" ON public.test_cases FOR SELECT TO authenticated USING (true);

ALTER TABLE public.code_challenges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access for code_challenges" ON public.code_challenges;
CREATE POLICY "Public read access for code_challenges" ON public.code_challenges FOR SELECT TO authenticated USING (true);

-- 2. DATA POPULATION (Corrected for your Schema)
DO $$
DECLARE
    target_id uuid := 'b101ff3a-3a2a-4df5-9912-1d63bcfa32d2';
BEGIN
    -- Update the specific challenge with correct content
    UPDATE public.code_challenges 
    SET 
        title = 'Day 1 Challenge: Hello, World!',
        -- Schema uses 'description', NOT 'problem_statement'
        description = '<p class="mb-4">Your first challenge is a classic! You must write a complete Java program that prints the exact string <strong>"Hello, World!"</strong> to the console.</p><p>Remember, in Java, this requires a class and a <code>main</code> method.</p>',
        -- Schema uses 'starter_code'
        starter_code = 'public class Main {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello, World!");
    }
}',
        language = 'java',
        input_format = 'None',
        output_format = 'Print exactly "Hello, World!"'
    WHERE id = target_id;

    -- Clear old test cases for this challenge to avoid duplicates
    DELETE FROM public.test_cases WHERE challenge_id = target_id;

    -- Insert Test Case (Schema uses 'hidden', NOT 'is_hidden')
    INSERT INTO public.test_cases (challenge_id, input, expected_output, hidden) 
    VALUES (target_id, '', 'Hello, World!', false);

END $$;
