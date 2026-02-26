-- Add all missing columns to the projects table
-- These are needed for the project admin form to save correctly

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS brochure_en_url    TEXT,
  ADD COLUMN IF NOT EXISTS brochure_ar_url    TEXT,
  ADD COLUMN IF NOT EXISTS fact_sheet_url     TEXT,
  ADD COLUMN IF NOT EXISTS floor_plans_url    TEXT,
  ADD COLUMN IF NOT EXISTS masterplan_url     TEXT,
  ADD COLUMN IF NOT EXISTS material_board_url TEXT,
  ADD COLUMN IF NOT EXISTS one_pager_url      TEXT,
  ADD COLUMN IF NOT EXISTS payment_plan_url   TEXT,
  ADD COLUMN IF NOT EXISTS floor_plans        TEXT[]   DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS videos             TEXT[]   DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS documents          JSONB    DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.projects.documents IS 'Array of {name, url} document links shown as download buttons on the project page';
