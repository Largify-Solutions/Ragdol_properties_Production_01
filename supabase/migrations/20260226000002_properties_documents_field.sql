-- Add documents JSONB column to properties table
-- Stores an array of {name, url} document links shown as download buttons on the property page

ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS documents JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.properties.documents IS 'Array of {name, url} document links shown as download buttons on the property detail page';
