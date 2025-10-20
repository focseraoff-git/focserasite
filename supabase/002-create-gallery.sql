-- Migration: create gallery_events and gallery_photos tables

-- 1. Create the 'gallery_events' table
CREATE TABLE public.gallery_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    event_date TIMESTAMPTZ NOT NULL,
    cover_image_url TEXT,
    google_drive_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.gallery_events IS 'Stores individual gallery events like weddings, corporate events, etc.';
COMMENT ON COLUMN public.gallery_events.slug IS 'URL-friendly unique identifier for the event.';
COMMENT ON COLUMN public.gallery_events.google_drive_url IS 'Link to the full album on Google Drive.';

-- 2. Create the 'gallery_photos' table
CREATE TABLE public.gallery_photos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES public.gallery_events(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX ON public.gallery_photos (event_id);

COMMENT ON TABLE public.gallery_photos IS 'Stores individual photos for each gallery event.';
COMMENT ON COLUMN public.gallery_photos.event_id IS 'Foreign key linking the photo to its event.';
COMMENT ON COLUMN public.gallery_photos.display_order IS 'Used to control the order photos appear in the gallery.';
