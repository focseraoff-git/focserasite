/*
  # Add Studios Features and Add-ons Support

  ## Changes
  
  ### 1. Extend services table
    - Add `features` (jsonb) - Array of included features for display
    - Add `terms` (jsonb) - Client and studio terms

  ### 2. Extend service_addons table  
    - Add `description` (text) - What's included in the add-on
    - Add `price_min` (numeric) - Minimum price
    - Add `price_max` (numeric) - Maximum price (nullable)

  ## Security
  - No RLS changes needed - inherits existing policies
*/

-- Add features and terms to services table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'features'
  ) THEN
    ALTER TABLE services ADD COLUMN features jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'terms'
  ) THEN
    ALTER TABLE services ADD COLUMN terms jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Add description and pricing to service_addons table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'service_addons' AND column_name = 'description'
  ) THEN
    ALTER TABLE service_addons ADD COLUMN description text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'service_addons' AND column_name = 'price_min'
  ) THEN
    ALTER TABLE service_addons ADD COLUMN price_min numeric DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'service_addons' AND column_name = 'price_max'
  ) THEN
    ALTER TABLE service_addons ADD COLUMN price_max numeric;
  END IF;
END $$;

-- Create quotes table if it doesn't exist
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  event_date date,
  details text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'converted', 'declined')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on quotes if not already enabled
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists and recreate
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'quotes' AND policyname = 'Anyone can submit quotes'
  ) THEN
    DROP POLICY "Anyone can submit quotes" ON quotes;
  END IF;
END $$;

CREATE POLICY "Anyone can submit quotes"
  ON quotes FOR INSERT
  WITH CHECK (true);
