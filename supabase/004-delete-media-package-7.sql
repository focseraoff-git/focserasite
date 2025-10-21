-- 004-delete-media-package-7.sql
-- Remove media_packages row with id = 7 (Creator's Choice custom duplicate)
-- Run this in your Supabase SQL editor or via psql using a privileged connection.

BEGIN;

-- Optional safety check: preview the row to be deleted
-- SELECT * FROM public.media_packages WHERE id = 7;

DELETE FROM public.media_packages WHERE id = 7;

COMMIT;

-- Note: This file only removes the row with id = 7. If you want to keep a backup, run the SELECT above and store the row elsewhere before deleting.
