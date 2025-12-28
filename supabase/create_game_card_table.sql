-- Create the game_card_bookings table in Supabase

CREATE TABLE IF NOT EXISTS game_card_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  flat_number TEXT NOT NULL,
  number_of_cards INTEGER NOT NULL,
  participant_names TEXT[] DEFAULT '{}',
  card_code TEXT NOT NULL
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_game_card_bookings_email ON game_card_bookings(email);
CREATE INDEX IF NOT EXISTS idx_game_card_bookings_card_code ON game_card_bookings(card_code);

-- Enable Row Level Security (RLS)
ALTER TABLE game_card_bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated and anon users
CREATE POLICY "Allow public inserts" ON game_card_bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow reads for authenticated users only
CREATE POLICY "Allow authenticated reads" ON game_card_bookings
  FOR SELECT
  TO authenticated
  USING (true);
