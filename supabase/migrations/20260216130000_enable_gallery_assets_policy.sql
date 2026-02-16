-- Ensure the bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery_assets', 'gallery_assets', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- Allow public read access to all objects in the 'gallery_assets' bucket
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'gallery_assets' );
