-- ============================================================================
-- Patch: Storage bucket for logos + policy fixes
-- Run on live database AFTER unified schema is already applied.
-- ============================================================================

-- ============================================================================
-- 1. Create public 'logos' bucket for partner & developer logos
--    (documents bucket is private — logos must be publicly accessible)
-- ============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'logos',
  'logos',
  true,               -- PUBLIC so logo URLs work without auth
  5242880,            -- 5 MB limit
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/svg+xml','image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for logos bucket
DO $$ BEGIN
  CREATE POLICY "logos_select_all"
    ON storage.objects FOR SELECT USING (bucket_id = 'logos');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "logos_insert_admin"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'logos' AND auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "logos_update_admin"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'logos' AND auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "logos_delete_admin"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'logos' AND auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================================
-- 2. Fix agent-images bucket — add missing UPDATE & DELETE policies
-- ============================================================================
DO $$ BEGIN
  CREATE POLICY "agentimg_update"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'agent-images' AND auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "agentimg_delete"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'agent-images' AND auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================================
-- 3. Fix project-images bucket — add missing UPDATE & DELETE policies
-- ============================================================================
DO $$ BEGIN
  CREATE POLICY "projimg_update"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "projimg_delete"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================================
-- 4. Make documents bucket allow public SELECT for shared document links
--    (PDFs shared via download links must be readable without auth)
-- ============================================================================
-- Drop the old private-only policy and replace with public select
DO $$ BEGIN
  DROP POLICY IF EXISTS "doc_select" ON storage.objects;
EXCEPTION WHEN undefined_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "doc_select_public"
    ON storage.objects FOR SELECT USING (bucket_id = 'documents');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================================
-- 5. Ensure all document columns exist on projects table
--    (safe to re-run — IF NOT EXISTS guards)
-- ============================================================================
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS videos          TEXT[] DEFAULT '{}';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS brochure_en_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS brochure_ar_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS fact_sheet_url  TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS floor_plans_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS floor_plans     TEXT[] DEFAULT '{}';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS masterplan_url  TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS material_board_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS one_pager_url   TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS payment_plan_url TEXT;

-- ============================================================================
-- 6. Ensure all document columns exist on properties table
-- ============================================================================
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS brochure_url      TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS fact_sheet_url    TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS material_board_url TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS review_status     TEXT DEFAULT 'pending_review';

CREATE INDEX IF NOT EXISTS idx_properties_review_status
  ON public.properties(review_status);

-- ============================================================================
-- 7. Ensure email exists on testimonials
-- ============================================================================
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS email TEXT;

-- ============================================================================
-- DONE
-- ============================================================================
