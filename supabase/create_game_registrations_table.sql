-- Create the game_registrations table

CREATE TABLE IF NOT EXISTS game_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  flat_number TEXT NOT NULL,
  age INTEGER NOT NULL,
  game_type TEXT NOT NULL,
  preferred_day TEXT NOT NULL,
  preferred_time_slot TEXT
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_game_registrations_email ON game_registrations(email);
CREATE INDEX IF NOT EXISTS idx_game_registrations_game_type ON game_registrations(game_type);

-- Enable Row Level Security (RLS)
ALTER TABLE game_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated and anon users
CREATE POLICY "Allow public inserts" ON game_registrations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow reads for authenticated users only
CREATE POLICY "Allow authenticated reads" ON game_registrations
  FOR SELECT
  TO authenticated
  USING (true);
