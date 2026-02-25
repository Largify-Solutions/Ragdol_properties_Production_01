-- =====================================================
-- Hero CMS Schema
-- Allows admin to fully customize the website hero section
-- Supports: Image Slider or Background Video modes
-- Media stored in Supabase Storage (hero-media bucket)
-- =====================================================

-- ---------------------
-- hero_settings table: global hero configuration
-- ---------------------
CREATE TABLE IF NOT EXISTS public.hero_settings (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Display mode: 'slider' shows image slides, 'video' shows background video
  mode             TEXT NOT NULL DEFAULT 'slider' CHECK (mode IN ('slider', 'video')),
  
  -- Hero text content
  heading          TEXT NOT NULL DEFAULT 'Find Your Dream Home in Dubai',
  subheading       TEXT NOT NULL DEFAULT 'Discover luxury properties, premium apartments and exclusive villas across Dubai''s most prestigious communities.',
  
  -- Overlay darkness (0.0 = fully transparent, 1.0 = fully black)
  overlay_opacity  NUMERIC(3,2) NOT NULL DEFAULT 0.55 CHECK (overlay_opacity BETWEEN 0 AND 1),
  
  -- Slider settings
  auto_play        BOOLEAN NOT NULL DEFAULT TRUE,
  slide_duration   INTEGER NOT NULL DEFAULT 5000, -- milliseconds
  
  -- Video mode settings
  video_url        TEXT,            -- Supabase storage public URL
  video_poster_url TEXT,            -- Static fallback image for video
  video_muted      BOOLEAN NOT NULL DEFAULT TRUE,
  video_loop       BOOLEAN NOT NULL DEFAULT TRUE,
  
  -- Search bar toggle
  search_enabled   BOOLEAN NOT NULL DEFAULT TRUE,
  
  -- CTA buttons
  primary_cta_text TEXT NOT NULL DEFAULT 'Explore Properties',
  primary_cta_url  TEXT NOT NULL DEFAULT '/properties',
  secondary_cta_text TEXT,
  secondary_cta_url  TEXT,
  
  -- Meta
  is_active        BOOLEAN NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------
-- hero_slides table: individual slides for slider mode
-- ---------------------
CREATE TABLE IF NOT EXISTS public.hero_slides (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_setting_id  UUID NOT NULL REFERENCES public.hero_settings(id) ON DELETE CASCADE,
  
  -- Media (image stored in Supabase Storage hero-media bucket)
  image_url        TEXT NOT NULL,
  
  -- Slide-specific text (optional, overrides hero_settings heading/subheading)
  title            TEXT,
  subtitle         TEXT,
  
  -- Order and visibility
  sort_order       INTEGER NOT NULL DEFAULT 0,
  is_active        BOOLEAN NOT NULL DEFAULT TRUE,
  
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_hero_slides_setting_id ON public.hero_slides(hero_setting_id);
CREATE INDEX IF NOT EXISTS idx_hero_slides_sort_order ON public.hero_slides(sort_order);

-- ---------------------
-- Auto-update updated_at timestamps
-- ---------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS hero_settings_updated_at ON public.hero_settings;
CREATE TRIGGER hero_settings_updated_at
  BEFORE UPDATE ON public.hero_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS hero_slides_updated_at ON public.hero_slides;
CREATE TRIGGER hero_slides_updated_at
  BEFORE UPDATE ON public.hero_slides
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------
-- RLS Policies
-- ---------------------
ALTER TABLE public.hero_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides    ENABLE ROW LEVEL SECURITY;

-- Anyone can read hero settings (public website needs them)
CREATE POLICY "hero_settings_public_read"
  ON public.hero_settings FOR SELECT USING (true);

CREATE POLICY "hero_slides_public_read"
  ON public.hero_slides FOR SELECT USING (true);

-- Only admins can write
CREATE POLICY "hero_settings_admin_write"
  ON public.hero_settings FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

CREATE POLICY "hero_slides_admin_write"
  ON public.hero_slides FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- ---------------------
-- Supabase Storage: hero-media bucket
-- ---------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'hero-media',
  'hero-media',
  true,   -- public bucket so images/videos can be served without auth
  104857600,  -- 100 MB max per file
  ARRAY[
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
    'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: anyone can read (public bucket)
CREATE POLICY "hero_media_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'hero-media');

-- Only admins can upload/update/delete
CREATE POLICY "hero_media_admin_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'hero-media' AND
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

CREATE POLICY "hero_media_admin_update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'hero-media' AND
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

CREATE POLICY "hero_media_admin_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'hero-media' AND
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

-- ---------------------
-- Default hero settings seed data
-- ---------------------
INSERT INTO public.hero_settings (
  mode, heading, subheading, overlay_opacity,
  auto_play, slide_duration,
  primary_cta_text, primary_cta_url,
  secondary_cta_text, secondary_cta_url,
  search_enabled, is_active
) VALUES (
  'slider',
  'Find Your Dream Home in Dubai',
  'Discover luxury properties, premium apartments and exclusive villas across Dubai''s most prestigious communities.',
  0.55,
  true, 5000,
  'Explore Properties', '/properties',
  'Contact an Agent', '/contact',
  true, true
)
ON CONFLICT DO NOTHING;
