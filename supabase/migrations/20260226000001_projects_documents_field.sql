-- Add documents JSONB column to projects table
-- Stores an array of {name: string, url: string} objects
-- These are displayed as download buttons on the project detail page

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS documents JSONB DEFAULT '[]'::jsonb;

-- Add a comment for clarity
COMMENT ON COLUMN projects.documents IS 'Array of {name, url} document links shown as download buttons on the project page';
