-- Add guest contact columns to property_valuations
-- These are needed when the user is not logged in (user_id IS NULL)

ALTER TABLE public.property_valuations
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS email     TEXT,
  ADD COLUMN IF NOT EXISTS phone     TEXT;

-- Allow anonymous (guest) users to submit valuation requests.
-- The existing pv_insert_auth policy only allows authenticated users.
DROP POLICY IF EXISTS "pv_insert_auth" ON public.property_valuations;

CREATE POLICY "pv_insert_any"
  ON public.property_valuations FOR INSERT WITH CHECK (true);
