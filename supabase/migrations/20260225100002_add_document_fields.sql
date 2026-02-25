-- ============================================================================
-- Patch: Add document upload fields to projects and properties tables
-- Based on MARINA_SHORES folder structure for comprehensive project documents
-- ============================================================================

-- ============================================================================
-- 1. Add document fields to PROJECTS table
-- ============================================================================

-- Videos array (can have multiple videos)
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS videos TEXT[] DEFAULT '{}';

-- Brochures (EN/AR versions)
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS brochure_en_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS brochure_ar_url TEXT;

-- Fact Sheet
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS fact_sheet_url TEXT;

-- Floor Plans (PDF + array for multiple floor plan images)
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS floor_plans_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS floor_plans TEXT[] DEFAULT '{}';

-- Masterplan
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS masterplan_url TEXT;

-- Material Board
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS material_board_url TEXT;

-- One Pager
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS one_pager_url TEXT;

-- Payment Plan PDF (separate from payment_plan text description)
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS payment_plan_url TEXT;

-- ============================================================================
-- 2. Add document fields to PROPERTIES table
-- ============================================================================

-- Brochure
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS brochure_url TEXT;

-- Fact Sheet
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS fact_sheet_url TEXT;

-- Material Board
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS material_board_url TEXT;

-- ============================================================================
-- DONE
-- ============================================================================
