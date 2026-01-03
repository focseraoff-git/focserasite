-- Insert Sankranthi Special Services if they don't exist

INSERT INTO studio_services (name, description, category, price_min, is_active, pricing_mode, thumbnail)
SELECT 'Sankranthi Reel Special', 'Sankranthi-themed reel (Mobile shoot)', 'Festival', 99, true, 'per event', 'https://placehold.co/600x400/94A3B8/FFFFFF?text=Sankranthi+Reel'
WHERE NOT EXISTS (SELECT 1 FROM studio_services WHERE name = 'Sankranthi Reel Special');

INSERT INTO studio_services (name, description, category, price_min, is_active, pricing_mode, thumbnail)
SELECT 'Sankranthi Photo Special', 'Mini festive photoshoot experience', 'Festival', 99, true, 'per event', 'https://placehold.co/600x400/94A3B8/FFFFFF?text=Sankranthi+Photo'
WHERE NOT EXISTS (SELECT 1 FROM studio_services WHERE name = 'Sankranthi Photo Special');

INSERT INTO studio_services (name, description, category, price_min, is_active, pricing_mode, thumbnail)
SELECT 'Sankranthi Video Special', 'Short festive video capture', 'Festival', 99, true, 'per event', 'https://placehold.co/600x400/94A3B8/FFFFFF?text=Sankranthi+Video'
WHERE NOT EXISTS (SELECT 1 FROM studio_services WHERE name = 'Sankranthi Video Special');

INSERT INTO studio_services (name, description, category, price_min, is_active, pricing_mode, thumbnail)
SELECT 'Sankranthi Combo Pack', 'All-in-One Festive Experience (Reel + Photos + Video)', 'Festival', 199, true, 'per event', 'https://placehold.co/600x400/94A3B8/FFFFFF?text=Sankranthi+Combo'
WHERE NOT EXISTS (SELECT 1 FROM studio_services WHERE name = 'Sankranthi Combo Pack');
