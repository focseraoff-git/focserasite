/*
  # Create Gallery System

  1. New Tables
    - `gallery_events`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL-friendly identifier
      - `title` (text) - Event name
      - `description` (text) - Event description
      - `event_date` (date) - When the event happened
      - `cover_image_url` (text) - Main cover image
      - `google_drive_url` (text) - Link to full photo collection
      - `is_featured` (boolean) - Show on homepage
      - `display_order` (integer) - Order in gallery list
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `gallery_photos`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key) - Links to gallery_events
      - `image_url` (text) - Photo URL
      - `caption` (text, optional) - Photo caption
      - `display_order` (integer) - Order in event gallery
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public read access for all users
    - Admin-only write access (you can add admin policies later)
*/

-- Create gallery_events table
CREATE TABLE IF NOT EXISTS gallery_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  event_date date NOT NULL,
  cover_image_url text NOT NULL,
  google_drive_url text,
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_photos table
CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES gallery_events(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_gallery_events_slug ON gallery_events(slug);
CREATE INDEX IF NOT EXISTS idx_gallery_events_featured ON gallery_events(is_featured);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_event_id ON gallery_photos(event_id);

-- Enable RLS
ALTER TABLE gallery_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Public read access for gallery_events
CREATE POLICY "Anyone can view gallery events"
  ON gallery_events
  FOR SELECT
  TO public
  USING (true);

-- Public read access for gallery_photos
CREATE POLICY "Anyone can view gallery photos"
  ON gallery_photos
  FOR SELECT
  TO public
  USING (true);

-- Insert sample data for InnovateX25
INSERT INTO gallery_events (slug, title, description, event_date, cover_image_url, google_drive_url, is_featured, display_order)
VALUES (
  'innovatex25',
  'InnovateX25',
  'Our flagship tech and creativity conference brought together industry leaders and visionaries from around the globe.',
  '2025-10-15',
  'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://drive.google.com/drive/folders/your-folder-id',
  true,
  1
) ON CONFLICT (slug) DO NOTHING;