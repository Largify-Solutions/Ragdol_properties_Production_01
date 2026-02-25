-- ============================================================================
-- Patch: Add missing columns discovered during admin portal verification
-- Run this on the live database AFTER the unified schema is already applied.
-- ============================================================================

-- 1. Add review_status to properties (used by property-reviews admin page + agent portal)
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS review_status TEXT DEFAULT 'pending_review';

CREATE INDEX IF NOT EXISTS idx_properties_review_status ON public.properties(review_status);

-- 2. Add email to testimonials (collected by admin form but was not persisted)
ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS email TEXT;

-- ============================================================================
-- DONE
-- ============================================================================
